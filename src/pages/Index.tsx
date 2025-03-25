
import React from "react";
import { motion } from "framer-motion";
import { Database, Image, Cpu, BarChart2 } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import PageTitle from "@/components/ui/page-title";
import StatsCard from "@/components/dashboard/StatsCard";
import ActivityChart from "@/components/charts/ActivityChart";
import RecentScansCard from "@/components/melanoma/RecentScansCard";
import ImageClassifier from "@/components/melanoma/ImageClassifier";
import ModelCard from "@/components/melanoma/ModelCard";

import { recentScans, modelMetrics, monthlyStats } from "@/lib/mockData";

const Dashboard: React.FC = () => {
  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <PageTitle
          title="Melanoma Classification"
          description="Analyze skin lesion images for melanoma classification using advanced AI techniques."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard
            title="Total Datasets"
            value="4"
            trend="up"
            trendValue="1 new"
            icon={<Database size={20} className="text-primary" />}
          />
          <StatsCard
            title="Total Images"
            value="43,441"
            trend="up"
            trendValue="2.4%"
            icon={<Image size={20} className="text-primary" />}
          />
          <StatsCard
            title="Model Accuracy"
            value="92%"
            trend="up"
            trendValue="1.5%"
            icon={<Cpu size={20} className="text-primary" />}
          />
          <StatsCard
            title="Classifications Today"
            value="24"
            trend="up"
            trendValue="8 scans"
            icon={<BarChart2 size={20} className="text-primary" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <ActivityChart data={monthlyStats} />
          </div>
          <div>
            <ModelCard metrics={modelMetrics} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ImageClassifier />
          <RecentScansCard scans={recentScans} />
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default Dashboard;
