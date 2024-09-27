import { createSnippetStore } from "@/stores/snippets";
import { CornerDownLeft, XCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function CodeSuggestion() {
  const {
    selection: { isSelected },
    setIsSelected,
  } = createSnippetStore((state) => state);

  return (
    isSelected && (
      <div className="fixed top-5 right-5 z-50 rounded-md max-w-xl w-full p-5 max-h-[calc(100vh-70px)] h-full bg-muted border">
        <div className="flex flex-col items-start h-full">
          <Button
            variant="ghost"
            className="p-0 h-auto"
            onClick={() => setIsSelected(false)}
          >
            <XCircle className="mr-1 text-muted-foreground" size={16} />
            Close
          </Button>
          <div className="flex-wrap w-full relative mt-auto">
            <Input placeholder="Type to search" className="pr-10" />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <CornerDownLeft className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    )
  );
}
