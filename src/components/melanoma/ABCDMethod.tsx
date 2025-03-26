
import React from "react";
import { motion } from "framer-motion";
import { 
  Check,
  X,
  AlertCircle,
  Circle,
  CircleDot,
  Ruler,
  Palette,
  Shapes
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

interface ABCDCriterion {
  letter: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  signs: {
    benign: string[];
    malignant: string[];
  };
}

interface ABCDMethodProps {
  classification?: "Benign" | "Malignant";
  className?: string;
}

const criteria: ABCDCriterion[] = [
  {
    letter: "A",
    name: "Asymmetry",
    description: "One half of the lesion is different from the other half",
    icon: <Shapes className="h-5 w-5" />,
    signs: {
      benign: ["Symmetrical shape", "Mirror image if cut in half"],
      malignant: ["Asymmetrical shape", "The two halves are different"]
    }
  },
  {
    letter: "B",
    name: "Border",
    description: "The borders of the lesion are irregular, ragged, notched, or blurred",
    icon: <Circle className="h-5 w-5" />,
    signs: {
      benign: ["Smooth, even borders", "Clear-cut edge"],
      malignant: ["Irregular, ragged borders", "Notched edges", "Blurred boundary"]
    }
  },
  {
    letter: "C",
    name: "Color",
    description: "The color of the lesion is not uniform",
    icon: <Palette className="h-5 w-5" />,
    signs: {
      benign: ["Uniform color", "Single shade of brown or tan"],
      malignant: ["Varied colors within the same lesion", "Shades of brown, tan, black", "Red, white, or blue patches"]
    }
  },
  {
    letter: "D",
    name: "Diameter",
    description: "The diameter of the lesion is usually greater than 6mm",
    icon: <Ruler className="h-5 w-5" />,
    signs: {
      benign: ["Usually smaller than 6mm", "Consistent size over time"],
      malignant: ["Usually larger than 6mm (pencil eraser size)", "Growth over time"]
    }
  },
];

const ABCDMethod: React.FC<ABCDMethodProps> = ({ 
  classification,
  className 
}) => {
  return (
    <div className={cn("bg-card rounded-xl border border-border overflow-hidden", className)}>
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-medium">ABCD Method Assessment</h3>
        <p className="text-sm text-muted-foreground mt-1">
          The ABCD method is a tool used to evaluate moles and skin lesions
        </p>
      </div>
      
      <div className="p-6">
        <Accordion type="single" collapsible className="w-full" defaultValue="A">
          {criteria.map((criterion) => (
            <AccordionItem key={criterion.letter} value={criterion.letter}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "flex items-center justify-center h-8 w-8 rounded-full",
                    classification === "Malignant" ? "bg-red-100 text-red-800" : 
                    classification === "Benign" ? "bg-green-100 text-green-800" : 
                    "bg-secondary text-secondary-foreground"
                  )}>
                    {criterion.icon}
                  </div>
                  <div className="text-left">
                    <span className="font-medium">
                      {criterion.letter} - {criterion.name}
                    </span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-14">
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {criterion.description}
                  </p>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium flex items-center text-green-600">
                        <Check size={16} className="mr-1" />
                        Benign Signs
                      </h4>
                      <ul className="text-sm space-y-1">
                        {criterion.signs.benign.map((sign, i) => (
                          <li key={i} className="flex items-start">
                            <CircleDot size={14} className="mr-2 mt-1 text-green-600" />
                            <span>{sign}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium flex items-center text-red-600">
                        <X size={16} className="mr-1" />
                        Malignant Signs
                      </h4>
                      <ul className="text-sm space-y-1">
                        {criterion.signs.malignant.map((sign, i) => (
                          <li key={i} className="flex items-start">
                            <AlertCircle size={14} className="mr-2 mt-1 text-red-600" />
                            <span>{sign}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        <div className="mt-6 text-sm bg-secondary/50 rounded-lg p-4">
          <p className="text-muted-foreground">
            <strong>Note:</strong> The ABCD method is a useful tool, but it is not definitive. 
            Some melanomas may not exhibit all these characteristics, and some benign lesions 
            may display some of them. Always consult a healthcare professional for a proper diagnosis.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ABCDMethod;
