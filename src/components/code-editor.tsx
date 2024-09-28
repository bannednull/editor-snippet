import useEditor from "@/hooks/useEditor";
import { createSnippetStore } from "@/stores/snippets";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import CodeMirror, { EditorView, type Extension } from "@uiw/react-codemirror";
import React from "react";
import { useShallow } from "zustand/shallow";

const onCursor = (): Extension => {
  return EditorView.updateListener.of((update) => {
    if (update.selectionSet) {
      const line = update.state.doc.lineAt(
        update.state.selection.main.head,
      ).number;
      const column =
        update.state.selection.ranges[0].head -
        update.state.doc.lineAt(update.state.selection.main.head).from +
        1;
      createSnippetStore.setState({ line, column });
    }
  });
};

export default function CodeEditor() {
  const { basicSetup, theme, chatSuggestion } = useEditor();

  const { lang, code } = createSnippetStore(
    useShallow((state) => ({ code: state.code, lang: state.lang })),
  );

  const onChange = React.useCallback((value: string) => {
    createSnippetStore.setState({ code: value });
  }, []);

  return (
    <CodeMirror
      className="h-full"
      basicSetup={basicSetup}
      extensions={[loadLanguage(lang)!, onCursor(), chatSuggestion()]}
      theme={theme()}
      value={code}
      onChange={onChange}
    />
  );
}
