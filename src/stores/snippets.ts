import type { LanguageName } from "@uiw/codemirror-extensions-langs";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface SelectEditor {
  isSelected: boolean;
  startLine: number;
  endLine: number;
  selected: string;
}

interface SnippetState {
  lang: LanguageName;
  code: string;
  line: number;
  column: number;
  selection: SelectEditor;
  setLang: (lang: LanguageName) => void;
  setCode: (code: string) => void;
  setLine: (line: number) => void;
  setColumn: (column: number) => void;
  setSelection: (selection: SelectEditor) => void;
  setIsSelected: (isSelected: boolean) => void;
}

export const createSnippetStore = create<SnippetState>()(
  persist(
    (set) => ({
      lang: "javascript",
      code: "",
      line: 0,
      column: 0,
      selection: { startLine: 0, endLine: 0, selected: "", isSelected: false },
      setLang: (lang) => set({ lang }),
      setCode: (code) => set({ code }),
      setLine: (line) => set({ line }),
      setColumn: (column) => set({ column }),
      setSelection: (selection) => set({ selection }),
      setIsSelected: (isSelected) =>
        set((state) => ({ selection: { ...state.selection, isSelected } })),
    }),
    {
      name: "snippet",
      partialize: (state) => ({ lang: state.lang, code: state.code }),
    },
  ),
);
