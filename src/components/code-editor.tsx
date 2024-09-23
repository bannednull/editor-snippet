import useEditor from "@/hooks/useEditor";
import { useSnippetStore } from "@/stores/snippets";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import CodeMirror from "@uiw/react-codemirror";
import React from "react";

export default function CodeEditor() {
  const [code, setCode] = React.useState<string>("");

  const onChange = React.useCallback((value: string) => {
    setCode(value);
  }, []);

  const { basicSetup, theme } = useEditor();

  const { lang } = useSnippetStore((state) => state);

  return (
    <CodeMirror
      className="h-full"
      basicSetup={basicSetup}
      extensions={[loadLanguage(lang)!]}
      theme={theme()}
      value={code}
      onChange={onChange}
    />
  );
}
