import { ThemeProvider } from "@/components/theme-provider";
import Aside from "./components/aside";
import CodeEditor from "./components/code-editor";
import ComboLang from "./components/combo-lang";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="grid h-screen md:grid-cols-[1fr,330px]">
        <div className="relative flex flex-col h-screen overflow-hidden">
          <div className="flex-grow overflow-auto">
            <CodeEditor />
          </div>
          <div className="bg-black/70 text-muted-foreground border-t flex items-center text-xs">
            <div className="ml-auto">
              <ComboLang />
            </div>
          </div>
        </div>

        <Aside />
      </div>
    </ThemeProvider>
  );
}

export default App;
