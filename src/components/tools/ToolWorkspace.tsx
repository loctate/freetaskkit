import type { Tool } from "@/types/tool";
import { ToolPlaceholder } from "@/components/tools/ToolPlaceholder";
import { ImageCompressorWorkspace } from "@/components/tools/image-compressor/ImageCompressorWorkspace";
import { ImageResizerWorkspace } from "@/components/tools/image-resizer/ImageResizerWorkspace";
import { QrCodeGeneratorWorkspace } from "@/components/tools/qr-code-generator/QrCodeGeneratorWorkspace";
import { WhatsAppLinkGeneratorWorkspace } from "@/components/tools/whatsapp-link-generator/WhatsAppLinkGeneratorWorkspace";
import { PercentageCalculatorWorkspace } from "@/components/tools/percentage-calculator/PercentageCalculatorWorkspace";
import { TextCleanerWorkspace } from "@/components/tools/text-cleaner/TextCleanerWorkspace";

interface ToolWorkspaceProps {
  tool: Tool;
}

export function ToolWorkspace({
  tool,
}: ToolWorkspaceProps) {
  switch (tool.slug) {
    case "image-compressor":
      return <ImageCompressorWorkspace />;

    case "image-resizer":
      return <ImageResizerWorkspace />;

    case "qr-code-generator":
      return <QrCodeGeneratorWorkspace />;

    case "whatsapp-link-generator":
      return <WhatsAppLinkGeneratorWorkspace />;

    case "percentage-calculator":
      return <PercentageCalculatorWorkspace />;

    case "text-cleaner":
      return <TextCleanerWorkspace />;

    default:
      return (
        <ToolPlaceholder
          title={`${tool.name} is being prepared`}
        />
      );
  }
}
