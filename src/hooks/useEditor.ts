import { useTheme } from "@/components/theme-provider";
import { type LanguageName, langNames } from "@uiw/codemirror-extensions-langs";
import { vscodeDarkInit, vscodeLightInit } from "@uiw/codemirror-theme-vscode";
import type { CreateThemeOptions } from "@uiw/codemirror-themes";
import {
  type BasicSetupOptions,
  EditorView,
  type Extension,
} from "@uiw/react-codemirror";

const basicSetup: BasicSetupOptions = {
  searchKeymap: false,
  highlightActiveLineGutter: false,
};

const themeExtension = (theme: string | undefined): Extension => {
  const settings: Partial<CreateThemeOptions> = {
    settings: {
      fontSize: ".9em",
      background: "hsl(var(--background))",
      gutterBackground: "hsl(var(--background))",
      selection: "transparent",
      selectionMatch: "rgba(95, 154, 243, 0.4)",
    },
  };

  return [
    theme === "dark" ? vscodeDarkInit(settings) : vscodeLightInit(settings),
    EditorView.theme({
      "&": {
        height: "100%",
      },
    }),
  ];
};

const supportedLanguages = [
  "c",
  "csharp",
  "kotlin",
  "typescript",
  "html",
  "css",
  "python",
  "markdown",
  "sql",
  "rust",
  "java",
  "cpp",
  "go",
  "ruby",
  "php",
  "javascript",
  "dart",
];

const languageSupported = langNames
  .filter((lang) => supportedLanguages.includes(lang))
  .sort();

const capitalizeLangName = (lang: LanguageName): string => {
  const name = lang.charAt(0).toUpperCase() + lang.slice(1);
  const specialCases: { [key: string]: string } = {
    cpp: "C++",
    csharp: "C#",
    html: "HTML",
    javascript: "JavaScript",
    typescript: "TypeScript",
    css: "CSS",
    sql: "SQL",
    php: "PHP",
  };

  return specialCases[lang] || name;
};

const useEditor = () => {
  const { theme } = useTheme();

  return {
    basicSetup,
    theme: () => themeExtension(theme),
    languageSupported,
    capitalizeLangName,
  };
};

export default useEditor;
