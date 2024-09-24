import { ThemeProvider } from "@/components/theme-provider";
import Aside from "./components/aside";
import Capture from "./components/capture";
import CodeEditor from "./components/code-editor";
import ComboLang from "./components/combo-lang";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="grid h-screen md:grid-cols-[330px,1fr]">
        <Aside />

        <div className="relative flex flex-col h-screen overflow-hidden">
          <div className="flex-grow overflow-auto">
            <CodeEditor />
          </div>
          <div className="bg-black/70 text-muted-foreground border-t flex items-center text-xs">
            <Capture />
            <div className="ml-auto">
              <ComboLang />
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
