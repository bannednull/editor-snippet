import { post } from "@/lib/fetch";
import { createSnippetStore } from "@/stores/snippets";
import type { OnMount } from "@monaco-editor/react";

export const handleEditorDidMount: OnMount = (editor, monaco) => {
  const generateAndInsertCode = () => {
    const model = editor.getModel();
    const selection = editor.getSelection();

    if (!model || !selection) return;

    const lineNumber = selection.startLineNumber;
    const lineContent = model.getLineContent(lineNumber);
    const regex = /^\s*(\/\/)\s*(\S.*)$/;
    const match = lineContent.match(regex);

    if (match) {
      const selected = match[2];
      const lang = createSnippetStore.getState().lang;
      post<{ message: string }>("/api/chat/generate", {
        language: lang,
        prompt: selected,
      }).then((res) => {
        if ("error" in res) {
          console.error("Error generating code:", res.error);
          return;
        }

        const insertPosition = new monaco.Position(lineNumber + 1, 1);
        const insertOperation = {
          range: new monaco.Range(
            insertPosition.lineNumber,
            insertPosition.column,
            insertPosition.lineNumber,
            insertPosition.column,
          ),
          text: `\n${res.message}\n`,
        };

        editor.executeEdits("insert-generated-code", [insertOperation]);

        const newPosition = new monaco.Position(lineNumber + 2, 1);
        editor.setPosition(newPosition);
        editor.revealLineInCenter(newPosition.lineNumber);
      });
    }
  };

  editor.addCommand(
    monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyL,
    generateAndInsertCode,
  );

  editor.onDidChangeCursorPosition((e) => {
    createSnippetStore.setState({
      line: e.position.lineNumber,
      column: e.position.column,
    });
  });
};
