import { CodeLoader } from "@/components/editor/code-loader";
import { handleEditorDidMount } from "@/lib/editor";
import { editorStore } from "@/stores/editor-store";
import { snippetStore } from "@/stores/snippets-store";
import { Editor } from "@monaco-editor/react";
import React from "react";
import { useShallow } from "zustand/shallow";

export const CodeEditor = React.memo((props: { value: string }) => {
  const { lang } = snippetStore(useShallow((state) => ({ lang: state.lang })));

  const { minimap, tabSize, fontSize, wordWrap, lineNumbers } = editorStore(
    useShallow((state) => ({
      minimap: state.minimap,
      tabSize: state.tabSize,
      fontSize: state.fontSize,
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
        fontSize: fontSize,
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
