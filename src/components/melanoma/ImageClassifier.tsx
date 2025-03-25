
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Check, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn, formatPercentage } from '@/lib/utils';
import { toast } from 'sonner';

interface ImageClassifierProps {
  onClassify?: (result: {
    classification: "Benign" | "Malignant";
    confidence: number;
    imageUrl: string;
  }) => void;
  className?: string;
}

const ImageClassifier: React.FC<ImageClassifierProps> = ({ 
  onClassify,
  className 
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{
    classification: "Benign" | "Malignant";
    confidence: number;
  } | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageSelect(e.dataTransfer.files[0]);
    }
  };
  
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageSelect(e.target.files[0]);
    }
  };
  
  const handleImageSelect = (file: File) => {
    // Check if the file is an image
    if (!file.type.match('image.*')) {
      toast.error('Please select an image file');
      return;
    }
    
    // Reset states
    setResult(null);
    setProgress(0);
    
    // Create a URL for the image
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const handleRemoveImage = () => {
    setSelectedImage(null);
    setResult(null);
    setProgress(0);
    setIsProcessing(false);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleClassifyImage = () => {
    if (!selectedImage) return;
    
    setIsProcessing(true);
    setProgress(0);
    
    // Simulate classification processing with progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 10;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          
          // Mock classification result (randomly decide benign or malignant)
          const isMalignant = Math.random() > 0.5;
          const confidence = 0.7 + Math.random() * 0.25; // Random confidence between 0.7 and 0.95
          
          const classificationResult = {
            classification: isMalignant ? "Malignant" : "Benign" as "Benign" | "Malignant",
            confidence
          };
          
          setResult(classificationResult);
          setIsProcessing(false);
          
          // Call the onClassify callback if provided
          if (onClassify) {
            onClassify({
              ...classificationResult,
              imageUrl: selectedImage
            });
          }
          
          return 100;
        }
        
        return newProgress;
      });
    }, 200);
  };
  
  return (
    <div className={cn("bg-card rounded-xl border border-border overflow-hidden", className)}>
      <div className="p-6">
        <h3 className="text-lg font-medium mb-4">Melanoma Image Classifier</h3>
        
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center transition-all",
            isDragging ? "border-primary bg-primary/5" : "border-border",
            selectedImage ? "pb-4" : "pb-8"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {selectedImage ? (
            <div className="space-y-4">
              <div className="relative max-h-60 mx-auto rounded-lg overflow-hidden">
                <img 
                  src={selectedImage} 
                  alt="Selected" 
                  className="max-h-60 mx-auto object-contain"
                />
                <button
                  className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1"
                  onClick={handleRemoveImage}
                >
                  <X size={16} />
                </button>
              </div>
              
              <AnimatePresence>
                {isProcessing ? (
                  <motion.div 
                    key="processing" 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                  >
                    <p className="text-sm text-muted-foreground mb-2">Processing image...</p>
                    <Progress value={progress} className="h-2" />
                  </motion.div>
                ) : result ? (
                  <motion.div 
                    key="result" 
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0 }}
                  >
                    <div 
                      className={cn(
                        "flex items-center justify-center gap-2 py-2 px-4 rounded-full mx-auto w-fit",
                        result.classification === "Malignant" 
                          ? "bg-red-100 text-red-800" 
                          : "bg-green-100 text-green-800"
                      )}
                    >
                      {result.classification === "Malignant" ? (
                        <AlertCircle size={16} />
                      ) : (
                        <Check size={16} />
                      )}
                      <span className="font-medium">{result.classification}</span>
                    </div>
                    
                    <p className="text-sm">
                      <span className="text-muted-foreground">Confidence:</span>{' '}
                      <span className="font-medium">{formatPercentage(result.confidence)}</span>
                    </p>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleRemoveImage}
                      className="w-full mt-2"
                    >
                      Analyze Another Image
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="actions" 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                  >
                    <Button 
                      onClick={handleClassifyImage}
                      className="w-full"
                    >
                      Classify Image
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center mx-auto">
                <ImageIcon size={32} className="text-muted-foreground" />
              </div>
              
              <div className="space-y-2">
                <h4 className="text-base font-medium">Upload an image for classification</h4>
                <p className="text-sm text-muted-foreground">
                  Drag and drop an image or click to browse
                </p>
              </div>
              
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="relative"
              >
                <Upload size={16} className="mr-2" />
                Choose File
                <input
                  ref={fileInputRef}
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  onChange={handleFileInputChange}
                />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageClassifier;
