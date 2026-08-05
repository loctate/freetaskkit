import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ToolCard } from "@/components/tools/ToolCard";
import { categories } from "@/data/categories";
import { getToolsByCategory } from "@/data/tools";
import type { ToolCategory } from "@/types/tool";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export function generateStaticParams() {
  return categories
    .filter((category) => category.active)
    .map((category) => ({
      category: category.id,
    }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category: categoryId } = await params;

  const category = categories.find(
    (entry) => entry.id === categoryId && entry.active,
  );

  if (!category) {
    return {};
  }

  return {
    title: category.name,
    description: category.description,
  };
}

export default async function CategoryDetailPage({
  params,
}: CategoryPageProps) {
  const { category: categoryId } = await params;

  const category = categories.find(
    (entry) => entry.id === categoryId && entry.active,
  );

  if (!category) {
    notFound();
  }

  const categoryTools = getToolsByCategory(category.id as ToolCategory);

  return (
    <section className="section-spacing">
      <div className="site-container">
        <nav className="text-sm text-slate-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/categories" className="hover:text-blue-600">
            Categories
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800">{category.name}</span>
        </nav>

        <div className="mt-8 flex items-start gap-5">
          <span
            className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-2xl text-emerald-700"
            aria-hidden="true"
          >
            {category.icon}
          </span>

          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-emerald-600">
              Tool category
            </p>

            <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">
              {category.name}
            </h1>

            <p className="mt-4 max-w-2xl leading-7 text-slate-600">
              {category.description}
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categoryTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        {categoryTools.length === 0 && (
          <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <p className="font-semibold text-slate-900">
              Tools are being prepared
            </p>
            <p className="mt-2 text-sm text-slate-500">
              New tools will be added to this category gradually.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
