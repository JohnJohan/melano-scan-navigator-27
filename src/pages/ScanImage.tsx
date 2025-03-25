
import React, { useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Check } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import PageTitle from "@/components/ui/page-title";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ImageClassifier from "@/components/melanoma/ImageClassifier";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn, formatPercentage } from "@/lib/utils";

interface ClassificationResult {
  classification: "Benign" | "Malignant";
  confidence: number;
  imageUrl: string;
}

const ScanImage: React.FC = () => {
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [imageHistory, setImageHistory] = useState<ClassificationResult[]>([]);
  
  const handleClassificationResult = (newResult: ClassificationResult) => {
    setResult(newResult);
    setImageHistory(prev => [newResult, ...prev].slice(0, 5));
  };
  
  const clearResult = () => {
    setResult(null);
  };
  
  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <PageTitle
          title="Scan Image"
          description="Upload and classify skin lesion images for melanoma detection."
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="upload" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="upload">Upload Image</TabsTrigger>
                <TabsTrigger value="camera">Use Camera</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upload" className="mt-0">
                <ImageClassifier 
                  onClassify={handleClassificationResult} 
                  className="shadow-sm"
                />
              </TabsContent>
              
              <TabsContent value="camera" className="mt-0">
                <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm p-6">
                  <h3 className="text-lg font-medium mb-4">Camera Capture</h3>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <div className="space-y-4">
                      <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center mx-auto">
                        <AlertCircle size={32} className="text-muted-foreground" />
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="text-base font-medium">Camera access required</h4>
                        <p className="text-sm text-muted-foreground">
                          This feature requires camera permission
                        </p>
                      </div>
                      
                      <Button disabled>
                        Enable Camera
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
              <div className="p-6 border-b border-border">
                <h3 className="text-lg font-medium">Classification Results</h3>
              </div>
              
              {result ? (
                <div className="p-6">
                  <div className="flex flex-col items-center space-y-4 mb-6">
                    <div className="relative h-40 w-40 rounded-lg overflow-hidden border border-border">
                      <img
                        src={result.imageUrl}
                        alt="Classified"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    
                    <div
                      className={cn(
                        "flex items-center gap-2 py-2 px-6 rounded-full",
                        result.classification === "Malignant"
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      )}
                    >
                      {result.classification === "Malignant" ? (
                        <AlertCircle size={18} />
                      ) : (
                        <Check size={18} />
                      )}
                      <span className="font-medium text-lg">{result.classification}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Confidence</span>
                        <span className="font-medium">{formatPercentage(result.confidence)}</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full",
                            result.classification === "Malignant" ? "bg-red-500" : "bg-green-500"
                          )}
                          style={{ width: `${result.confidence * 100}%` }}
                        />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Recommendation</h4>
                      <p className="text-sm text-muted-foreground">
                        {result.classification === "Malignant"
                          ? "This lesion shows characteristics consistent with melanoma. Immediate dermatological consultation is recommended."
                          : "This lesion appears benign. Regular monitoring is recommended as part of routine skin checks."}
                      </p>
                    </div>
                    
                    <div className="pt-2">
                      <Button
                        variant="outline"
                        onClick={clearResult}
                        className="w-full"
                      >
                        Scan Another Image
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center">
                  <div className="py-8">
                    <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                      <AlertCircle size={24} className="text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">
                      No image has been classified yet. Upload an image to see results.
                    </p>
                  </div>
                </div>
              )}
              
              {imageHistory.length > 0 && !result && (
                <div className="p-6 border-t border-border">
                  <h4 className="text-sm font-medium mb-3">Recent Classifications</h4>
                  <div className="space-y-2">
                    {imageHistory.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center p-2 bg-secondary/50 rounded-md"
                      >
                        <div className="h-10 w-10 rounded-md overflow-hidden mr-3">
                          <img
                            src={item.imageUrl}
                            alt={`Classification ${index}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center">
                            <span
                              className={cn(
                                "text-xs px-1.5 py-0.5 rounded-full",
                                item.classification === "Malignant"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-green-100 text-green-800"
                              )}
                            >
                              {item.classification}
                            </span>
                            <span className="text-xs ml-2 text-muted-foreground">
                              {formatPercentage(item.confidence)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default ScanImage;
