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
    status: "published",
    featured: true,
    icon: "🖼️",
    privacyNote:
      "Images are processed directly in your browser. Your files are not uploaded to FreeTaskKit servers.",
    howToUse: [
      "Select or drag an image into the compressor workspace.",
      "Choose the desired compression level and process the image.",
      "Review the reduced file size and download the compressed image.",
    ],
    faq: [
      {
        question: "Is the Image Compressor free to use?",
        answer:
          "Yes. The Image Compressor is free to use and does not require an account.",
      },
      {
        question: "Will my images be uploaded to a server?",
        answer:
          "Images are processed locally in your browser, so they do not need to be uploaded to FreeTaskKit servers.",
      },
      {
        question: "Which image formats will be supported?",
        answer:
          "The current version supports JPG, PNG, and WebP images up to 15 MB.",
      },
    ],
  },
  {
    id: "image-resizer",
    name: "Image Resizer",
    slug: "image-resizer",
    category: "image",
    description:
      "Resize JPG, PNG, and WebP images by width and height directly in your browser.",
    shortDescription: "Resize images for forms, websites, and social media.",
    keywords: [
      "resize image",
      "change image dimensions",
      "photo resizer",
      "image size",
      "resize jpg",
      "resize png",
      "resize webp",
    ],
    status: "published",
    featured: true,
    icon: "↔️",
    privacyNote:
      "Images are processed directly in your browser. Your files are not uploaded to FreeTaskKit servers.",
    howToUse: [
      "Select or drag a JPG, PNG, or WebP image into the resizer workspace.",
      "Set the target width and height, keep the aspect ratio if needed, or choose a quick preset.",
      "Resize the image, review the new dimensions and file size, then download the resized file.",
    ],
    faq: [
      {
        question: "Is the Image Resizer free to use?",
        answer:
          "Yes. The Image Resizer is free to use and does not require an account.",
      },
      {
        question: "Are my images uploaded to a server?",
        answer:
          "No. Image resizing is performed locally in your browser, so your image files are not uploaded to FreeTaskKit servers.",
      },
      {
        question: "Which image formats are supported?",
        answer:
          "The current version supports JPG, PNG, and WebP images up to 15 MB.",
      },
      {
        question: "Can I keep the original image proportions?",
        answer:
          "Yes. Maintain aspect ratio is enabled by default, so changing the width automatically adjusts the height and vice versa.",
      },
      {
        question: "Does resizing change the image format?",
        answer:
          "No. The resized image keeps the same format as the original JPG, PNG, or WebP file.",
      },
    ],
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

export function getToolBySlug(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}

export function getRelatedTools(tool: Tool, limit = 3) {
  return tools
    .filter(
      (candidate) =>
        candidate.id !== tool.id &&
        candidate.category === tool.category &&
        candidate.status === "published",
    )
    .slice(0, limit);
}
