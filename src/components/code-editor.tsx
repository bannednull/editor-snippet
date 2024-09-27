import useEditor from "@/hooks/useEditor";
import { createSnippetStore } from "@/stores/snippets";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import CodeMirror, { EditorView, type Extension } from "@uiw/react-codemirror";
import React from "react";

export default function CodeEditor() {
  const { basicSetup, theme, selectedWrap } = useEditor();

  const { lang, code, setCode, setLine, setColumn } = createSnippetStore(
    (state) => state,
  );

  const onChange = React.useCallback(
    (value: string) => {
      setCode(value);
    },
    [setCode],
  );

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
        setLine(line);
        setColumn(column);
      }
    });
  };

  return (
    <CodeMirror
      className="h-full"
      basicSetup={basicSetup}
      extensions={[loadLanguage(lang)!, onCursor(), selectedWrap()]}
      theme={theme()}
      value={code}
      onChange={onChange}
    />
  );
}
