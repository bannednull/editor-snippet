import { CodeLoader } from "@/components/editor/code-loader";
import { handleEditorDidMount } from "@/lib/editor";
import { createEditorStore } from "@/stores/editor-store";
import { createSnippetStore } from "@/stores/snippets-store";
import { Editor } from "@monaco-editor/react";
import React from "react";
import { useShallow } from "zustand/shallow";

export const CodeEditor = React.memo((props: { value: string }) => {
  console.log("EDITOR");
  const { lang } = createSnippetStore(
    useShallow((state) => ({ lang: state.lang })),
  );

  const { minimap, tabSize, wordWrap, lineNumbers } = createEditorStore(
    useShallow((state) => ({
      minimap: state.minimap,
      tabSize: state.tabSize,
      wordWrap: state.wordWrap,
      lineNumbers: state.lineNumbers,
    })),
  );

  return (
    <Editor
      height="100%"
      language={lang}
      options={{
        cursorWidth: 3,
        lineNumbers: lineNumbers,
        minimap: { enabled: minimap },
        tabSize: tabSize,
        wrappingIndent: "indent",
        wordWrap: wordWrap,
      }}
      value={props.value}
      loading={<CodeLoader />}
      onMount={handleEditorDidMount}
    />
  );
});

export default CodeEditor;
