import { ThemeProvider } from "@/components/theme-provider";
import CodeEditor from "./components/code-editor";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="relative flex flex-col h-screen overflow-hidden bg-red-500">
        <div className="flex-grow overflow-auto">
          <CodeEditor />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
