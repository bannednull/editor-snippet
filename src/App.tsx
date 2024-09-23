import { ThemeProvider } from "@/components/theme-provider";
import CodeEditor from "./components/code-editor";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <CodeEditor />
    </ThemeProvider>
  );
}

export default App;
