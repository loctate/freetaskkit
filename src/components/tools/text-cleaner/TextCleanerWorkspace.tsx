"use client";

import {
  useMemo,
  useState,
} from "react";

interface CleanerOptions {
  trimLines: boolean;
  removeExtraSpaces: boolean;
  removeEmptyLines: boolean;
  normalizeLineBreaks: boolean;
}

const DEFAULT_OPTIONS: CleanerOptions = {
  trimLines: true,
  removeExtraSpaces: true,
  removeEmptyLines: false,
  normalizeLineBreaks: true,
};

function normalizeNewLines(value: string) {
  return value.replace(/\r\n?/g, "\n");
}

function cleanText(
  input: string,
  options: CleanerOptions,
) {
  let result = input;

  if (options.normalizeLineBreaks) {
    result = normalizeNewLines(result);
  }

  let lines = result.split("\n");

  if (options.trimLines) {
    lines = lines.map((line) => line.trim());
  }

  if (options.removeExtraSpaces) {
    lines = lines.map((line) =>
      line.replace(/[ \t]+/g, " "),
    );
  }

  if (options.removeEmptyLines) {
    lines = lines.filter(
      (line) => line.trim().length > 0,
    );
  }

  return lines.join("\n");
}

function getTextStats(value: string) {
  const characters = value.length;

  const words =
    value.trim().length === 0
      ? 0
      : value.trim().split(/\s+/).length;

  const lines =
    value.length === 0
      ? 0
      : normalizeNewLines(value).split("\n").length;

  return {
    characters,
    words,
    lines,
  };
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl bg-slate-50 px-3 py-2.5">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="mt-1 font-bold text-slate-950">
        {value.toLocaleString()}
      </p>
    </div>
  );
}

