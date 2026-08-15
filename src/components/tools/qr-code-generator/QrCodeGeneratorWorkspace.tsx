"use client";

import QRCode from "qrcode";
import {
  ChangeEvent,
  useEffect,
  useRef,
  useState,
} from "react";

type QrMode = "url" | "text";
type ErrorCorrectionLevel = "L" | "M" | "Q" | "H";

const QR_SIZES = [256, 512, 1024] as const;

export function QrCodeGeneratorWorkspace() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [mode, setMode] = useState<QrMode>("url");
  const [value, setValue] = useState("");
  const [size, setSize] = useState<number>(512);

  const [errorCorrectionLevel, setErrorCorrectionLevel] =
    useState<ErrorCorrectionLevel>("M");

  const [error, setError] = useState<string | null>(null);
  const [hasQrCode, setHasQrCode] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    setHasQrCode(false);
    setError(null);
  }, [mode, value, size, errorCorrectionLevel]);

  function validateValue() {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return "Please enter a URL or text to generate a QR code.";
    }

    if (mode === "url") {
      try {
        const url = new URL(trimmedValue);

        if (!["http:", "https:"].includes(url.protocol)) {
          return "Please enter a valid HTTP or HTTPS URL.";
        }
      } catch {
        return "Please enter a valid URL, for example https://example.com.";
      }
    }

    return null;
  }

  async function generateQrCode() {
    const validationError = validateValue();

    if (validationError) {
      setError(validationError);
      setHasQrCode(false);
      return;
    }

    const canvas = canvasRef.current;

    if (!canvas) {
      setError("The QR code preview could not be initialized.");
      return;
    }

    setError(null);
    setIsGenerating(true);

    try {
      await QRCode.toCanvas(
        canvas,
        value.trim(),
        {
          width: size,
          margin: 2,
          errorCorrectionLevel,
          color: {
            dark: "#0f172a",
            light: "#ffffff",
          },
        },
      );

      setHasQrCode(true);
    } catch {
      setError("The QR code could not be generated.");
      setHasQrCode(false);
    } finally {
      setIsGenerating(false);
    }
  }

  function downloadQrCode() {
    const canvas = canvasRef.current;

    if (!canvas || !hasQrCode) {
      return;
    }

    const downloadLink = document.createElement("a");

    downloadLink.download = "freetaskkit-qr-code.png";
    downloadLink.href = canvas.toDataURL("image/png");

    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();
  }

  function resetQrCode() {
    setMode("url");
    setValue("");
    setSize(512);
    setErrorCorrectionLevel("M");
    setError(null);
    setHasQrCode(false);

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (canvas && context) {
      context.clearRect(
        0,
        0,
        canvas.width,
        canvas.height,
      );
    }
  }

  function handleValueChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setValue(event.target.value);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
            QR content
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Create your QR code
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            Enter a website address or text. The QR code is generated
            directly in your browser.
          </p>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-3 rounded-2xl bg-slate-100 p-1.5">
          <button
            type="button"
            onClick={() => setMode("url")}
            className={[
              "rounded-xl px-4 py-2.5 text-sm font-semibold transition",
              mode === "url"
                ? "bg-white text-blue-700 shadow-sm"
                : "text-slate-600 hover:text-slate-900",
            ].join(" ")}
          >
            URL
          </button>

          <button
            type="button"
            onClick={() => setMode("text")}
            className={[
              "rounded-xl px-4 py-2.5 text-sm font-semibold transition",
              mode === "text"
                ? "bg-white text-blue-700 shadow-sm"
                : "text-slate-600 hover:text-slate-900",
            ].join(" ")}
          >
            Text
          </button>
        </div>

        <div className="mt-6">
          {mode === "url" ? (
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">
                Website URL
              </span>

              <input
                type="url"
                value={value}
                onChange={handleValueChange}
                placeholder="https://example.com"
                className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </label>
          ) : (
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">
                Text
              </span>

              <textarea
                value={value}
                onChange={handleValueChange}
                placeholder="Enter text for your QR code..."
                rows={5}
                className="mt-2 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </label>
          )}
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">
              Image size
            </span>

            <select
              value={size}
              onChange={(event) =>
                setSize(Number(event.target.value))
              }
              className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-3 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            >
              {QR_SIZES.map((qrSize) => (
                <option key={qrSize} value={qrSize}>
                  {qrSize} × {qrSize} px
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700">
              Error correction
            </span>

            <select
              value={errorCorrectionLevel}
              onChange={(event) =>
                setErrorCorrectionLevel(
                  event.target.value as ErrorCorrectionLevel,
                )
              }
              className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-3 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            >
              <option value="L">Low</option>
              <option value="M">Medium</option>
              <option value="Q">Quartile</option>
              <option value="H">High</option>
            </select>
          </label>
        </div>

        {error && (
          <div
            className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800"
            role="alert"
          >
            {error}
          </div>
        )}

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            disabled={isGenerating}
            onClick={generateQrCode}
            className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl bg-blue-600 px-6 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isGenerating
              ? "Generating..."
              : hasQrCode
                ? "Generate again"
                : "Generate QR code"}
          </button>

          <button
            type="button"
            onClick={resetQrCode}
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 font-semibold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
          >
            Reset
          </button>
        </div>
      </section>

      <section className="flex min-h-[28rem] flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-emerald-600">
            Preview
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            QR code
          </h2>
        </div>

        <div className="mt-6 flex flex-1 items-center justify-center rounded-2xl bg-slate-50 p-6">
          <div
            className={[
              "flex items-center justify-center rounded-2xl bg-white p-4 shadow-sm",
              hasQrCode ? "" : "min-h-64 min-w-64",
            ].join(" ")}
          >
            <canvas
              ref={canvasRef}
              className={
                hasQrCode
                  ? "h-auto max-w-full"
                  : "hidden"
              }
            />

            {!hasQrCode && (
              <div className="max-w-52 text-center">
                <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
                  ▦
                </div>

                <p className="mt-4 font-semibold text-slate-900">
                  QR preview
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Enter content and generate a QR code to see the preview.
                </p>
              </div>
            )}
          </div>
        </div>

        {hasQrCode && (
          <button
            type="button"
            onClick={downloadQrCode}
            className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-emerald-600 px-6 font-semibold text-white transition hover:bg-emerald-700"
          >
            Download PNG
          </button>
        )}

        <p className="mt-4 text-center text-sm text-slate-500">
          Generated locally in your browser.
        </p>
      </section>
    </div>
  );
}
