import Link from "next/link";
import type { Tool } from "@/types/tool";

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  const isPublished = tool.status === "published";

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <span
          className="flex size-11 items-center justify-center rounded-xl bg-blue-50 text-xl text-blue-700"
          aria-hidden="true"
        >
          {tool.icon}
        </span>

        {!isPublished && (
          <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
            Coming soon
          </span>
        )}
      </div>

      <h2 className="mt-5 text-lg font-bold text-slate-950">{tool.name}</h2>

      <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
        {tool.shortDescription}
      </p>

      {isPublished ? (
        <Link
          href={`/tools/${tool.slug}`}
          className="mt-5 inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          Open tool
          <span className="ml-1" aria-hidden="true">
            →
          </span>
        </Link>
      ) : (
        <span className="mt-5 text-sm font-medium text-slate-400">
          In development
        </span>
      )}
    </article>
  );
}
