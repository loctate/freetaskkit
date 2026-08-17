"use client";

import { useMemo, useState } from "react";

type CalculatorMode =
  | "percent-of"
  | "what-percent"
  | "change"
  | "difference";

function parseNumber(value: string) {
  if (value.trim() === "") {
    return null;
  }

  const number = Number(value);

  return Number.isFinite(number) ? number : null;
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 6,
  }).format(value);
}

export function PercentageCalculatorWorkspace() {
  const [mode, setMode] =
    useState<CalculatorMode>("percent-of");

  const [firstValue, setFirstValue] = useState("");
  const [secondValue, setSecondValue] = useState("");

  const result = useMemo(() => {
    const first = parseNumber(firstValue);
    const second = parseNumber(secondValue);

    if (first === null || second === null) {
      return {
        value: null,
        label: "Enter both values to calculate.",
        error: null,
      };
    }

    switch (mode) {
      case "percent-of": {
        const value = (first / 100) * second;

        return {
          value,
          label: `${formatNumber(first)}% of ${formatNumber(second)}`,
          error: null,
        };
      }

      case "what-percent": {
        if (second === 0) {
          return {
            value: null,
            label: "",
            error: "The comparison value cannot be zero.",
          };
        }

        const value = (first / second) * 100;

        return {
          value,
          label: `${formatNumber(first)} is this percent of ${formatNumber(second)}`,
          error: null,
        };
      }

      case "change": {
        if (first === 0) {
          return {
            value: null,
            label: "",
            error: "The original value cannot be zero.",
          };
        }

        const value =
          ((second - first) / Math.abs(first)) * 100;

        return {
          value,
          label:
            value >= 0
              ? `Increase from ${formatNumber(first)} to ${formatNumber(second)}`
              : `Decrease from ${formatNumber(first)} to ${formatNumber(second)}`,
          error: null,
        };
      }

      case "difference": {
        const average =
          (Math.abs(first) + Math.abs(second)) / 2;

        if (average === 0) {
          return {
            value: 0,
            label: "Percentage difference",
            error: null,
          };
        }

        const value =
          (Math.abs(first - second) / average) * 100;

        return {
          value,
          label: `Difference between ${formatNumber(first)} and ${formatNumber(second)}`,
          error: null,
        };
      }
    }
  }, [mode, firstValue, secondValue]);

  function resetCalculator() {
    setFirstValue("");
    setSecondValue("");
  }

  function changeMode(nextMode: CalculatorMode) {
    setMode(nextMode);
    resetCalculator();
  }

  const firstLabel = {
    "percent-of": "Percentage",
    "what-percent": "Value",
    change: "Original value",
    difference: "First value",
  }[mode];

  const secondLabel = {
    "percent-of": "Number",
    "what-percent": "Comparison value",
    change: "New value",
    difference: "Second value",
  }[mode];

  const resultSuffix =
    mode === "percent-of" ? "" : "%";

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
            Percentage calculator
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Choose a calculation
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            Calculate everyday percentages, changes, and differences.
          </p>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => changeMode("percent-of")}
            className={[
              "rounded-xl border px-4 py-3 text-left text-sm font-semibold transition",
              mode === "percent-of"
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-slate-300 bg-white text-slate-700 hover:border-blue-300",
            ].join(" ")}
          >
            What is X% of Y?
          </button>

          <button
            type="button"
            onClick={() => changeMode("what-percent")}
            className={[
              "rounded-xl border px-4 py-3 text-left text-sm font-semibold transition",
              mode === "what-percent"
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-slate-300 bg-white text-slate-700 hover:border-blue-300",
            ].join(" ")}
          >
            X is what % of Y?
          </button>

          <button
            type="button"
            onClick={() => changeMode("change")}
            className={[
              "rounded-xl border px-4 py-3 text-left text-sm font-semibold transition",
              mode === "change"
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-slate-300 bg-white text-slate-700 hover:border-blue-300",
            ].join(" ")}
          >
            Increase / decrease
          </button>

          <button
            type="button"
            onClick={() => changeMode("difference")}
            className={[
              "rounded-xl border px-4 py-3 text-left text-sm font-semibold transition",
              mode === "difference"
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-slate-300 bg-white text-slate-700 hover:border-blue-300",
            ].join(" ")}
          >
            Percentage difference
          </button>
        </div>

        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">
              {firstLabel}
            </span>

            <input
              type="number"
              inputMode="decimal"
              value={firstValue}
              onChange={(event) =>
                setFirstValue(event.target.value)
              }
              placeholder="0"
              className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700">
              {secondLabel}
            </span>

            <input
              type="number"
              inputMode="decimal"
              value={secondValue}
              onChange={(event) =>
                setSecondValue(event.target.value)
              }
              placeholder="0"
              className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </label>
        </div>

        {result.error && (
          <div
            className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800"
            role="alert"
          >
            {result.error}
          </div>
        )}

        <button
          type="button"
          onClick={resetCalculator}
          className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 font-semibold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
        >
          Reset
        </button>
      </section>

      <section className="flex min-h-80 flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-emerald-600">
            Result
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Calculation result
          </h2>
        </div>

        <div className="mt-7 flex flex-1 items-center justify-center rounded-2xl bg-slate-50 p-6">
          {result.value !== null && !result.error ? (
            <div className="text-center">
              <p className="text-sm leading-6 text-slate-500">
                {result.label}
              </p>

              <p className="mt-3 break-all text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                {formatNumber(result.value)}
                {resultSuffix}
              </p>
            </div>
          ) : (
            <div className="max-w-xs text-center">
              <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl font-bold text-blue-700">
                %
              </div>

              <p className="mt-4 font-semibold text-slate-900">
                Ready to calculate
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {result.error
                  ? "Correct the values to see a result."
                  : result.label}
              </p>
            </div>
          )}
        </div>

        <p className="mt-4 text-center text-sm text-slate-500">
          Calculations happen instantly in your browser.
        </p>
      </section>

      <section className="lg:col-span-2 rounded-3xl border border-blue-100 bg-blue-50/40 p-6 shadow-sm sm:p-8">
        <div className="flex items-start gap-4">
          <div
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-700"
            aria-hidden="true"
          >
            i
          </div>

          <div>
            <h2 className="text-xl font-bold text-blue-700">
              Calculation guide
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-600">
              Here&apos;s what each calculation does and when to use it.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <article className="border-slate-200 md:border-r md:pr-5">
            <div className="flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-md bg-blue-600 text-xs font-bold text-white">
                1
              </span>

              <h3 className="font-bold text-slate-950">
                What is X% of Y?
              </h3>
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Find the result when a percentage (X) is applied to a number (Y).
            </p>

            <div className="mt-3 rounded-xl bg-blue-100/70 p-3 text-sm">
              <p className="font-semibold text-blue-700">
                Formula: (X / 100) × Y
              </p>

              <p className="mt-1 text-slate-700">
                Example: 20% of 150 = 30
              </p>
            </div>
          </article>

          <article className="border-slate-200 xl:border-r xl:pr-5">
            <div className="flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-md bg-blue-600 text-xs font-bold text-white">
                2
              </span>

              <h3 className="font-bold text-slate-950">
                X is what % of Y?
              </h3>
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Find what percentage a value (X) is of another value (Y).
            </p>

            <div className="mt-3 rounded-xl bg-blue-100/70 p-3 text-sm">
              <p className="font-semibold text-blue-700">
                Formula: (X / Y) × 100
              </p>

              <p className="mt-1 text-slate-700">
                Example: 30 is what % of 120 = 25%
              </p>
            </div>
          </article>

          <article className="border-slate-200 md:border-r md:pr-5">
            <div className="flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-md bg-blue-600 text-xs font-bold text-white">
                3
              </span>

              <h3 className="font-bold text-slate-950">
                Increase / decrease
              </h3>
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Calculate the percentage change from an original value to a new value.
            </p>

            <div className="mt-3 rounded-xl bg-blue-100/70 p-3 text-sm">
              <p className="font-semibold text-blue-700">
                Formula: ((New − Original) / |Original|) × 100
              </p>

              <p className="mt-1 text-slate-700">
                Example: From 100 to 125 = 25% increase
              </p>
            </div>
          </article>

          <article>
            <div className="flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-md bg-blue-600 text-xs font-bold text-white">
                4
              </span>

              <h3 className="font-bold text-slate-950">
                Percentage difference
              </h3>
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Find the percentage difference between two values.
            </p>

            <div className="mt-3 rounded-xl bg-blue-100/70 p-3 text-sm">
              <p className="font-semibold text-blue-700">
                Formula: (|A − B| / ((|A| + |B|) / 2)) × 100
              </p>

              <p className="mt-1 text-slate-700">
                Example: Between 80 and 100 = 22.222222%
              </p>
            </div>
          </article>
        </div>

        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <div className="flex items-start gap-3">
            <div
              className="flex size-8 shrink-0 items-center justify-center rounded-full bg-amber-100"
              aria-hidden="true"
            >
              💡
            </div>

            <div>
              <h3 className="font-bold text-amber-950">
                Notes
              </h3>

              <ul className="mt-2 space-y-1 text-sm leading-6 text-amber-900">
                <li>
                  • Calculations are performed instantly in your browser.
                </li>

                <li>
                  • Enter valid numeric values. Division by zero is not allowed where a comparison or original value is required.
                </li>

                <li>
                  • Percentage difference compares two values symmetrically, while percentage change compares a new value against an original value.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
