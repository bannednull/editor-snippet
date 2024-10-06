import type { Snippet } from "@/api/snippet";
import { create } from "zustand";

export interface SelectEditor {
  isSelected: boolean;
  startLine: number;
  endLine: number;
  selected: string;
}

interface SnippetState {
  lang: "javascript" | "typescript";
  code: string;
  title: string;
  line: number;
  column: number;
  selection: SelectEditor;
  setIsSelected: (isSelected: boolean) => void;
  setSnippet: (snippet: Snippet) => void;
}

export const createSnippetStore = create<SnippetState>()((set) => ({
  lang: "javascript",
  code: "",
  title: "",
  line: 0,
  column: 0,
  selection: { startLine: 0, endLine: 0, selected: "", isSelected: false },
  setIsSelected: (isSelected) =>
    set((state) => ({ selection: { ...state.selection, isSelected } })),
  setSnippet: (snippet) =>
    set(() => ({
      lang: snippet.lang as "javascript" | "typescript",
      code: snippet.code,
      title: snippet.title,
      line: 1,
      column: 1,
    })),
}));