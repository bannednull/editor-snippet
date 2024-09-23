import type { LanguageName } from "@uiw/codemirror-extensions-langs";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SnippetState {
  lang: LanguageName;
  code: string;
  setLang: (lang: LanguageName) => void;
  setCode: (code: string) => void;
}

export const useSnippetStore = create<SnippetState>()(
  persist(
    (set) => ({
      lang: "javascript",
      code: "",
      setLang: (lang) => set({ lang }),
      setCode: (code) => set({ code }),
    }),
    { name: "snippet" },
  ),
);
