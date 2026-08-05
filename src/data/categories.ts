import type { Category } from "@/types/category";

export const categories: Category[] = [
  {
    id: "image",
    name: "Image Tools",
    description:
      "Compress, resize, convert, and prepare images for everyday use.",
    icon: "🖼️",
    active: true,
  },
  {
    id: "text",
    name: "Text Tools",
    description:
      "Clean, count, format, and organize text without installing software.",
    icon: "✦",
    active: true,
  },
  {
    id: "business",
    name: "Business Tools",
    description:
      "Simple tools for communication, promotion, and small business tasks.",
    icon: "💼",
    active: true,
  },
  {
    id: "calculators",
    name: "Calculators",
    description:
      "Quick calculators for percentages, dates, prices, and daily decisions.",
    icon: "%",
    active: true,
  },
  {
    id: "documents",
    name: "Document Tools",
    description:
      "Create, convert, combine, and prepare common document formats.",
    icon: "📄",
    active: false,
  },
  {
    id: "developer",
    name: "Developer Tools",
    description:
      "Format, encode, generate, and inspect data used in development.",
    icon: "</>",
    active: false,
  },
];

export const activeCategories = categories.filter(
  (category) => category.active,
);
