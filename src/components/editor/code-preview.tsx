import { createSnippetStore } from "@/stores/snippets-store";
import React from "react";
import { useShallow } from "zustand/shallow";

export default function CodePreview() {
  console.log("CODE PREVIEW");
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const workerRef = React.useRef<Worker | null>(null);

  const { code } = createSnippetStore(
    useShallow((state) => ({ code: state.code })),
  );

  React.useEffect(() => {
    workerRef.current = new Worker(new URL("../worker.js", import.meta.url));
    workerRef.current.onmessage = (e) => {
      const { message } = e.data;
      console.log(message);
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  React.useEffect(() => {
    if (workerRef.current) {
      workerRef.current.postMessage({ code });
    }
  }, [code]);

  /* React.useEffect(() => {
    if (iframeRef.current) {
      const doc = `
        <html>
          <head>
            <meta charset="UTF-8">
            <script src="https://cdn.tailwindcss.com"></script>
          </head>
          <body>
            <div id="root">${code}</div>
          </body>
        </html>
        `;
      const document = iframeRef.current.contentDocument;

      if (!document) return;

      document.open();
      document.write(doc);
      document.close();
    }
  }, [code]); */

  return (
    <div className="fixed z-10 bottom-10 right-10 max-w-xl bg-muted">
      <iframe
        ref={iframeRef}
        sandbox="allow-scripts allow-same-origin"
        title="preview"
        width="100%"
        height="100%"
      />
    </div>
  );
}
