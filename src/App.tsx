import { ThemeProvider } from "@/components/theme-provider";
import Aside from "./components/aside";
import Capture from "./components/capture";
import CodeEditor from "./components/code-editor";
import CodeSuggestion from "./components/code-suggestion";
import ComboLang from "./components/combo-lang";
import LineColumn from "./components/line-column";
import SaveSnippet from "./components/save-snippet";
import SessionProvider from "./components/session-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SessionProvider>
        <div className="grid h-screen md:grid-cols-[300px,1fr]">
          <Aside />
          <CodeSuggestion />

          <div className="relative flex flex-col h-screen overflow-hidden">
            <div className="flex-grow overflow-auto">
              <CodeEditor />
            </div>

            <div className="bg-black/40 py-1 text-muted-foreground border-t flex items-center text-xs px-2">
              <Capture />
              <SaveSnippet />

              <div className="ml-auto flex gap-3 items-center">
                <LineColumn />
                <ComboLang />
              </div>
            </div>
          </div>
        </div>
      </SessionProvider>
    </ThemeProvider>
  );
}

export default App;
