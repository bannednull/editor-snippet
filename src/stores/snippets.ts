import type { LanguageName } from "@uiw/codemirror-extensions-langs";
import { create } from "zustand";

interface SnippetState {
  lang: LanguageName;
  setLang: (lang: LanguageName) => void;
}

export const useSnippetStore = create<SnippetState>()((set) => ({
  lang: "javascript",
  setLang: (lang) => set({ lang }),
}));
