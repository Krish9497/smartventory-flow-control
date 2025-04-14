
import { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { MobileHeader } from "./MobileHeader";
import MobileNav from "./MobileNav";
import { useLocation } from "react-router-dom";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [theme, setTheme] = useState<"light" | "dark" | "classic" | "modern">(
    () => (localStorage.getItem("theme") as any) || "light"
  );
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Update theme in localStorage
    localStorage.setItem("theme", theme);
    
    // Apply dark class based on theme
    if (theme === "dark" || theme === "modern") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Close mobile nav when route changes
  useEffect(() => {
    setMobileNavOpen(false);
  }, [location]);

  const toggleMobileNav = () => {
    setMobileNavOpen(prev => !prev);
  };

  // Only show sidebar & mobile nav on authenticated pages
  const isAuthPage = location.pathname === "/" || location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className={`min-h-screen flex flex-col bg-background transition-colors duration-300`}>
      {!isAuthPage && (
        <>
          <MobileHeader toggleNav={toggleMobileNav} />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar className="hidden md:block" />
            <main className="flex-1 overflow-auto pb-16 md:pb-0">
              {children}
            </main>
          </div>
          <MobileNav 
            isOpen={mobileNavOpen} 
            toggleNav={toggleMobileNav} 
            setTheme={setTheme}
            currentTheme={theme}
          />
        </>
      )}
      
      {isAuthPage && (
        <main className="flex-1">
          {children}
        </main>
      )}
    </div>
  );
}
