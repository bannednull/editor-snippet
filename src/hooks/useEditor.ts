import { useTheme } from "@/components/theme-provider";
import {
  basicSetup,
  capitalizeLangName,
  languageSupported,
  themeExtension,
} from "@/lib/editor";

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
