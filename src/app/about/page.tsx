import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about FreeTaskKit and its mission to provide simple, practical, and free web tools.",
};

const principles = [
  {
    title: "Useful first",
    description:
      "Every tool should solve a clear and practical digital task.",
  },
  {
    title: "Simple experience",
    description:
      "Tools should work without unnecessary accounts, installations, or steps.",
  },
  {
    title: "Privacy focused",
    description:
      "Whenever possible, files and data are processed directly in the browser.",
  },
  {
    title: "Accessible anywhere",
    description:
      "FreeTaskKit is designed for phones, tablets, and desktop computers.",
  },
];

export default function AboutPage() {
  return (
    <section className="section-spacing">
      <div className="site-container">
        <div className="max-w-3xl">
          <Badge>About FreeTaskKit</Badge>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Practical tools for everyday digital tasks
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            FreeTaskKit is being developed as a collection of focused web tools
            for images, text, business tasks, calculations, documents, and
            other common digital needs.
          </p>

          <p className="mt-4 leading-7 text-slate-600">
            The goal is straightforward: help people complete a task quickly
            without requiring complicated software or unnecessary setup.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {principles.map((principle) => (
            <article
              key={principle.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-lg font-bold text-slate-950">
                {principle.title}
              </h2>

              <p className="mt-2 leading-7 text-slate-600">
                {principle.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
