import type { Tool } from "@/types/tool";

export const tools: Tool[] = [
  {
    id: "image-compressor",
    name: "Image Compressor",
    slug: "image-compressor",
    category: "image",
    description:
      "Reduce JPG, PNG, and WebP file sizes directly in your browser.",
    shortDescription: "Reduce image file sizes quickly and privately.",
    keywords: [
      "compress image",
      "reduce image size",
      "compress jpg",
      "compress png",
      "image optimizer",
    ],
    status: "planned",
    featured: true,
    icon: "🖼️",
  },
  {
    id: "image-resizer",
    name: "Image Resizer",
    slug: "image-resizer",
    category: "image",
    description:
      "Resize images by width and height while keeping the correct proportions.",
    shortDescription: "Resize images for forms, websites, and social media.",
    keywords: [
      "resize image",
      "change image dimensions",
      "photo resizer",
      "image size",
    ],
    status: "planned",
    featured: true,
    icon: "↔️",
  },
  {
    id: "qr-code-generator",
    name: "QR Code Generator",
    slug: "qr-code-generator",
    category: "business",
    description:
      "Create downloadable QR codes for links, text, and everyday sharing.",
    shortDescription: "Create a QR code for links or text.",
    keywords: [
      "qr code",
      "qr generator",
      "create qr",
      "download qr code",
    ],
    status: "planned",
    featured: true,
    icon: "▦",
  },
  {
    id: "whatsapp-link-generator",
    name: "WhatsApp Link Generator",
    slug: "whatsapp-link-generator",
    category: "business",
    description:
      "Create a WhatsApp chat link with an optional ready-to-send message.",
    shortDescription: "Create a direct WhatsApp chat link.",
    keywords: [
      "whatsapp link",
      "wa link",
      "click to chat",
      "whatsapp generator",
    ],
    status: "planned",
    featured: true,
    icon: "💬",
  },
  {
    id: "percentage-calculator",
    name: "Percentage Calculator",
    slug: "percentage-calculator",
    category: "calculators",
    description:
      "Calculate percentages, increases, decreases, and percentage differences.",
    shortDescription: "Calculate percentages for everyday needs.",
    keywords: [
      "percentage calculator",
      "percent",
      "discount calculator",
      "percentage increase",
    ],
    status: "planned",
    featured: true,
    icon: "%",
  },
  {
    id: "text-cleaner",
    name: "Text Cleaner",
    slug: "text-cleaner",
    category: "text",
    description:
      "Clean extra spaces, empty lines, and inconsistent formatting from text.",
    shortDescription: "Clean and tidy text in seconds.",
    keywords: [
      "text cleaner",
      "remove extra spaces",
      "clean text",
      "format text",
    ],
    status: "planned",
    featured: true,
    icon: "✦",
  },
];

export const featuredTools = tools.filter((tool) => tool.featured);

export function getToolsByCategory(category: Tool["category"]) {
  return tools.filter((tool) => tool.category === category);
}
