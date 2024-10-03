import { ThemeProvider } from "@/components/theme-provider";
import { Outlet } from "react-router-dom";
import Aside from "./components/aside";
import SessionProvider from "./components/session-provider";
import { Toaster } from "./components/ui/toaster";

function Layout() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SessionProvider>
        <div className="grid h-screen md:grid-cols-[300px,1fr]">
          <Aside />

          <div className="relative flex flex-col h-screen overflow-hidden">
            <Outlet />
          </div>
        </div>

        <Toaster />
      </SessionProvider>
    </ThemeProvider>
  );
}

export default Layout;
