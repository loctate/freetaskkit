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
      "Create downloadable QR codes for links and text directly in your browser.",
    shortDescription: "Create a QR code for links or text.",
    keywords: [
      "qr code",
      "qr generator",
      "create qr",
      "download qr code",
      "qr code maker",
      "url qr code",
      "text qr code",
    ],
    status: "published",
    featured: true,
    icon: "▦",
    privacyNote:
      "QR codes are generated directly in your browser. The URL or text you enter is not uploaded to FreeTaskKit servers.",
    howToUse: [
      "Choose URL or Text and enter the content you want to encode.",
      "Select the QR image size and error correction level, then generate the QR code.",
      "Scan the preview if needed and download the finished QR code as a PNG file.",
    ],
    faq: [
      {
        question: "Is the QR Code Generator free to use?",
        answer:
          "Yes. The QR Code Generator is free to use and does not require an account.",
      },
      {
        question: "Is my URL or text uploaded to a server?",
        answer:
          "No. QR generation happens locally in your browser, so the content you enter is not uploaded to FreeTaskKit servers.",
      },
      {
        question: "Can I create QR codes for both URLs and text?",
        answer:
          "Yes. The generator supports HTTP and HTTPS website URLs as well as ordinary text.",
      },
      {
        question: "Which QR image sizes are available?",
        answer:
          "The current version can generate 256 × 256, 512 × 512, and 1024 × 1024 pixel QR images.",
      },
      {
        question: "What is error correction?",
        answer:
          "Error correction helps a QR code remain readable if part of it is damaged or obscured. Higher levels add more recovery data but can make the QR pattern denser.",
      },
      {
        question: "What format is downloaded?",
        answer:
          "QR codes are downloaded as PNG image files.",
      },
    ],
  },
  {
    id: "whatsapp-link-generator",
    name: "WhatsApp Link Generator",
    slug: "whatsapp-link-generator",
    category: "business",
    description:
      "Create a direct WhatsApp chat link with an optional prefilled message.",
    shortDescription: "Create a direct WhatsApp chat link.",
    keywords: [
      "whatsapp link",
      "wa link",
      "click to chat",
      "whatsapp generator",
      "whatsapp direct link",
      "wa.me link",
      "whatsapp message link",
    ],
    status: "published",
    featured: true,
    icon: "💬",
    privacyNote:
      "The WhatsApp number and message are processed directly in your browser. FreeTaskKit does not upload this information to its servers.",
    howToUse: [
      "Enter the WhatsApp number using a local Indonesian number or an international country code.",
      "Add an optional prefilled message that should appear when the chat opens.",
      "Open WhatsApp directly or copy the generated link to share it elsewhere.",
    ],
    faq: [
      {
        question: "Is the WhatsApp Link Generator free to use?",
        answer:
          "Yes. The WhatsApp Link Generator is free to use and does not require an account.",
      },
      {
        question: "Are my phone number and message uploaded to a server?",
        answer:
          "No. The link is created locally in your browser, so the number and message do not need to be uploaded to FreeTaskKit servers.",
      },
      {
        question: "Can I use an Indonesian phone number beginning with 0?",
        answer:
          "Yes. Indonesian numbers beginning with 0 are automatically converted to country code 62.",
      },
      {
        question: "Can I use an international phone number?",
        answer:
          "Yes. Enter the number with its international country code. The generated WhatsApp link uses digits only.",
      },
      {
        question: "Can I add a ready-to-send message?",
        answer:
          "Yes. The message is optional and is safely encoded into the generated WhatsApp link.",
      },
      {
        question: "Does the tool send the WhatsApp message automatically?",
        answer:
          "No. The tool only creates or opens the WhatsApp chat link. You still review and send the message yourself in WhatsApp.",
      },
    ],
  },
  {
    id: "percentage-calculator",
    name: "Percentage Calculator",
    slug: "percentage-calculator",
    category: "calculators",
    description:
      "Calculate percentages, increases, decreases, and percentage differences instantly in your browser.",
    shortDescription: "Calculate percentages for everyday needs.",
    keywords: [
      "percentage calculator",
      "percent",
      "discount calculator",
      "percentage increase",
      "percentage decrease",
      "percentage difference",
      "percent of number",
      "percentage change",
    ],
    status: "published",
    featured: true,
    icon: "%",
    privacyNote:
      "Calculations are performed directly in your browser. The numbers you enter are not uploaded to FreeTaskKit servers.",
    howToUse: [
      "Choose the percentage calculation that matches what you want to find.",
      "Enter the required values in the input fields.",
      "Review the result instantly and use the calculation guide if you need help choosing a formula.",
    ],
    faq: [
      {
        question: "Is the Percentage Calculator free to use?",
        answer:
          "Yes. The Percentage Calculator is free to use and does not require an account.",
      },
      {
        question: "What percentage calculations are available?",
        answer:
          "The current version calculates a percentage of a number, what percentage one value is of another, percentage increase or decrease, and percentage difference.",
      },
      {
        question: "What is the difference between percentage change and percentage difference?",
        answer:
          "Percentage change compares a new value with an original value. Percentage difference compares two values symmetrically without treating either one as the original.",
      },
      {
        question: "Can I use decimal numbers?",
        answer:
          "Yes. Decimal values can be entered in the calculator.",
      },
      {
        question: "Why can some calculations not use zero?",
        answer:
          "Some percentage formulas require division by a comparison or original value. Division by zero is undefined, so those calculations show an error when zero is used as the divisor.",
      },
      {
        question: "Are my calculation values sent to a server?",
        answer:
          "No. The calculations happen locally in your browser, so the values you enter do not need to be uploaded to FreeTaskKit servers.",
      },
    ],
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
