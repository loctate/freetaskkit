import Link from "next/link";
import type { Category } from "@/types/category";
import { getToolsByCategory } from "@/data/tools";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const categoryTools = getToolsByCategory(category.id);

  return (
    <Link
      href={`/categories/${category.id}`}
      className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
    >
      <span
        className="flex size-12 items-center justify-center rounded-2xl bg-emerald-50 text-xl text-emerald-700"
        aria-hidden="true"
      >
        {category.icon}
      </span>

      <h2 className="mt-5 text-lg font-bold text-slate-950">
        {category.name}
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        {category.description}
      </p>

      <p className="mt-5 text-sm font-semibold text-blue-600">
        {categoryTools.length} planned{" "}
        {categoryTools.length === 1 ? "tool" : "tools"}
        <span className="ml-1 transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </p>
    </Link>
  );
}
