
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  Database, 
  Image, 
  BarChart2, 
  Settings, 
  HelpCircle,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const sidebarItems = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: Database, label: "Datasets", path: "/datasets" },
  { icon: Image, label: "Scan Image", path: "/scan" },
  { icon: BarChart2, label: "Analytics", path: "/analytics" },
  { icon: Settings, label: "Settings", path: "/settings" },
  { icon: HelpCircle, label: "Help", path: "/help" },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  
  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-20 md:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>
      
      {/* Sidebar */}
      <motion.aside
        className={cn(
          "fixed md:sticky top-0 left-0 z-30 h-screen bg-card border-r border-border",
          "flex flex-col transition-all duration-300 ease-in-out",
          "w-64 transform md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        initial={false}
      >
        <div className="p-4 h-16 flex items-center justify-between border-b border-border">
          <h2 className="font-semibold text-lg">Navigation</h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="hidden md:flex"
          >
            {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </Button>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
            {sidebarItems.map((item) => {
              const isActive = location.pathname === item.path;
              
              return (
                <li key={item.path}>
                  <Link to={item.path}>
                    <motion.div
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md",
                        "transition-colors duration-200",
                        isActive 
                          ? "bg-accent text-accent-foreground font-medium" 
                          : "text-foreground/70 hover:text-foreground hover:bg-secondary"
                      )}
                      whileHover={{ x: 2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <item.icon size={18} />
                      <span>{item.label}</span>
                      
                      {isActive && (
                        <motion.div
                          className="h-full w-1 bg-primary absolute right-0"
                          layoutId="activeIndicator"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </motion.div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-medium">U</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">User</p>
              <p className="text-xs text-muted-foreground truncate">Researcher</p>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
