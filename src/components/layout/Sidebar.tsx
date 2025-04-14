
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  FileText, 
  Receipt, 
  BarChart3, 
  Settings, 
  Home,
  MessageSquare,
  Volume2
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className = "" }: SidebarProps) {
  return (
    <div className={`w-64 border-r border-border bg-sidebar flex flex-col h-screen ${className}`}>
      <div className="p-4 border-b border-border flex items-center justify-center">
        <h1 className="text-xl font-bold text-smartventory-purple">Smartventory</h1>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <NavItem to="/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" />
          <NavItem to="/inventory" icon={<Package size={20} />} label="Inventory" />
          <NavItem to="/billing" icon={<FileText size={20} />} label="Billing" />
          <NavItem to="/bill-history" icon={<Receipt size={20} />} label="Bill History" />
          <NavItem to="/reports" icon={<BarChart3 size={20} />} label="Reports" />
          <NavItem to="/whatsapp" icon={<MessageSquare size={20} />} label="WhatsApp Bot" />
          <NavItem to="/settings" icon={<Settings size={20} />} label="Settings" />
        </ul>
      </nav>
      <div className="p-4 border-t border-border">
        <button className="flex items-center justify-center w-full gap-2 py-2 px-4 bg-smartventory-purple text-white rounded-lg hover:bg-smartventory-dark-purple transition-colors">
          <Volume2 size={18} />
          <span>Voice Assistant</span>
        </button>
      </div>
    </div>
  );
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

function NavItem({ to, icon, label }: NavItemProps) {
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
      >
        {icon}
        <span>{label}</span>
      </NavLink>
    </li>
  );
}