export function TextCleanerWorkspace() {
  const [input, setInput] = useState("");
  const [options, setOptions] =
    useState<CleanerOptions>(DEFAULT_OPTIONS);

  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] =
    useState<string | null>(null);

  const output = useMemo(
    () => cleanText(input, options),
    [input, options],
  );

  const inputStats = useMemo(
    () => getTextStats(input),
    [input],
  );

  const outputStats = useMemo(
    () => getTextStats(output),
    [output],
  );

  function updateOption(
    option: keyof CleanerOptions,
  ) {
    setOptions((current) => ({
      ...current,
      [option]: !current[option],
    }));

    setCopied(false);
    setCopyError(null);
  }

  async function copyOutput() {
    if (!output) {
      return;
    }

    try {
      await navigator.clipboard.writeText(output);

      setCopied(true);
      setCopyError(null);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCopied(false);
      setCopyError(
        "The cleaned text could not be copied automatically. Please select and copy it manually.",
      );
    }
  }

  function clearText() {
    setInput("");
    setCopied(false);
    setCopyError(null);
  }

  function resetOptions() {
    setOptions(DEFAULT_OPTIONS);
    setCopied(false);
    setCopyError(null);
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Cleaning options
            </p>

            <h2 className="mt-2 text-2xl font-bold text-slate-950">
              Choose how to clean your text
            </h2>

            <p className="mt-3 max-w-2xl leading-7 text-slate-600">
              Turn each option on or off. The cleaned result updates
              instantly as you type.
            </p>
          </div>

          <button
            type="button"
            onClick={resetOptions}
            className="shrink-0 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            Reset options
          </button>
        </div>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <input
              type="checkbox"
              checked={options.trimLines}
              onChange={() =>
                updateOption("trimLines")
              }
              className="mt-1 size-4 accent-blue-600"
            />

            <span>
              <span className="block font-semibold text-slate-950">
                Trim each line
              </span>

              <span className="mt-1 block text-sm leading-6 text-slate-500">
                Remove spaces from the beginning and end of each line.
              </span>
            </span>
          </label>

          <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <input
              type="checkbox"
              checked={options.removeExtraSpaces}
              onChange={() =>
                updateOption("removeExtraSpaces")
              }
              className="mt-1 size-4 accent-blue-600"
            />

            <span>
              <span className="block font-semibold text-slate-950">
                Remove extra spaces
              </span>

              <span className="mt-1 block text-sm leading-6 text-slate-500">
                Replace repeated spaces and tabs with a single space.
              </span>
            </span>
          </label>

          <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <input
              type="checkbox"
              checked={options.removeEmptyLines}
              onChange={() =>
                updateOption("removeEmptyLines")
              }
              className="mt-1 size-4 accent-blue-600"
            />

            <span>
              <span className="block font-semibold text-slate-950">
                Remove empty lines
              </span>

              <span className="mt-1 block text-sm leading-6 text-slate-500">
                Delete blank lines between text.
              </span>
            </span>
          </label>

          <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <input
              type="checkbox"
              checked={options.normalizeLineBreaks}
              onChange={() =>
                updateOption("normalizeLineBreaks")
              }
              className="mt-1 size-4 accent-blue-600"
            />

            <span>
              <span className="block font-semibold text-slate-950">
                Normalize line breaks
              </span>

              <span className="mt-1 block text-sm leading-6 text-slate-500">
                Convert mixed line endings into a consistent format.
              </span>
            </span>
          </label>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                Original text
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-950">
                Paste your text
              </h2>
            </div>

            <button
              type="button"
              onClick={clearText}
              disabled={!input}
              className="shrink-0 rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Clear
            </button>
          </div>

          <textarea
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
              setCopied(false);
              setCopyError(null);
            }}
            rows={14}
            placeholder={`Paste text here...

Example:

   Hello     world

This   text    has extra spaces.


And empty lines.`}
            className="mt-6 w-full resize-y rounded-2xl border border-slate-300 bg-white px-4 py-4 font-mono text-sm leading-7 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />

          <div className="mt-4 grid grid-cols-3 gap-3">
            <StatCard
              label="Characters"
              value={inputStats.characters}
            />

            <StatCard
              label="Words"
              value={inputStats.words}
            />

            <StatCard
              label="Lines"
              value={inputStats.lines}
            />
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-emerald-600">
                Cleaned text
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-950">
                Result
              </h2>
            </div>

            <button
              type="button"
              onClick={copyOutput}
              disabled={!output}
              className="shrink-0 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {copied ? "Copied" : "Copy text"}
            </button>
          </div>

          <textarea
            value={output}
            readOnly
            rows={14}
            placeholder="Your cleaned text will appear here."
            className="mt-6 w-full resize-y rounded-2xl border border-emerald-200 bg-emerald-50/30 px-4 py-4 font-mono text-sm leading-7 text-slate-950 outline-none"
          />

          <div className="mt-4 grid grid-cols-3 gap-3">
            <StatCard
              label="Characters"
              value={outputStats.characters}
            />

            <StatCard
              label="Words"
              value={outputStats.words}
            />

            <StatCard
              label="Lines"
              value={outputStats.lines}
            />
          </div>

          {copyError && (
            <div
              className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800"
              role="alert"
            >
              {copyError}
            </div>
          )}
        </section>
      </div>

      <section className="rounded-3xl border border-blue-100 bg-blue-50/40 p-6 sm:p-8">
        <div>
          <h2 className="text-xl font-bold text-blue-700">
            Cleaning guide
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Choose only the cleaning actions you need. Keeping an option
            turned off preserves that part of your original formatting.
          </p>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <article>
            <h3 className="font-bold text-slate-950">
              Trim each line
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Useful when copied text contains unwanted spaces before or
              after lines.
            </p>
          </article>

          <article>
            <h3 className="font-bold text-slate-950">
              Remove extra spaces
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Useful for text with repeated spaces or tabs between words.
            </p>
          </article>

          <article>
            <h3 className="font-bold text-slate-950">
              Remove empty lines
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Useful when pasted content contains too many blank lines.
            </p>
          </article>

          <article>
            <h3 className="font-bold text-slate-950">
              Normalize line breaks
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Useful when text comes from different operating systems or
              applications with mixed line endings.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
