import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { ToolPlaceholder } from "@/components/tools/ToolPlaceholder";
import {
  getRelatedTools,
  getToolBySlug,
  tools,
} from "@/data/tools";

interface ToolPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({
  params,
}: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return {};
  }

  return {
    title: tool.name,
    description: tool.description,
    keywords: tool.keywords,
    robots:
      tool.status === "published"
        ? {
            index: true,
            follow: true,
          }
        : {
            index: false,
            follow: false,
          },
  };
}

export default async function ToolPage({
  params,
}: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const relatedTools = getRelatedTools(tool);

  return (
    <ToolLayout
      tool={tool}
      relatedTools={relatedTools}
    >
      <ToolPlaceholder
        title={`${tool.name} is being prepared`}
      />
    </ToolLayout>
  );
}
