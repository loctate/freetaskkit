"use client";

import {
  ChangeEvent,
  useMemo,
  useState,
} from "react";

function normalizePhoneNumber(value: string) {
  return value.replace(/\D/g, "");
}

function buildWhatsAppNumber(rawNumber: string) {
  let number = normalizePhoneNumber(rawNumber);

  if (!number) {
    return "";
  }

  if (number.startsWith("0")) {
    number = `62${number.slice(1)}`;
  }

  return number;
}

export function WhatsAppLinkGeneratorWorkspace() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const normalizedNumber = useMemo(
    () => buildWhatsAppNumber(phoneNumber),
    [phoneNumber],
  );

  const isPhoneNumberValid =
    normalizedNumber.length >= 8 &&
    normalizedNumber.length <= 15;

  const whatsappLink = useMemo(() => {
    if (!normalizedNumber || !isPhoneNumberValid) {
      return "";
    }

    const baseUrl = `https://wa.me/${normalizedNumber}`;
    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      return baseUrl;
    }

    return `${baseUrl}?text=${encodeURIComponent(trimmedMessage)}`;
  }, [normalizedNumber, isPhoneNumberValid, message]);

  function validatePhoneNumber() {
    if (!normalizedNumber) {
      return "Please enter a WhatsApp phone number.";
    }

    if (normalizedNumber.length < 8) {
      return "The phone number looks too short.";
    }

    if (normalizedNumber.length > 15) {
      return "The phone number looks too long.";
    }

    return null;
  }

  function handlePhoneChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    setPhoneNumber(event.target.value);
    setError(null);
    setCopied(false);
  }

  function handleMessageChange(
    event: ChangeEvent<HTMLTextAreaElement>,
  ) {
    setMessage(event.target.value);
    setCopied(false);
  }

  function openWhatsApp() {
    const validationError = validatePhoneNumber();

    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);

    window.open(
      whatsappLink,
      "_blank",
      "noopener,noreferrer",
    );
  }

  async function copyLink() {
    const validationError = validatePhoneNumber();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await navigator.clipboard.writeText(whatsappLink);

      setCopied(true);
      setError(null);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setError(
        "The link could not be copied. Please copy it manually.",
      );
    }
  }

  function resetForm() {
    setPhoneNumber("");
    setMessage("");
    setError(null);
    setCopied(false);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
            WhatsApp link
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Create a direct chat link
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            Enter a WhatsApp number and an optional message to create
            a shareable click-to-chat link.
          </p>
        </div>

        <label className="mt-7 block">
          <span className="text-sm font-semibold text-slate-700">
            WhatsApp number
          </span>

          <input
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneChange}
            placeholder="081234567890 or +6281234567890"
            className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />

          <span className="mt-2 block text-sm leading-6 text-slate-500">
            Indonesian numbers beginning with 0 are automatically
            converted to country code 62. International numbers can
            be entered with their country code.
          </span>
        </label>

        <label className="mt-6 block">
          <span className="text-sm font-semibold text-slate-700">
            Prefilled message
            <span className="ml-1 font-normal text-slate-400">
              (optional)
            </span>
          </span>

          <textarea
            value={message}
            onChange={handleMessageChange}
            rows={5}
            maxLength={1000}
            placeholder="Hello, I would like to ask about..."
            className="mt-2 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />

          <div className="mt-2 text-right text-xs text-slate-400">
            {message.length}/1000
          </div>
        </label>

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
            onClick={openWhatsApp}
            disabled={!isPhoneNumberValid}
            className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl bg-emerald-600 px-6 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
          >
            Open WhatsApp
          </button>

          <button
            type="button"
            onClick={resetForm}
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 font-semibold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
          >
            Reset
          </button>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-emerald-600">
            Generated link
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Your WhatsApp link
          </h2>
        </div>

        {isPhoneNumberValid ? (
          <>
            <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                WhatsApp number
              </p>

              <p className="mt-2 break-all font-bold text-slate-950">
                +{normalizedNumber}
              </p>
            </div>

            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Link
              </p>

              <p className="mt-2 break-all text-sm leading-6 text-blue-700">
                {whatsappLink}
              </p>
            </div>

            {message.trim() && (
              <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Message preview
                </p>

                <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-slate-700">
                  {message.trim()}
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={copyLink}
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-6 font-semibold text-white transition hover:bg-blue-700"
            >
              {copied ? "Link copied" : "Copy link"}
            </button>

            <p className="mt-4 text-center text-sm text-slate-500">
              The link is created locally in your browser.
            </p>
          </>
        ) : (
          <div className="mt-7 flex min-h-72 items-center justify-center rounded-2xl bg-slate-50 p-6 text-center">
            <div className="max-w-xs">
              <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-emerald-50 text-3xl">
                💬
              </div>

              <p className="mt-4 font-semibold text-slate-900">
                Link preview
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {!normalizedNumber
                  ? "Enter a WhatsApp number to generate your direct chat link."
                  : normalizedNumber.length < 8
                    ? "The phone number looks too short. Enter at least 8 digits including the country code."
                    : "The phone number looks too long. Use no more than 15 digits including the country code."}
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
