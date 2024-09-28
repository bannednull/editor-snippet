import type { LanguageName } from "@uiw/codemirror-extensions-langs";
import { create } from "zustand";

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
  setIsSelected: (isSelected: boolean) => void;
}

export const createSnippetStore = create<SnippetState>()((set) => ({
  lang: "javascript",
  code: "",
  line: 0,
  column: 0,
  selection: { startLine: 0, endLine: 0, selected: "", isSelected: false },
  setIsSelected: (isSelected) =>
    set((state) => ({ selection: { ...state.selection, isSelected } })),
}));
