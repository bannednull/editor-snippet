import type { Monaco } from "@monaco-editor/react";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type OnOff = "on" | "off";

interface EditorState {
  minimap: boolean;
  tabSize: number;
  fontSize: number;
  wordWrap: OnOff;
  lineNumbers: OnOff;
  monacoInstance: Monaco | null;
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
        monacoInstance: null,
      }),
      {
        partialize: (state) => ({
          minimap: state.minimap,
          tabSize: state.tabSize,
          fontSize: state.fontSize,
          wordWrap: state.wordWrap,
          lineNumbers: state.lineNumbers,
        }),
        name: "editor_bakan",
      },
    ),
  ),
);
