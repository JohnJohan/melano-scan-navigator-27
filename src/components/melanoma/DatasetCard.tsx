
import React from 'react';
import { motion } from 'framer-motion';
import { Database, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Dataset } from '@/types/melanoma';
import { Progress } from '@/components/ui/progress';
import FileFormatIcon from './FileFormatIcon';

interface DatasetCardProps {
  dataset: Dataset;
  className?: string;
}

const DatasetCard: React.FC<DatasetCardProps> = ({ dataset, className }) => {
  const benignPercentage = (dataset.benignCount / dataset.imageCount) * 100;
  const malignantPercentage = (dataset.malignantCount / dataset.imageCount) * 100;

  return (
    <motion.div
      className={cn(
        "bg-card p-6 rounded-xl border border-border overflow-hidden",
        className
      )}
      whileHover={{ y: -2, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium">{dataset.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{dataset.description}</p>
        </div>
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Database size={18} className="text-primary" />
        </div>
      </div>
      
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Distribution</span>
            <span>{dataset.imageCount} images</span>
          </div>
          <div className="flex h-2 overflow-hidden rounded-full bg-secondary">
            <div className="bg-green-500" style={{ width: `${benignPercentage}%` }} />
            <div className="bg-red-500" style={{ width: `${malignantPercentage}%` }} />
          </div>
          <div className="flex justify-between text-xs mt-1 text-muted-foreground">
            <span>Benign: {dataset.benignCount} ({benignPercentage.toFixed(1)}%)</span>
            <span>Malignant: {dataset.malignantCount} ({malignantPercentage.toFixed(1)}%)</span>
          </div>
        </div>
        
        <div className="pt-3 flex flex-wrap text-sm text-muted-foreground">
          <span className="mr-4">Source: {dataset.source}</span>
          <span className="mr-4">Updated: {dataset.lastUpdated}</span>
          {dataset.fileFormat && (
            <span className="mr-4 flex items-center">
              <FileFormatIcon 
                filename={dataset.fileFormat} 
                size={14} 
                className="mr-1" 
              />
              Format: {dataset.fileFormat.toUpperCase()}
            </span>
          )}
          {dataset.fileSize && (
            <span>Size: {(dataset.fileSize / 1024 / 1024).toFixed(2)} MB</span>
          )}
        </div>
      </div>
      
      <Link to={`/datasets/${dataset.id}`}>
        <motion.div 
          className="mt-4 flex items-center justify-center py-2 border border-primary/30 rounded-lg text-primary text-sm font-medium"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          View Dataset
          <ChevronRight size={16} className="ml-1" />
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default DatasetCard;
