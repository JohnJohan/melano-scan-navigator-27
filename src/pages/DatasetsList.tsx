
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Filter, FileUp } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import PageTitle from "@/components/ui/page-title";
import DatasetCard from "@/components/melanoma/DatasetCard";
import DatasetUploader from "@/components/melanoma/DatasetUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { datasets as initialDatasets } from "@/lib/mockData";
import { Dataset } from "@/types/melanoma";

const DatasetsList: React.FC = () => {
  const [datasets, setDatasets] = useState<Dataset[]>(initialDatasets);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);
  
  const handleUploadComplete = (newDataset: Dataset) => {
    setDatasets(prev => [newDataset, ...prev]);
    setIsUploaderOpen(false);
  };
  
  const filteredDatasets = searchQuery 
    ? datasets.filter(dataset => 
        dataset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dataset.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dataset.source.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : datasets;
  
  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <PageTitle
            title="Datasets"
            description="Manage and explore melanoma image datasets for training and testing."
            className="mb-0"
          />
          
          <Dialog open={isUploaderOpen} onOpenChange={setIsUploaderOpen}>
            <DialogTrigger asChild>
              <Button className="w-full md:w-auto">
                <Plus size={16} className="mr-2" />
                Add Dataset
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
              <DialogHeader>
                <DialogTitle>Upload Dataset</DialogTitle>
              </DialogHeader>
              <DatasetUploader 
                onUploadComplete={handleUploadComplete}
                className="mt-4"
              />
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="bg-card rounded-xl border border-border p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input 
              placeholder="Search datasets..." 
              className="flex-1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="outline" className="flex gap-2">
              <Filter size={16} />
              <span>Filter</span>
            </Button>
          </div>
        </div>
        
        {filteredDatasets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDatasets.map((dataset) => (
              <DatasetCard key={dataset.id} dataset={dataset} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-card rounded-xl border border-border">
            <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
              <FileUp size={24} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No datasets found</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              {searchQuery 
                ? `No datasets match your search for "${searchQuery}"`
                : "Upload a dataset to get started with melanoma detection and analysis"
              }
            </p>
            {searchQuery ? (
              <Button 
                variant="outline" 
                onClick={() => setSearchQuery("")}
              >
                Clear Search
              </Button>
            ) : (
              <Button onClick={() => setIsUploaderOpen(true)}>
                Upload Dataset
              </Button>
            )}
          </div>
        )}
      </motion.div>
    </MainLayout>
  );
};

export default DatasetsList;
