import type { ReactNode } from "react";
import Link from "next/link";
import type { Tool } from "@/types/tool";
import { categories } from "@/data/categories";

interface ToolLayoutProps {
  tool: Tool;
  children: ReactNode;
  relatedTools?: Tool[];
}

export function ToolLayout({
  tool,
  children,
  relatedTools = [],
}: ToolLayoutProps) {
  const category = categories.find((item) => item.id === tool.category);

  return (
    <section className="section-spacing">
      <div className="site-container">
        <nav
          className="text-sm text-slate-500"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>

          <span className="mx-2">/</span>

          <Link href="/tools" className="hover:text-blue-600">
            Tools
          </Link>

          {category && (
            <>
              <span className="mx-2">/</span>

              <Link
                href={`/categories/${category.id}`}
                className="hover:text-blue-600"
              >
                {category.name}
              </Link>
            </>
          )}

          <span className="mx-2">/</span>

          <span className="text-slate-800">{tool.name}</span>
        </nav>

        <header className="mt-8">
          <div className="flex items-start gap-5">
            <span
              className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-2xl"
              aria-hidden="true"
            >
              {tool.icon}
            </span>

            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                {category?.name ?? "FreeTaskKit Tool"}
              </p>

              <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                {tool.name}
              </h1>

              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
                {tool.description}
              </p>
            </div>
          </div>
        </header>

        <div className="mt-10">
          {children}
        </div>

        {tool.privacyNote && (
          <section className="mt-10 rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
            <h2 className="font-bold text-emerald-950">
              Privacy
            </h2>

            <p className="mt-2 leading-7 text-emerald-900">
              {tool.privacyNote}
            </p>
          </section>
        )}

        {tool.howToUse && tool.howToUse.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-slate-950">
              How to use
            </h2>

            <ol className="mt-6 grid gap-4 md:grid-cols-3">
              {tool.howToUse.map((step, index) => (
                <li
                  key={step}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <span className="flex size-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                    {index + 1}
                  </span>

                  <p className="mt-4 leading-7 text-slate-600">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        )}

        {tool.faq && tool.faq.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-slate-950">
              Frequently asked questions
            </h2>

            <div className="mt-6 space-y-4">
              {tool.faq.map((item) => (
                <article
                  key={item.question}
                  className="rounded-2xl border border-slate-200 bg-white p-6"
                >
                  <h3 className="font-bold text-slate-950">
                    {item.question}
                  </h3>

                  <p className="mt-2 leading-7 text-slate-600">
                    {item.answer}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}

        {relatedTools.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-slate-950">
              Related tools
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedTools.map((relatedTool) => (
                <Link
                  key={relatedTool.id}
                  href={`/tools/${relatedTool.slug}`}
                  className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="flex size-10 items-center justify-center rounded-xl bg-blue-50"
                      aria-hidden="true"
                    >
                      {relatedTool.icon}
                    </span>

                    <div>
                      <h3 className="font-bold text-slate-950">
                        {relatedTool.name}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {relatedTool.shortDescription}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </section>
  );
}
