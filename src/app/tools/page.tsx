import type { Metadata } from "next";
import { ToolCard } from "@/components/tools/ToolCard";
import { tools } from "@/data/tools";

export const metadata: Metadata = {
  title: "All Tools",
  description:
    "Browse all free image, text, business, calculator, document, and developer tools available from FreeTaskKit.",
};

export default function ToolsPage() {
  return (
    <section className="section-spacing">
      <div className="site-container">
        <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
          Tool directory
        </p>

        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">
          All tools
        </h1>

        <p className="mt-4 max-w-2xl leading-7 text-slate-600">
          Explore free practical tools for everyday digital tasks. More tools will be added over time.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
}
