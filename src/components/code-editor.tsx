import useEditor from "@/hooks/useEditor";
import { chatSuggestion, onCursor } from "@/lib/editor";
import { createSnippetStore } from "@/stores/snippets";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import CodeMirror from "@uiw/react-codemirror";
import React from "react";
import { useShallow } from "zustand/shallow";

export const CodeEditor = React.memo(({ value }: { value: string }) => {
  console.log;
  const { basicSetup, theme } = useEditor();

  const { lang } = createSnippetStore(
    useShallow((state) => ({ lang: state.lang })),
  );

  const extensions = React.useMemo(
    () => [loadLanguage(lang)!, onCursor(), chatSuggestion()],
    [lang],
  );

  const handleChange = React.useCallback((value: string) => {
    createSnippetStore.setState({ code: value });
  }, []);

  return (
    <CodeMirror
      className="h-full"
      basicSetup={basicSetup}
      extensions={extensions}
      theme={theme()}
      value={value}
      readOnly={false}
      onChange={handleChange}
    />
  );
});

export default CodeEditor;
