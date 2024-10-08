import { Button } from "@/components/ui/button";
import { type OnOff, createEditorStore } from "@/stores/editor-store";
import { Settings } from "lucide-react";
import { useShallow } from "zustand/shallow";
import Radio from "../radio";
import NewTooltip from "../tooltip";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export default function EditorSettings() {
  const { minimap, tabSize, fontSize, wordWrap, lineNumbers } =
    createEditorStore(
      useShallow((state) => ({
        minimap: state.minimap,
        tabSize: state.tabSize,
        fontSize: state.fontSize,
        wordWrap: state.wordWrap,
        lineNumbers: state.lineNumbers,
      })),
    );

  return (
    <Popover>
      <PopoverTrigger>
        <NewTooltip content="Editor settings">
          <Button
            type="button"
            variant="ghost"
            className="size-auto py-1 px-2 h-auto rounded-md flex items-center text-sm ml-auto"
          >
            <Settings size={22} strokeWidth={1} />
          </Button>
        </NewTooltip>
      </PopoverTrigger>
      <PopoverContent className="p-8">
        <label className="text-muted-foreground" htmlFor="minimap">
          Minimap
        </label>
        <Radio
          className="flex items-center gap-3"
          defaultValue={minimap ? "on" : "off"}
          items={[
            ["On", "m_on", "on"],
            ["Off", "m_off", "off"],
          ]}
          onChange={(v) => createEditorStore.setState({ minimap: v === "on" })}
        />
        <hr className="my-3" />

        <label className="text-muted-foreground" htmlFor="tabSize">
          Tab Size
        </label>
        <Input
          name="tabSize"
          type="number"
          min={1}
          max={10}
          onChange={(e) =>
            createEditorStore.setState({ tabSize: +e.target.value })
          }
          defaultValue={tabSize}
        />
        <hr className="my-3" />

        <label className="text-muted-foreground" htmlFor="wordWrap">
          Word Wrap
        </label>
        <Radio
          className="flex items-center gap-3"
          defaultValue={wordWrap}
          items={[
            ["On", "w_on", "on"],
            ["Off", "w_off", "off"],
          ]}
          onChange={(e) => createEditorStore.setState({ wordWrap: e as OnOff })}
        />
        <hr className="my-3" />

        <label className="text-muted-foreground" htmlFor="fontSize">
          Font Size
        </label>
        <Input
          id="fontSize"
          type="number"
          min={8}
          onChange={(e) =>
            createEditorStore.setState({ fontSize: +e.target.value })
          }
          defaultValue={fontSize}
        />
        <hr className="my-3" />

        <label className="text-muted-foreground" htmlFor="lineNumbers">
          Line Numbers
        </label>
        <Radio
          className="flex items-center gap-3"
          defaultValue={lineNumbers}
          items={[
            ["On", "l_on", "on"],
            ["Off", "l_off", "off"],
          ]}
          onChange={(e) =>
            createEditorStore.setState({ lineNumbers: e as OnOff })
          }
        />
      </PopoverContent>
    </Popover>
  );
}
