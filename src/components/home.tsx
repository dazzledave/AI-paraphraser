import React from "react";
import ParaphrasingTool from "./ParaphrasingTool";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4 md:px-8 lg:px-12">
      <header className="w-full max-w-6xl mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          AI Paraphrasing Tool
        </h1>
        <p className="mt-2 text-gray-600">
          Transform your text while preserving its original meaning
        </p>
      </header>

      <main className="w-full max-w-6xl flex-grow">
        <ParaphrasingTool />
      </main>

      <footer className="w-full max-w-6xl mt-12 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
        <p>
          © {new Date().getFullYear()} AI Paraphrasing Tool. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}
