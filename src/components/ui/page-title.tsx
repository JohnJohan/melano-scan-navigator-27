
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PageTitleProps {
  title: string;
  description?: string;
  className?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ 
  title, 
  description, 
  className 
}) => {
  return (
    <motion.div
      className={cn("mb-8", className)}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-1">
        <motion.span
          className="inline-block px-2.5 py-1 rounded-full bg-primary/10 text-primary-foreground text-xs font-medium"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.2 }}
        >
          MelanoScan Navigator
        </motion.span>
        <motion.h1 
          className="text-3xl font-bold tracking-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          {title}
        </motion.h1>
      </div>
      
      {description && (
        <motion.p 
          className="mt-2 text-muted-foreground max-w-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
};

export default PageTitle;
