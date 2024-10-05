import { CodeLoader } from "@/components/code-loader";
import { handleEditorDidMount } from "@/lib/editor";
import { createSnippetStore } from "@/stores/snippets";
import { Editor, loader } from "@monaco-editor/react";
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

  loader.init().then((monaco) => {
    monaco.editor.defineTheme("custom", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#0c0e13",
      },
    });
  });

  return (
    <Editor
      height="100%"
      width="100%"
      language={lang}
      theme="custom"
      options={{
        minimap: { enabled: false },
      }}
      value={props.value}
      loading={<CodeLoader />}
      onChange={handleChange}
      onMount={handleEditorDidMount}
    />
  );
});

export default CodeEditor;
