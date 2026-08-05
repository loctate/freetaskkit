import Link from "next/link";
import { ToolSearch } from "@/components/search/ToolSearch";
import { CategoryCard } from "@/components/tools/CategoryCard";
import { ToolCard } from "@/components/tools/ToolCard";
import { activeCategories } from "@/data/categories";
import { featuredTools, tools } from "@/data/tools";

const benefits = [
  {
    title: "Free to use",
    description: "Complete everyday tasks without subscriptions.",
    icon: "✓",
  },
  {
    title: "No account required",
    description: "Open a tool and start using it immediately.",
    icon: "→",
  },
  {
    title: "Mobile friendly",
    description: "Designed to work on phones, tablets, and computers.",
    icon: "▣",
  },
  {
    title: "Privacy focused",
    description: "Browser-based tools keep processing on your device.",
    icon: "◆",
  },
];

export default function Home() {
  return (
    <>
      <section className="border-b border-slate-200 bg-gradient-to-b from-blue-50 to-slate-50">
        <div className="site-container py-20 text-center md:py-28">
          <span className="inline-flex rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700">
            Simple tools. Useful results.
          </span>

          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl md:text-6xl">
            Free tools for everyday{" "}
            <span className="text-blue-600">digital tasks</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Complete image, text, business, and everyday tasks quickly without
            installing software or creating an account.
          </p>

          <div className="mt-8">
            <ToolSearch tools={tools} />
          </div>

          <div className="mt-5">
            <Link
              href="/tools"
              className="text-sm font-semibold text-blue-700 hover:text-blue-800"
            >
              Or browse all planned tools →
            </Link>
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="site-container">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                Getting started
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                Planned tools
              </h2>

              <p className="mt-3 max-w-2xl text-slate-600">
                These are the first practical tools being prepared for the
                FreeTaskKit launch.
              </p>
            </div>

            <Link
              href="/tools"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              View all tools →
            </Link>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="site-container section-spacing">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-emerald-600">
              Browse
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
              Explore by category
            </h2>

            <p className="mt-3 max-w-2xl text-slate-600">
              Find tools based on the type of task you need to complete.
            </p>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {activeCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="site-container">
          <div className="rounded-3xl bg-slate-950 px-6 py-10 text-white sm:px-10 md:py-14">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-wider text-blue-400">
                Built for simplicity
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                Get the task done without unnecessary steps
              </h2>

              <p className="mt-4 leading-7 text-slate-300">
                FreeTaskKit is designed around fast, focused tools. No account,
                no installation, and no complicated workflow.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
                >
                  <span
                    className="flex size-9 items-center justify-center rounded-xl bg-blue-600 font-bold"
                    aria-hidden="true"
                  >
                    {benefit.icon}
                  </span>

                  <h3 className="mt-4 font-bold">{benefit.title}</h3>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
