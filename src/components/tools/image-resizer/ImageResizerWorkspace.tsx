"use client";

import {
  ChangeEvent,
  DragEvent,
  useEffect,
  useRef,
  useState,
} from "react";

const MAX_FILE_SIZE = 15 * 1024 * 1024;
const JPEG_WEBP_QUALITY = 0.92;

const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

interface ImageInfo {
  file: File;
  previewUrl: string;
  width: number;
  height: number;
}

interface ResizeResult {
  blob: Blob;
  previewUrl: string;
  fileName: string;
  width: number;
  height: number;
}

function formatBytes(bytes: number) {
  if (bytes === 0) {
    return "0 B";
  }

  const units = ["B", "KB", "MB", "GB"];

  const unitIndex = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1,
  );

  const value = bytes / 1024 ** unitIndex;

  return `${value.toFixed(unitIndex === 0 ? 0 : 2)} ${units[unitIndex]}`;
}

function getFriendlyType(type: string) {
  switch (type) {
    case "image/jpeg":
      return "JPG";
    case "image/png":
      return "PNG";
    case "image/webp":
      return "WebP";
    default:
      return type || "Unknown";
  }
}

function getSafeDimension(value: number) {
  return Math.max(1, Math.round(value));
}

function getResizedFileName(file: File) {
  const lastDotIndex = file.name.lastIndexOf(".");

  const rawBaseName =
    lastDotIndex > 0
      ? file.name.slice(0, lastDotIndex)
      : file.name;

  const baseName = rawBaseName.replace(
    /(?:-resized)+$/i,
    "",
  );

  const extension =
    file.type === "image/jpeg"
      ? "jpg"
      : file.type === "image/png"
        ? "png"
        : "webp";

  return `${baseName}-resized.${extension}`;
}

