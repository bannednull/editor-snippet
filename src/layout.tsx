import { ThemeProvider } from "@/components/theme-provider";
import { Outlet } from "react-router-dom";
import Aside from "./components/aside";
import CodeSuggestion from "./components/code-suggestion";
import ComboLang from "./components/combo-lang";
import LineColumn from "./components/line-column";
import SaveSnippet from "./components/save-snippet";
import SessionProvider from "./components/session-provider";
import { Toaster } from "./components/ui/toaster";

function Layout() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SessionProvider>
        <div className="grid h-screen md:grid-cols-[300px,1fr]">
          <Aside />
          <CodeSuggestion />

          <div className="relative flex flex-col h-screen overflow-hidden">
            <SaveSnippet />

            <Outlet />

            <div className="bg-black/40 text-muted-foreground border-t flex items-center gap-2 text-xs px-2">
              <LineColumn />
              <ComboLang />
            </div>
          </div>
        </div>

        <Toaster />
      </SessionProvider>
    </ThemeProvider>
  );
}

export default Layout;
