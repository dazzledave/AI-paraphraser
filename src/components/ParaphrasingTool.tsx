import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertCircle } from "lucide-react";
import StyleSelector from "./StyleSelector";
import OutputDisplay from "./OutputDisplay";

type ParaphrasingStyle = "Formal" | "Casual" | "Concise" | "Creative";

const API_URL = "http://localhost:3000/api/paraphrase";

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

    // Start loading
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          style: selectedStyle,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to paraphrase text');
      }

      const data = await response.json();
      setOutputText(data.paraphrasedText);
      setIsProcessed(true);
    } catch (err) {
      setError("An error occurred while paraphrasing. Please try again.");
      console.error('Error:', err);
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
