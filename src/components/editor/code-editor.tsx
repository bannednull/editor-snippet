import { CodeLoader } from "@/components/editor/code-loader";
import { handleEditorDidMount } from "@/lib/editor";
import { createSnippetStore } from "@/stores/snippets-store";
import { Editor } from "@monaco-editor/react";
import React from "react";
import { useShallow } from "zustand/shallow";

export const CodeEditor = React.memo((props: { value: string }) => {
  console.log("EDITOR");
  const { lang } = createSnippetStore(
    useShallow((state) => ({ lang: state.lang })),
  );

  return (
    <Editor
      height="100%"
      language={lang}
      options={{
        minimap: { enabled: false },
        wordWrap: "on",
        wrappingIndent: "indent",
        cursorWidth: 3,
      }}
      value={props.value}
      loading={<CodeLoader />}
      onMount={handleEditorDidMount}
    />
  );
});

export default CodeEditor;
