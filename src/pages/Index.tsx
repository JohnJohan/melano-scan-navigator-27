
import React from "react";
import { motion } from "framer-motion";
import MainLayout from "@/components/layout/MainLayout";
import StatsCard from "@/components/dashboard/StatsCard";
import ModelCard from "@/components/melanoma/ModelCard";
import ABCDMethod from "@/components/melanoma/ABCDMethod";
import { modelMetrics, monthlyStats } from "@/lib/mockData";

const Index: React.FC = () => {
  return (
    <MainLayout>
      {/* Main content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        {/* Header */}
        <div>
          <motion.h1
            className="text-3xl font-bold"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Dashboard
          </motion.h1>
          <motion.p
            className="text-muted-foreground mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Melanoma detection and analysis overview
          </motion.p>
        </div>

        {/* Stats row */}
        <motion.div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          initial="hidden"
          animate="show"
        >
          <StatsCard
            title="Total Scans"
            value="1,284"
            trend="up"
            trendValue="12.5%"
            description="vs. previous month"
          />
          <StatsCard
            title="Detection Rate"
            value="94.2%"
            trend="up"
            trendValue="3.1%"
            description="vs. previous version"
          />
          <StatsCard
            title="Malignant Cases"
            value="164"
            trend="down"
            trendValue="8.4%"
            description="vs. previous month"
          />
          <StatsCard
            title="Avg. Confidence"
            value="92.7%"
            trend="up"
            trendValue="1.3%"
            description="vs. previous month"
          />
        </motion.div>

        {/* Model card section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <ModelCard metrics={modelMetrics} />
        </motion.div>

        {/* ABCD Method section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <ABCDMethod />
        </motion.div>
      </motion.div>
    </MainLayout>
  );
};

export default Index;
