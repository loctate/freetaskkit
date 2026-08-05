"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Tool } from "@/types/tool";

interface ToolSearchProps {
  tools: Tool[];
}

export function ToolSearch({ tools }: ToolSearchProps) {
  const [query, setQuery] = useState("");

  const normalizedQuery = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!normalizedQuery) {
      return [];
    }

    return tools
      .filter((tool) => {
        const searchableText = [
          tool.name,
          tool.description,
          tool.shortDescription,
          tool.category,
          ...tool.keywords,
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(normalizedQuery);
      })
      .slice(0, 6);
  }, [normalizedQuery, tools]);

  return (
    <div className="relative mx-auto w-full max-w-xl text-left">
      <label htmlFor="global-tool-search" className="sr-only">
        Search FreeTaskKit tools
      </label>

      <div className="flex rounded-2xl border border-slate-300 bg-white p-1.5 shadow-sm transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
        <span
          className="flex w-11 shrink-0 items-center justify-center text-slate-400"
          aria-hidden="true"
        >
          ⌕
        </span>

        <input
          id="global-tool-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search image, text, business tools..."
          autoComplete="off"
          className="min-h-11 min-w-0 flex-1 bg-transparent px-1 text-slate-950 outline-none placeholder:text-slate-400"
        />

        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="rounded-xl px-3 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-800"
          >
            Clear
          </button>
        )}
      </div>

      {normalizedQuery && (
        <div className="absolute left-0 right-0 z-30 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          {results.length > 0 ? (
            <ul className="divide-y divide-slate-100">
              {results.map((tool) => (
                <li key={tool.id}>
                  {tool.status === "published" ? (
                    <Link
                      href={`/tools/${tool.slug}`}
                      className="flex items-center gap-4 p-4 transition hover:bg-blue-50"
                    >
                      <ToolSearchResult tool={tool} />
                    </Link>
                  ) : (
                    <div className="flex items-center gap-4 p-4">
                      <ToolSearchResult tool={tool} />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-6 text-center">
              <p className="font-semibold text-slate-900">No tools found</p>
              <p className="mt-1 text-sm text-slate-500">
                Try another word or browse all categories.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ToolSearchResult({ tool }: { tool: Tool }) {
  return (
    <>
      <span
        className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-lg"
        aria-hidden="true"
      >
        {tool.icon}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block font-semibold text-slate-950">{tool.name}</span>
        <span className="mt-0.5 block truncate text-sm text-slate-500">
          {tool.shortDescription}
        </span>
      </span>

      <span
        className={[
          "shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold",
          tool.status === "published"
            ? "bg-emerald-50 text-emerald-700"
            : "bg-amber-50 text-amber-700",
        ].join(" ")}
      >
        {tool.status === "published" ? "Open" : "Coming soon"}
      </span>
    </>
  );
}
