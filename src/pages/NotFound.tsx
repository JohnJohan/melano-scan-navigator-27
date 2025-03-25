
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/30">
      <motion.div 
        className="max-w-md w-full p-8 rounded-xl bg-card border border-border shadow-lg text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="mb-6 text-6xl text-primary font-bold"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
        >
          404
        </motion.div>
        
        <h1 className="text-2xl font-bold mb-3">Page Not Found</h1>
        
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Button asChild>
          <Link to="/" className="flex items-center justify-center">
            <Home size={18} className="mr-2" />
            Back to Dashboard
          </Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFound;
