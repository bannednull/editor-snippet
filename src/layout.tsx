import { ThemeProvider } from "@/components/theme-provider";
import { Outlet } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";

function Layout() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="h-screen">
        <div className="relative flex flex-col h-screen overflow-hidden">
          <Outlet />
        </div>
      </div>
      <Toaster duration={1500} />
    </ThemeProvider>
  );
}

export default Layout;
