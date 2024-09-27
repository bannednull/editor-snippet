import { createSnippetStore } from "@/stores/snippets";

export default function LineColumn() {
  const { line, column } = createSnippetStore((state) => state);
  return (
    <p className="text-sm">
      Ln {line}, Col {column}
    </p>
  );
}
