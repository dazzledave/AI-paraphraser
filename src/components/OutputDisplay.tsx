import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface OutputDisplayProps {
  outputText: string;
  selectedStyle: "Formal" | "Casual" | "Concise" | "Creative";
  isLoading: boolean;
  isProcessed: boolean;
}

const OutputDisplay = ({
  outputText = "",
  selectedStyle = "Casual",
  isLoading = false,
  isProcessed = false,
}: OutputDisplayProps) => {
  const getBadgeVariant = () => {
    switch (selectedStyle) {
      case "Formal":
        return "default";
      case "Casual":
        return "secondary";
      case "Concise":
        return "outline";
      case "Creative":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <Card className="w-full h-full bg-card shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold">
            Paraphrased Text
          </CardTitle>
          {selectedStyle && !isLoading && (
            <Badge variant={getBadgeVariant()}>{selectedStyle}</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[95%]" />
            <Skeleton className="h-4 w-[85%]" />
            <Skeleton className="h-4 w-[70%]" />
          </div>
        ) : outputText ? (
          <div className="text-foreground whitespace-pre-wrap">
            {outputText}
          </div>
        ) : (
          <div className="text-muted-foreground italic py-4">
            Paraphrased text will appear here...
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OutputDisplay;
