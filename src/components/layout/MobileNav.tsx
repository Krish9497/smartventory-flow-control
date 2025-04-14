
import { X, Home, LayoutDashboard, Package, FileText, Receipt, BarChart3, MessageSquare, Settings, Moon, Sun, Palette } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface MobileNavProps {
  isOpen: boolean;
  toggleNav: () => void;
  setTheme: (theme: "light" | "dark" | "classic" | "modern") => void;
  currentTheme: string;
}

export default function MobileNav({ isOpen, toggleNav, setTheme, currentTheme }: MobileNavProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 top-0 z-50 bg-background/95 backdrop-blur-sm md:hidden animate-fade-in">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-smartventory-purple">Menu</h2>
          <Button variant="ghost" size="icon" onClick={toggleNav}>
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        <nav className="flex-1 overflow-auto p-4">
          <ul className="space-y-3">
            <MobileNavItem to="/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" onClick={toggleNav} />
            <MobileNavItem to="/inventory" icon={<Package size={20} />} label="Inventory" onClick={toggleNav} />
            <MobileNavItem to="/billing" icon={<FileText size={20} />} label="Billing" onClick={toggleNav} />
            <MobileNavItem to="/bill-history" icon={<Receipt size={20} />} label="Bill History" onClick={toggleNav} />
            <MobileNavItem to="/reports" icon={<BarChart3 size={20} />} label="Reports" onClick={toggleNav} />
            <MobileNavItem to="/whatsapp" icon={<MessageSquare size={20} />} label="WhatsApp Bot" onClick={toggleNav} />
            <MobileNavItem to="/settings" icon={<Settings size={20} />} label="Settings" onClick={toggleNav} />
          </ul>
        </nav>
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Theme</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  {currentTheme === "light" && <Sun size={16} />}
                  {currentTheme === "dark" && <Moon size={16} />}
                  {(currentTheme === "classic" || currentTheme === "modern") && <Palette size={16} />}
                  <span className="capitalize">{currentTheme}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Sun className="mr-2 h-4 w-4" />
                  <span>Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon className="mr-2 h-4 w-4" />
                  <span>Dark</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("classic")}>
                  <Palette className="mr-2 h-4 w-4" />
                  <span>Classic</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("modern")}>
                  <Palette className="mr-2 h-4 w-4" />
                  <span>Modern</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}

interface MobileNavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

function MobileNavItem({ to, icon, label, onClick }: MobileNavItemProps) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            isActive
              ? "bg-smartventory-purple text-white"
              : "text-foreground hover:bg-accent"
          }`
        }
        onClick={onClick}
      >
        {icon}
        <span>{label}</span>
      </NavLink>
    </li>
  );
}