export function ImageResizerWorkspace() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<ImageInfo | null>(null);
  const [result, setResult] = useState<ResizeResult | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  const [targetWidth, setTargetWidth] = useState(1);
  const [targetHeight, setTargetHeight] = useState(1);

  const [maintainAspectRatio, setMaintainAspectRatio] =
    useState(true);

  useEffect(() => {
    return () => {
      if (image?.previewUrl) {
        URL.revokeObjectURL(image.previewUrl);
      }
    };
  }, [image]);

  useEffect(() => {
    return () => {
      if (result?.previewUrl) {
        URL.revokeObjectURL(result.previewUrl);
      }
    };
  }, [result]);

  function resetResult() {
    setResult(null);
  }

  function resetImage() {
    setImage(null);
    setResult(null);
    setError(null);
    setIsDragging(false);
    setIsResizing(false);
    setTargetWidth(1);
    setTargetHeight(1);
    setMaintainAspectRatio(true);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function processFile(file: File) {
    setError(null);
    setResult(null);

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Please select a JPG, PNG, or WebP image.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("The image is too large. Maximum file size is 15 MB.");
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    const previewImage = new Image();

    previewImage.onload = () => {
      const width = previewImage.naturalWidth;
      const height = previewImage.naturalHeight;

      setImage({
        file,
        previewUrl,
        width,
        height,
      });

      setTargetWidth(width);
      setTargetHeight(height);
      setMaintainAspectRatio(true);
    };

    previewImage.onerror = () => {
      URL.revokeObjectURL(previewUrl);

      setError(
        "The image could not be read. Please try another file.",
      );
    };

    previewImage.src = previewUrl;
  }

  function handleFileChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    if (file) {
      processFile(file);
    }
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];

    if (file) {
      processFile(file);
    }
  }

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
  }

  function updateWidth(value: number) {
    if (!image) {
      return;
    }

    const width = getSafeDimension(value);

    setTargetWidth(width);
    resetResult();

    if (maintainAspectRatio) {
      const ratio = image.height / image.width;

      setTargetHeight(
        getSafeDimension(width * ratio),
      );
    }
  }

  function updateHeight(value: number) {
    if (!image) {
      return;
    }

    const height = getSafeDimension(value);

    setTargetHeight(height);
    resetResult();

    if (maintainAspectRatio) {
      const ratio = image.width / image.height;

      setTargetWidth(
        getSafeDimension(height * ratio),
      );
    }
  }

  function applyPreset(percent: number) {
    if (!image) {
      return;
    }

    setTargetWidth(
      getSafeDimension(image.width * percent),
    );

    setTargetHeight(
      getSafeDimension(image.height * percent),
    );

    resetResult();
  }

  function restoreOriginalSize() {
    if (!image) {
      return;
    }

    setTargetWidth(image.width);
    setTargetHeight(image.height);
    resetResult();
  }

  async function resizeImage() {
    if (!image) {
      return;
    }

    setError(null);
    setIsResizing(true);
    resetResult();

    try {
      const sourceImage = new Image();

      await new Promise<void>((resolve, reject) => {
        sourceImage.onload = () => resolve();

        sourceImage.onerror = () =>
          reject(new Error("Unable to load the selected image."));

        sourceImage.src = image.previewUrl;
      });

      const canvas = document.createElement("canvas");

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const context = canvas.getContext("2d");

      if (!context) {
        throw new Error(
          "Your browser could not create an image processing canvas.",
        );
      }

      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";

      context.drawImage(
        sourceImage,
        0,
        0,
        targetWidth,
        targetHeight,
      );

      const mimeType = image.file.type;

      const outputQuality =
        mimeType === "image/png"
          ? undefined
          : JPEG_WEBP_QUALITY;

      const resizedBlob = await new Promise<Blob>(
        (resolve, reject) => {
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(
                  new Error(
                    "The browser could not create the resized image.",
                  ),
                );
                return;
              }

              resolve(blob);
            },
            mimeType,
            outputQuality,
          );
        },
      );

      const previewUrl =
        URL.createObjectURL(resizedBlob);

      setResult({
        blob: resizedBlob,
        previewUrl,
        fileName: getResizedFileName(image.file),
        width: targetWidth,
        height: targetHeight,
      });
    } catch (resizeError) {
      setError(
        resizeError instanceof Error
          ? resizeError.message
          : "The image could not be resized.",
      );
    } finally {
      setIsResizing(false);
    }
  }

  function downloadResult() {
    if (!result) {
      return;
    }

    const downloadLink =
      document.createElement("a");

    downloadLink.href = result.previewUrl;
    downloadLink.download = result.fileName;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();
  }

  if (image) {
    const dimensionsChanged =
      targetWidth !== image.width ||
      targetHeight !== image.height;

    return (
      <div className="space-y-6">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="grid lg:grid-cols-[1.2fr_1fr]">
            <div className="flex min-h-80 items-center justify-center bg-slate-100 p-6">
              {/* Local object URLs require a native img element. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={result?.previewUrl ?? image.previewUrl}
                alt={
                  result
                    ? `Resized preview of ${image.file.name}`
                    : `Preview of ${image.file.name}`
                }
                className="max-h-[32rem] max-w-full rounded-xl object-contain shadow-sm"
              />
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                    Selected image
                  </p>

                  <h2 className="mt-2 break-all text-xl font-bold text-slate-950">
                    {image.file.name}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={resetImage}
                  className="shrink-0 rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
                >
                  Reset
                </button>
              </div>

              <dl className="mt-7 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    File size
                  </dt>

                  <dd className="mt-2 font-bold text-slate-950">
                    {formatBytes(image.file.size)}
                  </dd>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Format
                  </dt>

                  <dd className="mt-2 font-bold text-slate-950">
                    {getFriendlyType(image.file.type)}
                  </dd>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Original width
                  </dt>

                  <dd className="mt-2 font-bold text-slate-950">
                    {image.width.toLocaleString()} px
                  </dd>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Original height
                  </dt>

                  <dd className="mt-2 font-bold text-slate-950">
                    {image.height.toLocaleString()} px
                  </dd>
                </div>
              </dl>

              <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-bold text-slate-950">
                    New dimensions
                  </h3>

                  <button
                    type="button"
                    onClick={restoreOriginalSize}
                    className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Original size
                  </button>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-sm font-semibold text-slate-700">
                      Width
                    </span>

                    <div className="mt-2 flex overflow-hidden rounded-xl border border-slate-300 bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
                      <input
                        type="number"
                        min="1"
                        value={targetWidth}
                        onChange={(event) =>
                          updateWidth(
                            Number(event.target.value),
                          )
                        }
                        className="min-w-0 flex-1 px-3 py-2.5 outline-none"
                      />

                      <span className="flex items-center border-l border-slate-200 px-3 text-sm text-slate-500">
                        px
                      </span>
                    </div>
                  </label>

                  <label className="block">
                    <span className="text-sm font-semibold text-slate-700">
                      Height
                    </span>

                    <div className="mt-2 flex overflow-hidden rounded-xl border border-slate-300 bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
                      <input
                        type="number"
                        min="1"
                        value={targetHeight}
                        onChange={(event) =>
                          updateHeight(
                            Number(event.target.value),
                          )
                        }
                        className="min-w-0 flex-1 px-3 py-2.5 outline-none"
                      />

                      <span className="flex items-center border-l border-slate-200 px-3 text-sm text-slate-500">
                        px
                      </span>
                    </div>
                  </label>
                </div>

                <label className="mt-5 flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={maintainAspectRatio}
                    onChange={(event) => {
                      setMaintainAspectRatio(
                        event.target.checked,
                      );

                      resetResult();
                    }}
                    className="mt-1 size-4 accent-blue-600"
                  />

                  <span>
                    <span className="block font-semibold text-slate-800">
                      Maintain aspect ratio
                    </span>

                    <span className="mt-1 block text-sm leading-6 text-slate-500">
                      Automatically keep the image proportions when changing
                      width or height.
                    </span>
                  </span>
                </label>

                <div className="mt-6">
                  <p className="text-sm font-semibold text-slate-700">
                    Quick presets
                  </p>

                  <div className="mt-3 grid grid-cols-3 gap-3">
                    {[0.25, 0.5, 0.75].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => applyPreset(preset)}
                        className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                      >
                        {Math.round(preset * 100)}%
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  disabled={
                    isResizing ||
                    !dimensionsChanged
                  }
                  onClick={resizeImage}
                  className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-6 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isResizing
                    ? "Resizing..."
                    : result
                      ? "Resize again"
                      : "Resize image"}
                </button>

                {!dimensionsChanged && (
                  <p className="mt-3 text-center text-sm text-slate-500">
                    Change the width or height to create a resized image.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {result && (
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-emerald-600">
                  Resize result
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-950">
                  Your resized image is ready
                </h2>
              </div>

              <button
                type="button"
                onClick={downloadResult}
                className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-emerald-600 px-6 font-semibold text-white transition hover:bg-emerald-700"
              >
                Download image
              </button>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Original
                </p>

                <p className="mt-2 text-lg font-bold text-slate-950">
                  {image.width.toLocaleString()} ×{" "}
                  {image.height.toLocaleString()}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {formatBytes(image.file.size)}
                </p>
              </div>

              <div className="rounded-2xl bg-emerald-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                  Resized
                </p>

                <p className="mt-2 text-lg font-bold text-emerald-950">
                  {result.width.toLocaleString()} ×{" "}
                  {result.height.toLocaleString()}
                </p>

                <p className="mt-1 text-sm text-emerald-800">
                  {formatBytes(result.blob.size)}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Format
                </p>

                <p className="mt-2 text-lg font-bold text-slate-950">
                  {getFriendlyType(image.file.type)}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Same as original
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm text-slate-500">
              Output: {result.fileName}
            </p>
          </section>
        )}

        {error && (
          <div
            className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800"
            role="alert"
          >
            {error}
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="sr-only"
      />

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={[
          "rounded-3xl border-2 border-dashed bg-white px-6 py-14 text-center shadow-sm transition",
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-slate-300 hover:border-blue-400",
        ].join(" ")}
      >
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
          ↔️
        </div>

        <h2 className="mt-6 text-2xl font-bold text-slate-950">
          Drop your image here
        </h2>

        <p className="mx-auto mt-3 max-w-lg leading-7 text-slate-600">
          Choose a JPG, PNG, or WebP image up to 15 MB.
          The file stays in your browser.
        </p>

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-600 px-6 font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
        >
          Choose image
        </button>

        <p className="mt-4 text-sm text-slate-500">
          or drag and drop an image into this area
        </p>
      </div>

      {error && (
        <div
          className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800"
          role="alert"
        >
          {error}
        </div>
      )}
    </div>
  );
}
