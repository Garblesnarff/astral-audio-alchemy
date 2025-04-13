
import React from 'react';
import { Toaster } from "@/components/ui/toaster";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-6 py-4 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            Astral Audio Alchemy
          </h1>
          <div className="space-x-2 flex items-center">
            <span className="text-sm text-muted-foreground">Binaural Beats Generator</span>
          </div>
        </div>
      </header>
      <main className="flex-1 container max-w-5xl mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="px-6 py-4 border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="container max-w-5xl mx-auto text-center text-sm text-muted-foreground">
          <p>© 2025 Astral Audio Alchemy. Use headphones for best results.</p>
          <p className="text-xs mt-1">
            Warning: Consult a medical professional before using if you have epilepsy or other medical conditions.
          </p>
        </div>
      </footer>
      <Toaster />
    </div>
  );
};

export default Layout;
