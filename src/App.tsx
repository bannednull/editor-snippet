import React from "react";
import { useLoaderData } from "react-router-dom";
import type { Snippet } from "./api/snippet";
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
    <React.Suspense fallback={<div>Loading...</div>}>
      <LazyCodeEditor />
    </React.Suspense>
  );
}
