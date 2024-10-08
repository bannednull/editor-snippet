import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type OnOff = "on" | "off";

interface EditorState {
  minimap: boolean;
  tabSize: number;
  fontSize: number;
  wordWrap: OnOff;
  lineNumbers: OnOff;
}

export const editorStore = create<EditorState>()(
  devtools(
    persist(
      (_) => ({
        minimap: false,
        tabSize: 2,
        fontSize: 16,
        wordWrap: "on",
        lineNumbers: "on",
      }),
      {
        name: "editor_bakan",
      },
    ),
  ),
);
