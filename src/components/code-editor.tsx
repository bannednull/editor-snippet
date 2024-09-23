import useEditor from "@/hooks/useEditor";
import CodeMirror from "@uiw/react-codemirror";
import React from "react";

export default function CodeEditor() {
  const [code, setCode] = React.useState<string>("");

  const onChange = React.useCallback((value: string) => {
    setCode(value);
  }, []);

  const { basicSetup, theme } = useEditor();

  return (
    <CodeMirror
      basicSetup={basicSetup}
      theme={theme()}
      value={code}
      onChange={onChange}
    />
  );
}
