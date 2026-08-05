export type ToolStatus = "planned" | "published";

export type ToolCategory =
  | "image"
  | "text"
  | "business"
  | "calculators"
  | "documents"
  | "developer";

export interface Tool {
  id: string;
  name: string;
  slug: string;
  category: ToolCategory;
  description: string;
  shortDescription: string;
  keywords: string[];
  status: ToolStatus;
  featured: boolean;
  icon: string;
}
