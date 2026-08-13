"use client";

import {
  ChangeEvent,
  DragEvent,
  useEffect,
  useRef,
  useState,
} from "react";

const MAX_FILE_SIZE = 15 * 1024 * 1024;
const DEFAULT_QUALITY = 80;

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

interface CompressionResult {
  blob: Blob;
  previewUrl: string;
  fileName: string;
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

function getCompressedFileName(file: File) {
  const lastDotIndex = file.name.lastIndexOf(".");

  const rawBaseName =
    lastDotIndex > 0
      ? file.name.slice(0, lastDotIndex)
      : file.name;

  const baseName = rawBaseName.replace(
    /(?:-compressed)+$/i,
    "",
  );

  const extension =
    file.type === "image/jpeg"
      ? "jpg"
      : file.type === "image/png"
        ? "png"
        : "webp";

  return `${baseName}-compressed.${extension}`;
}

function calculateSavings(originalSize: number, resultSize: number) {
  if (originalSize <= 0) {
    return 0;
  }

  return ((originalSize - resultSize) / originalSize) * 100;
}

export function ImageCompressorWorkspace() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<ImageInfo | null>(null);
  const [result, setResult] = useState<CompressionResult | null>(null);

  const [quality, setQuality] = useState(DEFAULT_QUALITY);
  const [error, setError] = useState<string | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);

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
    setQuality(DEFAULT_QUALITY);
    setIsDragging(false);
    setIsCompressing(false);

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
      setImage({
        file,
        previewUrl,
        width: previewImage.naturalWidth,
        height: previewImage.naturalHeight,
      });
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

  async function compressImage() {
    if (!image) {
      return;
    }

    setError(null);
    setIsCompressing(true);
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

      canvas.width = image.width;
      canvas.height = image.height;

      const context = canvas.getContext("2d");

      if (!context) {
        throw new Error(
          "Your browser could not create an image processing canvas.",
        );
      }

      context.drawImage(
        sourceImage,
        0,
        0,
        image.width,
        image.height,
      );

      const mimeType = image.file.type;

      const compressionQuality =
        mimeType === "image/png"
          ? undefined
          : quality / 100;

      const compressedBlob = await new Promise<Blob>(
        (resolve, reject) => {
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(
                  new Error(
                    "The browser could not create the compressed image.",
                  ),
                );
                return;
              }

              resolve(blob);
            },
            mimeType,
            compressionQuality,
          );
        },
      );

      const resultUrl = URL.createObjectURL(compressedBlob);

      setResult({
        blob: compressedBlob,
        previewUrl: resultUrl,
        fileName: getCompressedFileName(image.file),
      });
    } catch (compressionError) {
      setError(
        compressionError instanceof Error
          ? compressionError.message
          : "The image could not be compressed.",
      );
    } finally {
      setIsCompressing(false);
    }
  }

  function downloadResult() {
    if (!result) {
      return;
    }

    const downloadLink = document.createElement("a");

    downloadLink.href = result.previewUrl;
    downloadLink.download = result.fileName;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();
  }

  if (image) {
    const savings = result
      ? calculateSavings(
          image.file.size,
          result.blob.size,
        )
      : null;

    const resultIsSmaller =
      result && result.blob.size < image.file.size;

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
                    ? `Compressed preview of ${image.file.name}`
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
                    Original size
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
                    Width
                  </dt>

                  <dd className="mt-2 font-bold text-slate-950">
                    {image.width.toLocaleString()} px
                  </dd>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Height
                  </dt>

                  <dd className="mt-2 font-bold text-slate-950">
                    {image.height.toLocaleString()} px
                  </dd>
                </div>
              </dl>

              <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center justify-between gap-4">
                  <label
                    htmlFor="compression-quality"
                    className="font-bold text-slate-950"
                  >
                    Quality
                  </label>

                  <span className="rounded-lg bg-white px-3 py-1 text-sm font-bold text-blue-700 shadow-sm">
                    {quality}%
                  </span>
                </div>

                <input
                  id="compression-quality"
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={quality}
                  disabled={image.file.type === "image/png"}
                  onChange={(event) => {
                    setQuality(Number(event.target.value));
                    resetResult();
                  }}
                  className="mt-4 w-full accent-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
                />

                {image.file.type === "image/png" ? (
                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    PNG uses lossless browser re-encoding, so the
                    quality slider is not available for this format.
                  </p>
                ) : (
                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    Lower quality usually creates a smaller file.
                    Start around 80% for a good balance.
                  </p>
                )}

                <button
                  type="button"
                  disabled={isCompressing}
                  onClick={compressImage}
                  className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-6 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isCompressing
                    ? "Compressing..."
                    : result
                      ? "Compress again"
                      : "Compress image"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {result && (
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
              <div>
                <p
                  className={[
                    "text-sm font-bold uppercase tracking-wider",
                    resultIsSmaller
                      ? "text-emerald-600"
                      : "text-amber-700",
                  ].join(" ")}
                >
                  {resultIsSmaller
                    ? "Compression result"
                    : "Optimization result"}
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-950">
                  {resultIsSmaller
                    ? "Your compressed image is ready"
                    : "Keeping the original is recommended"}
                </h2>
              </div>

              {resultIsSmaller && (
                <button
                  type="button"
                  onClick={downloadResult}
                  className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-emerald-600 px-6 font-semibold text-white transition hover:bg-emerald-700"
                >
                  Download image
                </button>
              )}
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Before
                </p>

                <p className="mt-2 text-xl font-bold text-slate-950">
                  {formatBytes(image.file.size)}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  After
                </p>

                <p className="mt-2 text-xl font-bold text-slate-950">
                  {formatBytes(result.blob.size)}
                </p>
              </div>

              <div
                className={[
                  "rounded-2xl p-5",
                  resultIsSmaller
                    ? "bg-emerald-50"
                    : "bg-amber-50",
                ].join(" ")}
              >
                <p
                  className={[
                    "text-xs font-semibold uppercase tracking-wide",
                    resultIsSmaller
                      ? "text-emerald-700"
                      : "text-amber-700",
                  ].join(" ")}
                >
                  {resultIsSmaller ? "Saved" : "Larger"}
                </p>

                <p
                  className={[
                    "mt-2 text-xl font-bold",
                    resultIsSmaller
                      ? "text-emerald-950"
                      : "text-amber-950",
                  ].join(" ")}
                >
                  {savings !== null
                    ? `${Math.abs(savings).toFixed(1)}%`
                    : "—"}
                </p>
              </div>
            </div>

            {!resultIsSmaller && (
              <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
                This image is already well optimized for the current
                browser-based method. The processed version would be
                larger than the original, so keeping the original file
                is recommended. This is common with optimized PNG files.
              </div>
            )}

            {resultIsSmaller ? (
              <p className="mt-5 text-sm text-slate-500">
                Output: {result.fileName}
              </p>
            ) : (
              <p className="mt-5 text-sm text-slate-500">
                No download is recommended because the processed file
                would be larger than your original image.
              </p>
            )}
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
          🖼️
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
