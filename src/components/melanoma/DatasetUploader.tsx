
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, FileText, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Dataset } from '@/types/melanoma';
import { 
  SUPPORTED_FILE_FORMATS,
  getFileExtension,
  isSupportedFormat,
  getFormatDescription,
  getFormatType,
  formatFileSize 
} from '@/lib/fileUtils';
import { toast } from 'sonner';

interface DatasetUploaderProps {
  onUploadComplete?: (dataset: Dataset) => void;
  className?: string;
}

const ACCEPTED_FILE_FORMATS = Object.keys(SUPPORTED_FILE_FORMATS).map(ext => `.${ext}`);

const DatasetUploader: React.FC<DatasetUploaderProps> = ({ 
  onUploadComplete, 
  className 
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [datasetInfo, setDatasetInfo] = useState({
    name: '',
    description: '',
    source: ''
  });
  
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
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };
  
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };
  
  const handleFileSelect = (file: File) => {
    // Check if file format is supported
    if (!isSupportedFormat(file.name)) {
      const extension = getFileExtension(file.name);
      toast.error(`Unsupported file format: .${extension}`, {
        description: `Please upload a supported format`
      });
      return;
    }
    
    setSelectedFile(file);
    
    // Auto-populate dataset name based on file name
    setDatasetInfo(prev => ({
      ...prev,
      name: file.name.split('.')[0].replace(/[_-]/g, ' ')
    }));
    
    setIsDialogOpen(true);
  };
  
  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDatasetInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const simulateUpload = () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + 5;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          
          // After "upload" completes, create a mock dataset
          const newDataset: Dataset = {
            id: `dataset-${Date.now()}`,
            name: datasetInfo.name,
            description: datasetInfo.description,
            source: datasetInfo.source || 'User Upload',
            imageCount: Math.floor(Math.random() * 1000) + 100,
            benignCount: Math.floor(Math.random() * 800) + 50,
            malignantCount: Math.floor(Math.random() * 200) + 10,
            lastUpdated: new Date().toISOString().split('T')[0],
            fileFormat: getFileExtension(selectedFile.name),
            fileSize: selectedFile.size
          };
          
          // Reset states
          setTimeout(() => {
            setIsUploading(false);
            setSelectedFile(null);
            setIsDialogOpen(false);
            
            // Call the callback with the new dataset
            if (onUploadComplete) {
              onUploadComplete(newDataset);
            }
            
            toast.success('Dataset uploaded successfully', {
              description: `${newDataset.name} has been added to your datasets`
            });
            
            if (fileInputRef.current) {
              fileInputRef.current.value = '';
            }
          }, 500);
          
          return 100;
        }
        
        return newProgress;
      });
    }, 200);
  };
  
  const handleUpload = () => {
    // Validate dataset info
    if (!datasetInfo.name.trim()) {
      toast.error('Dataset name is required');
      return;
    }
    
    simulateUpload();
  };
  
  return (
    <div className={className}>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer",
              isDragging ? "border-primary bg-primary/5" : "border-border",
              "hover:border-primary/50 hover:bg-primary/5"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            {selectedFile ? (
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <FileText size={24} className="text-primary" />
                </div>
                
                <div>
                  <h4 className="text-base font-medium truncate">{selectedFile.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {formatFileSize(selectedFile.size)} · {getFormatDescription(selectedFile.name)}
                  </p>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile();
                  }}
                >
                  Remove File
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center mx-auto">
                  <Upload size={28} className="text-muted-foreground" />
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-base font-medium">Upload a dataset</h4>
                  <p className="text-sm text-muted-foreground">
                    Drag and drop or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supported formats: ZIP, CSV, JSON, TXT, JPG, DICOM, NIFTI, Excel, and more
                  </p>
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  className="sr-only"
                  onChange={handleFileInputChange}
                  accept={ACCEPTED_FILE_FORMATS.join(',')}
                />
              </div>
            )}
          </div>
        </DialogTrigger>
        
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Dataset Information</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {selectedFile && (
              <div className="flex items-center gap-3 p-2 bg-secondary/50 rounded-md">
                <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                  <FileText size={18} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{selectedFile.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB · {selectedFile.type || `${selectedFile.name.split('.').pop()?.toUpperCase()} File`}
                  </p>
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="dataset-name">Dataset Name</Label>
              <Input 
                id="dataset-name" 
                name="name"
                value={datasetInfo.name}
                onChange={handleInfoChange}
                placeholder="Enter dataset name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dataset-description">Description</Label>
              <Textarea 
                id="dataset-description" 
                name="description"
                value={datasetInfo.description}
                onChange={handleInfoChange}
                placeholder="Enter dataset description"
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dataset-source">Source</Label>
              <Input 
                id="dataset-source" 
                name="source"
                value={datasetInfo.source}
                onChange={handleInfoChange}
                placeholder="Enter dataset source"
              />
            </div>
            
            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
              disabled={isUploading}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleUpload}
              disabled={isUploading}
            >
              {isUploading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
                  Uploading...
                </span>
              ) : 'Upload Dataset'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DatasetUploader;
