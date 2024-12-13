import CodeEditor from "./components/editor/code-editor";
import ComboLang from "./components/editor/combo-lang";
import CopyClip from "./components/editor/copy";
import EditorSettings from "./components/editor/editor-settings";
import LineColumn from "./components/editor/line-column";

export default function App() {
  return (
    <>
      <div className="flex-grow overflow-auto">
        <CodeEditor value="" />
      </div>

      <div className="text-muted-foreground border-t flex items-center gap-2 text-xs px-6">
        <LineColumn />
        <ComboLang />
        <CopyClip />
        <EditorSettings />
      </div>
    </>
  );
}
