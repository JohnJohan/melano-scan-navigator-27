
import React from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, sidebarOpen }) => {
  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border h-16 flex items-center px-6">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="md:hidden"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center"
          >
            <motion.div
              className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center mr-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-white font-bold text-lg">M</span>
            </motion.div>
            <h1 className="text-xl font-semibold">MelanoScan</h1>
          </motion.div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex"
          >
            Documentation
          </Button>
          <Button
            variant="default"
            size="sm"
          >
            New Scan
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
