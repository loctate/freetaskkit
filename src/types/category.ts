import type { ToolCategory } from "@/types/tool";

export interface Category {
  id: ToolCategory;
  name: string;
  description: string;
  icon: string;
  active: boolean;
}
