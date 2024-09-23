import { useTheme } from "@/components/theme-provider";
import { githubDarkInit, githubLightInit } from "@uiw/codemirror-theme-github";
import type { CreateThemeOptions } from "@uiw/codemirror-themes";
import type { BasicSetupOptions, Extension } from "@uiw/react-codemirror";

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

  return theme === "dark"
    ? githubDarkInit(settings)
    : githubLightInit(settings);
};

const useEditor = () => {
  const { theme } = useTheme();

  return {
    basicSetup,
    theme: () => themeExtension(theme),
  };
};

export default useEditor;
