import type { LanguageName } from "@uiw/codemirror-extensions-langs";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SnippetState {
  lang: LanguageName;
  code: string;
  line: number;
  column: number;
  setLang: (lang: LanguageName) => void;
  setCode: (code: string) => void;
  setLine: (line: number) => void;
  setColumn: (column: number) => void;
}

export const createSnippetStore = create<SnippetState>()(
  persist(
    (set) => ({
      lang: "javascript",
      code: "",
      line: 0,
      column: 0,
      setLang: (lang) => set({ lang }),
      setCode: (code) => set({ code }),
      setLine: (line) => set({ line }),
      setColumn: (column) => set({ column }),
    }),
    {
      name: "snippet",
      partialize: (state) => ({ lang: state.lang, code: state.code }),
    },
  ),
);
