
import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, InfoIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ModelMetrics } from '@/types/melanoma';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ModelCardProps {
  metrics: ModelMetrics;
  className?: string;
}

const MetricItem: React.FC<{
  label: string;
  value: number;
  info?: string;
}> = ({ label, value, info }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        <span className="text-sm">{label}</span>
        {info && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon size={14} className="text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-xs">{info}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <span className="font-medium">{(value * 100).toFixed(1)}%</span>
    </div>
  );
};

const ModelCard: React.FC<ModelCardProps> = ({ metrics, className }) => {
  return (
    <motion.div
      className={cn("bg-card p-6 rounded-xl border border-border", className)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium">Model Performance</h3>
          <p className="text-sm text-muted-foreground mt-1">Current classification metrics</p>
        </div>
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Cpu size={18} className="text-primary" />
        </div>
      </div>
      
      <div className="space-y-3">
        <MetricItem 
          label="Accuracy" 
          value={metrics.accuracy}
          info="Proportion of correct predictions among the total number of cases"
        />
        <MetricItem 
          label="Precision" 
          value={metrics.precision}
          info="Proportion of positive identifications that were actually correct"
        />
        <MetricItem 
          label="Recall" 
          value={metrics.recall}
          info="Proportion of actual positives that were correctly identified"
        />
        <MetricItem 
          label="F1 Score" 
          value={metrics.f1Score}
          info="Harmonic mean of precision and recall"
        />
        <MetricItem 
          label="AUC" 
          value={metrics.auc}
          info="Area Under the ROC Curve, measures the model's ability to discriminate between classes"
        />
      </div>
      
      <div className="mt-4 text-xs text-muted-foreground">
        Last updated: August 15, 2023
      </div>
    </motion.div>
  );
};

export default ModelCard;
