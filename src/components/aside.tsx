import { Plus } from "lucide-react";
import { Button } from "./ui/button";

export default function Aside() {
  const handleCreateNewSnippet = () => {
    console.log("create new snippet");
  };

  return (
    <aside className="border-l p-5">
      <Button
        className="w-full"
        size="sm"
        variant="secondary"
        onClick={handleCreateNewSnippet}
      >
        <Plus className="mr-2" size={14} /> New Snippet
      </Button>
    </aside>
  );
}
