import { createSnippetStore } from "@/stores/snippets-store";
import { useShallow } from "zustand/shallow";

export default function LineColumn() {
  const { line, column } = createSnippetStore(
    useShallow((state) => ({ line: state.line, column: state.column })),
  );

  return (
    <p className="text-sm">
      Ln {line}, Col {column}
    </p>
  );
}
