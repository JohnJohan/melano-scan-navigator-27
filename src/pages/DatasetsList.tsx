
import React from "react";
import { motion } from "framer-motion";
import { Plus, Filter } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import PageTitle from "@/components/ui/page-title";
import DatasetCard from "@/components/melanoma/DatasetCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { datasets } from "@/lib/mockData";

const DatasetsList: React.FC = () => {
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
          
          <Button className="w-full md:w-auto">
            <Plus size={16} className="mr-2" />
            Add Dataset
          </Button>
        </div>
        
        <div className="bg-card rounded-xl border border-border p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input 
              placeholder="Search datasets..." 
              className="flex-1"
            />
            <Button variant="outline" className="flex gap-2">
              <Filter size={16} />
              <span>Filter</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {datasets.map((dataset) => (
            <DatasetCard key={dataset.id} dataset={dataset} />
          ))}
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default DatasetsList;
