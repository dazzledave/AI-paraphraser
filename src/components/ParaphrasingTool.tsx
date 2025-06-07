import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertCircle } from "lucide-react";
import StyleSelector from "./StyleSelector";
import OutputDisplay from "./OutputDisplay";

type ParaphrasingStyle = "Formal" | "Casual" | "Concise" | "Creative";

const ParaphrasingTool = () => {
  const [inputText, setInputText] = useState<string>("");
  const [outputText, setOutputText] = useState<string>("");
  const [selectedStyle, setSelectedStyle] =
    useState<ParaphrasingStyle>("Casual");
  const [wordCount, setWordCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isProcessed, setIsProcessed] = useState<boolean>(false);

  const MAX_WORDS = 500;

  useEffect(() => {
    // Calculate word count when input text changes
    const words = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
    setWordCount(words);

    // Reset error when input changes
    if (error) setError(null);

    // Reset processed state when input changes
    if (isProcessed) setIsProcessed(false);
  }, [inputText, error, isProcessed]);

  const handleStyleChange = (style: ParaphrasingStyle) => {
    setSelectedStyle(style);
    if (isProcessed && inputText.trim()) {
      paraphraseText();
    }
  };

  const paraphraseText = async () => {
    // Reset states
    setError(null);
    setOutputText("");

    // Validate input
    if (!inputText.trim()) {
      setError("Please enter text to paraphrase.");
      return;
    }

    if (wordCount > MAX_WORDS) {
      setError(`Text exceeds the ${MAX_WORDS} word limit.`);
      return;
    }

    // Check for inappropriate content (simplified example)
    const inappropriateWords = ["inappropriate1", "inappropriate2"]; // Replace with actual implementation
    const hasInappropriateContent = inappropriateWords.some((word) =>
      inputText.toLowerCase().includes(word.toLowerCase()),
    );

    if (hasInappropriateContent) {
      setError("Cannot process this content.");
      return;
    }

    // Start loading
    setIsLoading(true);

    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In a real implementation, this would be an API call to a paraphrasing service
      // For now, we'll just simulate different outputs based on the selected style
      let result = "";

      switch (selectedStyle) {
        case "Formal":
          result = `This is a formal paraphrase of: "${inputText.substring(0, 50)}${inputText.length > 50 ? "..." : ""}"\n\nThe formal paraphrased version would appear here with more professional vocabulary and structure.`;
          break;
        case "Casual":
          result = `This is a casual paraphrase of: "${inputText.substring(0, 50)}${inputText.length > 50 ? "..." : ""}"\n\nThe casual paraphrased version would appear here with everyday language and a conversational tone.`;
          break;
        case "Concise":
          result = `This is a concise paraphrase of: "${inputText.substring(0, 50)}${inputText.length > 50 ? "..." : ""}"\n\nThe concise paraphrased version would appear here with fewer words while maintaining the core meaning.`;
          break;
        case "Creative":
          result = `This is a creative paraphrase of: "${inputText.substring(0, 50)}${inputText.length > 50 ? "..." : ""}"\n\nThe creative paraphrased version would appear here with figurative language and engaging expressions.`;
          break;
        default:
          result = `Paraphrased version of your text would appear here.`;
      }

      setOutputText(result);
      setIsProcessed(true);
    } catch (err) {
      setError("An error occurred while paraphrasing. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background w-full max-w-7xl mx-auto p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Input Text</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                placeholder="Enter text to paraphrase (max 500 words)"
                className="min-h-[300px] resize-none"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={isLoading}
              />
              <div className="flex justify-between items-center">
                <div
                  className={`text-sm ${wordCount > MAX_WORDS ? "text-destructive" : "text-muted-foreground"}`}
                >
                  {wordCount} / {MAX_WORDS} words
                </div>
                <Button
                  onClick={paraphraseText}
                  disabled={isLoading || !inputText.trim()}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Paraphrasing...
                    </>
                  ) : (
                    "Paraphrase"
                  )}
                </Button>
              </div>

              {error && (
                <Alert variant="destructive" className="mt-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="pt-4">
                <StyleSelector
                  selectedStyle={selectedStyle}
                  onStyleChange={handleStyleChange}
                  disabled={isLoading}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Output Section */}
        <OutputDisplay
          outputText={outputText}
          selectedStyle={selectedStyle}
          isLoading={isLoading}
          isProcessed={isProcessed}
        />
      </div>
    </div>
  );
};

export default ParaphrasingTool;
