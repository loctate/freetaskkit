import type { Tool } from "@/types/tool";
import { ToolPlaceholder } from "@/components/tools/ToolPlaceholder";
import { ImageCompressorWorkspace } from "@/components/tools/image-compressor/ImageCompressorWorkspace";

interface ToolWorkspaceProps {
  tool: Tool;
}

export function ToolWorkspace({
  tool,
}: ToolWorkspaceProps) {
  switch (tool.slug) {
    case "image-compressor":
      return <ImageCompressorWorkspace />;

    default:
      return (
        <ToolPlaceholder
          title={`${tool.name} is being prepared`}
        />
      );
  }
}
