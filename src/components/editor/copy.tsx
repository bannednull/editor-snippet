import { Button } from "@/components/ui/button";
import { createSnippetStore } from "@/stores/snippets-store";
import { Copy } from "lucide-react";

export default function CopyClip() {
  const handleCopy = () => {
    const code = createSnippetStore.getState().code;
    navigator.clipboard.writeText(code).then(() => alert("copy"));
  };
  return (
    <>
      <Button
        variant="ghost"
        className="size-auto py-0.5 px-2 ml-auto"
        onClick={handleCopy}
      >
        <Copy size={14} className="mr-1" /> Copy
      </Button>
    </>
  );
}
