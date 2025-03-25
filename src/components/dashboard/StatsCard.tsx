
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  description,
  icon,
  trend,
  trendValue,
  className,
}) => {
  const trendColor = 
    trend === "up" ? "text-green-500" : 
    trend === "down" ? "text-red-500" : 
    "text-muted-foreground";

  return (
    <motion.div
      className={cn(
        "p-6 rounded-xl border border-border bg-card shadow-sm",
        className
      )}
      whileHover={{ y: -2, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className="text-2xl font-bold">{value}</div>
          
          {trend && trendValue && (
            <div className={cn("flex items-center gap-1 text-sm", trendColor)}>
              {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"}
              <span>{trendValue}</span>
            </div>
          )}
        </div>
        
        {icon && (
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>
      
      {description && (
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      )}
    </motion.div>
  );
};

export default StatsCard;
