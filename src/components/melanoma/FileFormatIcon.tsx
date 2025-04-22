
import React from 'react';
import { 
  FileText, 
  FileImage, 
  FileSpreadsheet, 
  FileJson, 
  FileArchive, 
  Database, 
  FileCog, 
  File
} from 'lucide-react';
import { getFormatType } from '@/lib/fileUtils';

interface FileFormatIconProps {
  filename: string;
  size?: number;
  className?: string;
}

const FileFormatIcon: React.FC<FileFormatIconProps> = ({ 
  filename,
  size = 16,
  className
}) => {
  const formatType = getFormatType(filename);
  
  switch (formatType) {
    case 'image':
      return <FileImage size={size} className={className} />;
    case 'medical':
      return <FileCog size={size} className={className} />;
    case 'data':
      if (filename.endsWith('.csv') || filename.endsWith('.xlsx') || filename.endsWith('.xls')) {
        return <FileSpreadsheet size={size} className={className} />;
      } else if (filename.endsWith('.json')) {
        return <FileJson size={size} className={className} />;
      } else {
        return <FileText size={size} className={className} />;
      }
    case 'archive':
      return <FileArchive size={size} className={className} />;
    default:
      return <File size={size} className={className} />;
  }
};

export default FileFormatIcon;
