
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format date to readable string
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

// Format percentage with specified decimal places
export function formatPercentage(value: number, decimalPlaces: number = 1): string {
  return `${(value * 100).toFixed(decimalPlaces)}%`;
}

// Convert confidence score to descriptive text
export function confidenceToText(confidence: number): string {
  if (confidence >= 0.95) return "Very High";
  if (confidence >= 0.85) return "High";
  if (confidence >= 0.70) return "Moderate";
  if (confidence >= 0.60) return "Low";
  return "Very Low";
}

// Get color based on confidence
export function getConfidenceColor(confidence: number): string {
  if (confidence >= 0.9) return "text-green-500";
  if (confidence >= 0.75) return "text-yellow-500";
  if (confidence >= 0.6) return "text-orange-500";
  return "text-red-500";
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

// Generate random ID
export function generateId(prefix: string = 'id'): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 11)}`;
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(later, wait);
  };
}
