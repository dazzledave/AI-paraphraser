import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type ParaphrasingStyle = "Formal" | "Casual" | "Concise" | "Creative";

interface StyleSelectorProps {
  selectedStyle: ParaphrasingStyle;
  onStyleChange: (style: ParaphrasingStyle) => void;
}

const StyleSelector = ({
  selectedStyle = "Casual",
  onStyleChange,
}: StyleSelectorProps) => {
  const styles: ParaphrasingStyle[] = [
    "Formal",
    "Casual",
    "Concise",
    "Creative",
  ];

  const styleDescriptions = {
    Formal: "Business and academic tone",
    Casual: "Everyday conversational language",
    Concise: "Shorter and simplified text",
    Creative: "Figurative and engaging language",
  };

  return (
    <div className="bg-card w-full p-4 rounded-md shadow-sm">
      <h3 className="text-sm font-medium mb-2 text-foreground">
        Select Paraphrasing Style
      </h3>
      <div className="flex flex-wrap gap-2">
        <TooltipProvider>
          {styles.map((style) => (
            <Tooltip key={style}>
              <TooltipTrigger asChild>
                <Button
                  variant={selectedStyle === style ? "default" : "outline"}
                  size="sm"
                  onClick={() => onStyleChange(style)}
                  className={`transition-all ${selectedStyle === style ? "ring-2 ring-primary ring-offset-1" : ""}`}
                >
                  {style}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{styleDescriptions[style]}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
    </div>
  );
};

export default StyleSelector;
