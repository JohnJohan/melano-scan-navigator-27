
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { formatDate, formatPercentage, cn } from '@/lib/utils';
import { ScanResult } from '@/types/melanoma';
import { ChevronRight } from 'lucide-react';

interface RecentScansCardProps {
  scans: ScanResult[];
  className?: string;
}

const RecentScansCard: React.FC<RecentScansCardProps> = ({ scans, className }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className={cn('bg-card rounded-xl border border-border overflow-hidden', className)}>
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Recent Scans</h3>
          <Link to="/scan-history" className="text-sm text-primary hover:underline">
            View all
          </Link>
        </div>
      </div>
      
      <motion.div
        className="divide-y divide-border"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {scans.map((scan) => (
          <motion.div
            key={scan.id}
            className="flex items-center p-4 hover:bg-muted/30 transition-colors"
            variants={item}
          >
            <div className="relative h-16 w-16 rounded-md overflow-hidden mr-4">
              <img 
                src={scan.imageSrc} 
                alt={`Scan ${scan.id}`} 
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center">
                <span className={cn(
                  "px-2 py-0.5 text-xs rounded-full mr-2",
                  scan.classification === "Malignant" 
                    ? "bg-red-100 text-red-800" 
                    : "bg-green-100 text-green-800"
                )}>
                  {scan.classification}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatDate(scan.timestamp)}
                </span>
              </div>
              
              <div className="mt-1">
                <p className="text-sm font-medium truncate">
                  {scan.metadata.patientId ? `Patient: ${scan.metadata.patientId}` : "Unknown Patient"}
                </p>
                <div className="flex text-xs text-muted-foreground mt-1">
                  <span className="mr-3">Confidence: {formatPercentage(scan.confidence)}</span>
                  {scan.metadata.location && (
                    <span>{scan.metadata.location}</span>
                  )}
                </div>
              </div>
            </div>
            
            <ChevronRight size={16} className="text-muted-foreground" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default RecentScansCard;
