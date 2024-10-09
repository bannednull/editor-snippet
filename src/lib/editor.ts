import { post } from "@/lib/fetch";
import { editorStore } from "@/stores/editor-store";
import { snippetStore } from "@/stores/snippets-store";
import type { Monaco, OnMount } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { debounce } from "./utils";

export type Languages = "html" | "javascript" | "typescript";

export const languages: Languages[] = ["html", "javascript", "typescript"];

const generateAndInsertCode = (
  editor: editor.IStandaloneCodeEditor,
  monaco: Monaco,
) => {
  const model = editor.getModel();
  const selection = editor.getSelection();

  if (!model || !selection) return;

  const lineNumber = selection.startLineNumber;
  const lineContent = model.getLineContent(lineNumber);
  const regex = /^\s*(\/\/)\s*(\S.*)$/;
  const match = lineContent.match(regex);

  if (match) {
    const selected = match[2];
    const lang = snippetStore.getState().lang;
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

export const handleEditorDidMount: OnMount = (editor, monaco) => {
  editorStore.setState({ monacoInstance: monaco });
  monaco.editor.defineTheme("custom", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#0c0e13",
      "editor.lineHighlightBackground": "#191e29",
      "editor.lineHighlightBorder": "#191e29",
    },
  });
  monaco.editor.setTheme("custom");

  editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyL, () =>
    generateAndInsertCode(editor, monaco),
  );

  editor.onDidChangeModelContent(() => {
    debounce(() => {
      snippetStore.setState({
        code: editor.getValue(),
      });
    }, 300)();
  });

  editor.onDidChangeCursorPosition((e) => {
    snippetStore.setState({
      line: e.position.lineNumber,
      column: e.position.column,
    });
  });
};
