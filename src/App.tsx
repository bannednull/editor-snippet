import React from "react";
import { useLoaderData } from "react-router-dom";
import type { Snippet } from "./api/snippet";
import CodeEditor from "./components/code-editor";
import ComboLang from "./components/combo-lang";
import LineColumn from "./components/line-column";
import NotFound from "./components/not-found";
import SaveSnippet from "./components/save-snippet";
import { createSnippetStore } from "./stores/snippets";

export default function App() {
  const snippet = useLoaderData() as Snippet | { error: string };

  const setSnippet = createSnippetStore((state) => state.setSnippet);

  if (snippet && "error" in snippet) {
    return (
      <div className="flex-grow">
        <NotFound />
      </div>
    );
  }

  React.useEffect(() => {
    if (snippet) {
      setSnippet(snippet);
    }
  }, [snippet, setSnippet]);

  return (
    <>
      <SaveSnippet />

      <div className="flex-grow overflow-auto">
        <CodeEditor value={snippet?.code ?? ""} />
      </div>

      <div className="bg-black/40 text-muted-foreground border-t flex items-center gap-2 text-xs px-2">
        <LineColumn />
        <ComboLang />
      </div>
    </>
  );
}
