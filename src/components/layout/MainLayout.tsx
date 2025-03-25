
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col w-full">
        <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        
        <motion.main 
          className={cn(
            "flex-1 p-6 transition-all duration-300 ease-in-out overflow-auto",
            { "md:ml-64": sidebarOpen, "ml-0": !sidebarOpen }
          )}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </motion.main>
      </div>
    </div>
  );
};

export default MainLayout;
