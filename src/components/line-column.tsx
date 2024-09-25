import { useSnippetStore } from "@/stores/snippets";

export default function LineColumn() {
  const { line, column } = useSnippetStore((state) => state);
  return (
    <p className="text-sm">
      Ln {line}, Col {column}
    </p>
  );
}
