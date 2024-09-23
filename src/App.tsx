import { ThemeProvider } from "@/components/theme-provider";
import Aside from "./components/aside";
import CodeEditor from "./components/code-editor";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="grid h-screen md:grid-cols-[1fr,330px]">
        <div className="relative flex flex-col h-screen overflow-hidden">
          <div className="flex-grow overflow-auto">
            <CodeEditor />
          </div>
        </div>

        <Aside />
      </div>
    </ThemeProvider>
  );
}

export default App;
