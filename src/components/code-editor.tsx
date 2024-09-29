import useEditor, { chatSuggestion, onCursor } from "@/hooks/useEditor";
import { createSnippetStore } from "@/stores/snippets";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import CodeMirror from "@uiw/react-codemirror";
import React from "react";
import { useShallow } from "zustand/shallow";

export const CodeEditor = () => {
  const { basicSetup, theme } = useEditor();

  const code = createSnippetStore(useShallow((state) => state.code));

  const extensions = React.useMemo(
    () => [loadLanguage("javascript")!, onCursor(), chatSuggestion()],
    [],
  );

  const handleChange = React.useCallback((value: string) => {
    createSnippetStore.setState({ code: value });
  }, []);

  return (
    <div className="flex-grow">
      <CodeMirror
        className="h-full"
        basicSetup={basicSetup}
        extensions={extensions}
        theme={theme()}
        value={code}
        readOnly={false}
        onChange={handleChange}
      />
    </div>
  );
};

export default CodeEditor;
