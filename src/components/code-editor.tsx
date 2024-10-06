import { CodeLoader } from "@/components/code-loader";
import { handleEditorDidMount } from "@/lib/editor";
import { createSnippetStore } from "@/stores/snippets";
import { Editor } from "@monaco-editor/react";
import React from "react";
import { useShallow } from "zustand/shallow";

export const CodeEditor = React.memo((props: { value: string }) => {
  console.log("EDITOR");
  const { lang } = createSnippetStore(
    useShallow((state) => ({ lang: state.lang })),
  );

  const handleChange = React.useCallback((value: string | undefined) => {
    if (value) {
      createSnippetStore.setState({ code: value });
    }
  }, []);

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
      onChange={handleChange}
      onMount={handleEditorDidMount}
    />
  );
});

export default CodeEditor;
