import React from "react";
import { useLoaderData } from "react-router-dom";
import type { Snippet } from "./api/snippet";
import { CodeLoader } from "./components/code-loader";
import { createSnippetStore } from "./stores/snippets";

const LazyCodeEditor = React.lazy(() => import("./components/code-editor"));

export default function App() {
  const snippet = useLoaderData() as Snippet;

  const setSnippet = createSnippetStore((state) => state.setSnippet);

  React.useEffect(() => {
    if (snippet) {
      setSnippet(snippet);
    }
  }, [snippet, setSnippet]);

  return (
    <div className="flex-grow overflow-auto">
      <React.Suspense fallback={<CodeLoader />}>
        <LazyCodeEditor />
      </React.Suspense>
    </div>
  );
}
