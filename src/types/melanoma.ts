
export interface ScanResult {
  id: string;
  imageSrc: string;
  classification: "Benign" | "Malignant";
  confidence: number;
  timestamp: string;
  metadata: {
    patientId?: string;
    age?: number;
    gender?: string;
    location?: string;
    size?: string;
  };
}

export interface Dataset {
  id: string;
  name: string;
  description: string;
  imageCount: number;
  benignCount: number;
  malignantCount: number;
  lastUpdated: string;
  source: string;
  fileFormat?: string;
  fileSize?: number;
}

export interface ModelMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  auc: number;
}
