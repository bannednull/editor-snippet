import React from "react";
import { useLoaderData } from "react-router-dom";
import type { Snippet } from "./api/snippet";
import { CodeLoader } from "./components/code-loader";
import NotFound from "./components/not-found";
import { createSnippetStore } from "./stores/snippets";

const LazyCodeEditor = React.lazy(() => import("./components/code-editor"));

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
    <div className="flex-grow overflow-auto">
      <React.Suspense fallback={<CodeLoader />}>
        <LazyCodeEditor value={snippet?.code ?? ""} />
      </React.Suspense>
    </div>
  );
}
