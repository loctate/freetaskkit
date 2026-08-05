import type { Metadata } from "next";
import { CategoryCard } from "@/components/tools/CategoryCard";
import { activeCategories } from "@/data/categories";

export const metadata: Metadata = {
  title: "Tool Categories",
  description:
    "Browse FreeTaskKit tools by image, text, business, calculator, document, and developer categories.",
};

export default function CategoriesPage() {
  return (
    <section className="section-spacing">
      <div className="site-container">
        <p className="text-sm font-bold uppercase tracking-wider text-emerald-600">
          Browse
        </p>

        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">
          Tool categories
        </h1>

        <p className="mt-4 max-w-2xl leading-7 text-slate-600">
          Choose a category based on the type of digital task you need to
          complete.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {activeCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
