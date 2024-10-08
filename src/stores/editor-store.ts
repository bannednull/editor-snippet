import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type OnOff = "on" | "off";

interface EditorState {
  minimap: boolean;
  tabSize: number;
  wordWrap: OnOff;
  lineNumbers: OnOff;
}

export const createEditorStore = create<EditorState>()(
  devtools(
    persist(
      (_) => ({
        minimap: false,
        tabSize: 2,
        wordWrap: "on",
        lineNumbers: "on",
      }),
      {
        name: "editor_bakan",
      },
    ),
  ),
);
