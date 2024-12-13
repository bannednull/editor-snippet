import type { Languages } from "@/lib/editor";
import { create } from "zustand";

export interface SelectEditor {
  isSelected: boolean;
  startLine: number;
  endLine: number;
  selected: string;
}

interface SnippetState {
  lang: Languages;
  code: string;
  title: string;
  line: number;
  column: number;
  selection: SelectEditor;
  setIsSelected: (isSelected: boolean) => void;
}

export const snippetStore = create<SnippetState>()((set) => ({
  lang: "javascript",
  code: "",
  title: "",
  line: 0,
  column: 0,
  selection: { startLine: 0, endLine: 0, selected: "", isSelected: false },
  setIsSelected: (isSelected) =>
    set((state) => ({ selection: { ...state.selection, isSelected } })),
}));
