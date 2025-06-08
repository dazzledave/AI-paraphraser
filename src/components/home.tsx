import React from "react";
import ParaphrasingTool from "./ParaphrasingTool";
import { ThemeToggle } from "./theme-toggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-8 px-4 md:px-8 lg:px-12">
      <header className="w-full max-w-6xl mb-8 flex justify-between items-center">
        <div className="text-center flex-grow">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            AI Paraphrasing Tool
          </h1>
          <p className="mt-2 text-muted-foreground">
            Transform your text while preserving its original meaning
          </p>
        </div>
        <div className="ml-4">
          <ThemeToggle />
        </div>
      </header>

      <main className="w-full max-w-6xl flex-grow">
        <ParaphrasingTool />
      </main>

      <footer className="w-full max-w-6xl mt-12 pt-6 border-t border-border text-center text-muted-foreground text-sm">
        <p>
          © {new Date().getFullYear()} AI Paraphrasing Tool. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}
