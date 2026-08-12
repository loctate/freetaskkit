"use client";

import {
  ChangeEvent,
  DragEvent,
  useEffect,
  useRef,
  useState,
} from "react";

const MAX_FILE_SIZE = 15 * 1024 * 1024;

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

export function ImageCompressorWorkspace() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<ImageInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    return () => {
      if (image?.previewUrl) {
        URL.revokeObjectURL(image.previewUrl);
      }
    };
  }, [image]);

  function resetImage() {
    setImage(null);
    setError(null);
    setIsDragging(false);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function processFile(file: File) {
    setError(null);

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

  if (image) {
    return (
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="grid lg:grid-cols-[1.35fr_1fr]">
          <div className="flex min-h-80 items-center justify-center bg-slate-100 p-6">
            {/* Native img is intentional here because the source is a local object URL. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.previewUrl}
              alt={`Preview of ${image.file.name}`}
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

            <div className="mt-7 rounded-2xl border border-blue-100 bg-blue-50 p-4">
              <p className="font-semibold text-blue-950">
                Ready for compression
              </p>

              <p className="mt-1 text-sm leading-6 text-blue-800">
                Compression controls will be added in the next stage.
                Your original image has not been changed.
              </p>
            </div>
          </div>
        </div>
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
