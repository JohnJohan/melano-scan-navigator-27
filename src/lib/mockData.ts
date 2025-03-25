
import { ScanResult, Dataset, ModelMetrics } from "@/types/melanoma";

// Mock recent scans data
export const recentScans: ScanResult[] = [
  {
    id: "scan-001",
    imageSrc: "https://www.aimatmelanoma.org/wp-content/uploads/2020/02/dysplastic-nevus-1.jpg",
    classification: "Benign",
    confidence: 0.89,
    timestamp: "2023-10-15T12:30:45",
    metadata: {
      patientId: "P-12345",
      age: 42,
      gender: "Female",
      location: "Back",
      size: "6mm"
    }
  },
  {
    id: "scan-002",
    imageSrc: "https://www.aimatmelanoma.org/wp-content/uploads/2020/02/melanoma-3.jpg",
    classification: "Malignant",
    confidence: 0.94,
    timestamp: "2023-10-14T09:15:22",
    metadata: {
      patientId: "P-12346",
      age: 56,
      gender: "Male",
      location: "Arm",
      size: "12mm"
    }
  },
  {
    id: "scan-003",
    imageSrc: "https://www.aimatmelanoma.org/wp-content/uploads/2020/02/congenital-nevus-1.jpg",
    classification: "Benign",
    confidence: 0.78,
    timestamp: "2023-10-13T15:45:10",
    metadata: {
      patientId: "P-12347",
      age: 35,
      gender: "Female",
      location: "Leg",
      size: "4mm"
    }
  },
  {
    id: "scan-004",
    imageSrc: "https://www.aimatmelanoma.org/wp-content/uploads/2020/02/nodular-melanoma.jpg",
    classification: "Malignant",
    confidence: 0.91,
    timestamp: "2023-10-12T11:20:33",
    metadata: {
      patientId: "P-12348",
      age: 62,
      gender: "Male",
      location: "Face",
      size: "8mm"
    }
  }
];

// Mock datasets
export const datasets: Dataset[] = [
  {
    id: "dataset-001",
    name: "ISIC 2020",
    description: "International Skin Imaging Collaboration 2020 Challenge Dataset",
    imageCount: 33126,
    benignCount: 29577,
    malignantCount: 3549,
    lastUpdated: "2023-01-15",
    source: "ISIC Archive"
  },
  {
    id: "dataset-002",
    name: "PH2 Dataset",
    description: "Dermoscopic Images of Melanocytic Lesions",
    imageCount: 200,
    benignCount: 160,
    malignantCount: 40,
    lastUpdated: "2023-03-22",
    source: "University of Porto"
  },
  {
    id: "dataset-003",
    name: "HAM10000",
    description: "Human Against Machine with 10000 training images",
    imageCount: 10015,
    benignCount: 8990,
    malignantCount: 1025,
    lastUpdated: "2023-02-10",
    source: "Medical University of Vienna"
  },
  {
    id: "dataset-004",
    name: "MClass-D",
    description: "Munich Classification Dermoscopy Dataset",
    imageCount: 100,
    benignCount: 80,
    malignantCount: 20,
    lastUpdated: "2023-04-05",
    source: "University of Munich"
  }
];

// Model metrics data
export const modelMetrics: ModelMetrics = {
  accuracy: 0.92,
  precision: 0.88,
  recall: 0.90,
  f1Score: 0.89,
  auc: 0.95
};

// Mock monthly statistics
export const monthlyStats = [
  { month: "Jan", scans: 120, malignant: 18 },
  { month: "Feb", scans: 150, malignant: 22 },
  { month: "Mar", scans: 180, malignant: 25 },
  { month: "Apr", scans: 220, malignant: 32 },
  { month: "May", scans: 280, malignant: 38 },
  { month: "Jun", scans: 260, malignant: 35 },
  { month: "Jul", scans: 300, malignant: 42 },
  { month: "Aug", scans: 340, malignant: 48 },
  { month: "Sep", scans: 380, malignant: 52 },
  { month: "Oct", scans: 400, malignant: 58 },
  { month: "Nov", scans: 450, malignant: 62 },
  { month: "Dec", scans: 480, malignant: 68 }
];
