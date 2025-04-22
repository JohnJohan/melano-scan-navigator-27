
// Utility functions for handling different file formats for melanoma datasets

/**
 * Supported file formats for melanoma datasets
 */
export const SUPPORTED_FILE_FORMATS = {
  // Image formats
  jpg: { type: 'image', description: 'JPEG Image' },
  jpeg: { type: 'image', description: 'JPEG Image' },
  png: { type: 'image', description: 'PNG Image' },
  tiff: { type: 'image', description: 'TIFF Image' },
  bmp: { type: 'image', description: 'Bitmap Image' },
  
  // Medical image formats
  dcm: { type: 'medical', description: 'DICOM Image' },
  dicom: { type: 'medical', description: 'DICOM Image' },
  nii: { type: 'medical', description: 'NIfTI Image' },
  'nii.gz': { type: 'medical', description: 'Compressed NIfTI Image' },
  
  // Data formats
  csv: { type: 'data', description: 'Comma-Separated Values' },
  json: { type: 'data', description: 'JSON Data' },
  xml: { type: 'data', description: 'XML Data' },
  txt: { type: 'data', description: 'Text File' },
  xlsx: { type: 'data', description: 'Excel Spreadsheet' },
  xls: { type: 'data', description: 'Excel Spreadsheet (Legacy)' },
  
  // Compressed formats
  zip: { type: 'archive', description: 'ZIP Archive' },
  rar: { type: 'archive', description: 'RAR Archive' },
  '7z': { type: 'archive', description: '7-Zip Archive' },
  tar: { type: 'archive', description: 'TAR Archive' },
  'tar.gz': { type: 'archive', description: 'Compressed TAR Archive' },
};

/**
 * Get file extension from filename
 */
export function getFileExtension(filename: string): string {
  const parts = filename.toLowerCase().split('.');
  
  // Handle special cases like .tar.gz
  if (parts.length > 2 && parts[parts.length - 2] === 'tar' && parts[parts.length - 1] === 'gz') {
    return 'tar.gz';
  }
  
  // Handle .nii.gz
  if (parts.length > 2 && parts[parts.length - 2] === 'nii' && parts[parts.length - 1] === 'gz') {
    return 'nii.gz';
  }
  
  return parts.length > 1 ? parts[parts.length - 1] : '';
}

/**
 * Check if a file is a supported format
 */
export function isSupportedFormat(filename: string): boolean {
  const extension = getFileExtension(filename);
  return extension in SUPPORTED_FILE_FORMATS;
}

/**
 * Get format description for a file
 */
export function getFormatDescription(filename: string): string {
  const extension = getFileExtension(filename);
  return extension in SUPPORTED_FILE_FORMATS 
    ? SUPPORTED_FILE_FORMATS[extension as keyof typeof SUPPORTED_FILE_FORMATS].description 
    : 'Unknown Format';
}

/**
 * Get format type for a file (image, medical, data, etc.)
 */
export function getFormatType(filename: string): string {
  const extension = getFileExtension(filename);
  return extension in SUPPORTED_FILE_FORMATS 
    ? SUPPORTED_FILE_FORMATS[extension as keyof typeof SUPPORTED_FILE_FORMATS].type 
    : 'unknown';
}

/**
 * Determine if a dataset format is supported for analysis
 */
export function canAnalyzeDataset(format: string): boolean {
  // These are the formats that our mock app can "analyze"
  const analyzableFormats = ['jpg', 'jpeg', 'png', 'dcm', 'dicom', 'nii', 'nii.gz'];
  return analyzableFormats.includes(format.toLowerCase());
}

/**
 * Format file size in human readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
