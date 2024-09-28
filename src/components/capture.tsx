import useEditor from "@/hooks/useEditor";
import { cn } from "@/lib/utils";
import { createSnippetStore } from "@/stores/snippets";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import CodeMirror, { EditorView } from "@uiw/react-codemirror";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetOverlay,
  SheetTitle,
} from "./ui/sheet";

const bgColors = [
  "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
  "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)",
  "linear-gradient(to right, #22c1c3, #fdbb2d)",
  "linear-gradient(90deg, rgba(0,0,255,1) 0%, rgba(255,0,255,1) 50%, rgba(255,255,0,1) 100%)",
  "linear-gradient(to right, #c9d6ff, #e2e2e2)",
];

const px = [16, 32, 64];

export default function Capture() {
  const [selectedBg, setSelectedBg] = React.useState(0);
  const [selectedPadding, setSelectedPadding] = React.useState(1);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "c" && e.altKey) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const { code, lang } = createSnippetStore((state) => state);
  const { theme } = useEditor();

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetOverlay />
        <SheetContent side="right" className="md:min-w-[580px] overflow-auto">
          <SheetHeader>
            <SheetTitle className="text-lg font-semibold">Preview</SheetTitle>
            <SheetDescription className="mb-4">
              Capture the current code.
            </SheetDescription>
          </SheetHeader>

          <div
            className="rounded-xl mt-4"
            style={{
              background: bgColors[selectedBg],
              padding: `${px[selectedPadding]}px`,
            }}
          >
            <CodeMirror
              editable={false}
              value={code}
              extensions={[
                loadLanguage(lang)!,
                EditorView.lineWrapping,
                EditorView.theme({
                  ".cm-content": {
                    padding: "10px !important",
                  },
                }),
              ]}
              theme={theme()}
              basicSetup={{
                lineNumbers: false,
                foldGutter: false,
                highlightActiveLine: false,
              }}
            />
          </div>

          <div className="bg-muted py-2 px-4 sticky bottom-0 mt-2 flex flex-col sm:flex-row items-start justify-between gap-4">
            <div className="w-full sm:w-auto">
              <span className="text-[.6em] text-muted-foreground block mb-1">
                Background
              </span>
              <div className="flex items-center gap-2">
                {bgColors.map((c, index) => (
                  <button
                    key={index}
                    type="button"
                    style={{ background: c }}
                    className={cn("h-5 w-5 rounded-full", {
                      "ring-1 ring-offset-1 ring-primary": selectedBg === index,
                    })}
                    aria-label={`Select background ${index + 1}`}
                    onClick={() => setSelectedBg(index)}
                  />
                ))}
              </div>
            </div>

            <div className="w-full sm:w-auto">
              <span className="text-[.6em] text-muted-foreground block mb-1">
                Padding
              </span>
              <div className="flex items-center gap-2">
                {px.map((p, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`text-xs h-5 px-2 ${selectedPadding === i ? "bg-primary text-primary-foreground" : "bg-secondary"}`}
                    onClick={() => setSelectedPadding(i)}
                  >
                    {p}px
                  </button>
                ))}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <p className="text-sm flex items-center gap-1 px-2">
        Capture
        <kbd className="pointer-events-none inline-flex select-none items-center gap-1 rounded border bg-muted px-1.5 text-[10px] font-medium text-muted-foreground">
          <span>alt</span> + c
        </kbd>
      </p>
    </>
  );
}
