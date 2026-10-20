"use client";

import React, { useState } from "react";
import Hero from "@/components/Hero";
import WorkflowInput from "@/components/WorkflowInput";
import LiveWorkflowExecution from "@/components/LiveWorkflowExecution";
import UnifiedReceipt from "@/components/UnifiedReceipt";
import CostBreakdown from "@/components/CostBreakdown";

export default function Home() {
  const [workflowActive, setWorkflowActive] = useState(false);
  const [workflowDone, setWorkflowDone] = useState(false);

  const handleExecute = (query: string) => {
    // Reset states when starting new workflow
    setWorkflowDone(false);
    setWorkflowActive(true);
    
    // Scroll smoothly to the execution section after a short delay
    setTimeout(() => {
      document.getElementById("execution-section")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleComplete = (success: boolean) => {
    setWorkflowDone(true);
    
    if (success) {
      setTimeout(() => {
        document.getElementById("receipt-section")?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)] selection:bg-[var(--accent)] selection:text-white">
      {/* Navigation - simplified for dashboard */}
      <nav id="main-nav" className="absolute top-0 left-0 right-0 z-50 py-8 bg-transparent">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <a href="#" className="text-2xl font-bold tracking-tighter font-serif">
            EMF.
          </a>
          <div className="text-xs uppercase tracking-widest font-mono text-gray-500">
            EMF Dashboard
          </div>
        </div>
      </nav>

      <Hero />
      <WorkflowInput onExecute={handleExecute} />
      
      <div id="execution-section">
        <LiveWorkflowExecution 
          isActive={workflowActive} 
          onComplete={handleComplete} 
        />
      </div>

      <div id="receipt-section">
        <UnifiedReceipt show={workflowDone} />
        <CostBreakdown show={workflowDone} />
      </div>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 bg-[var(--bg)] relative overflow-hidden mt-12">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
            <div className="w-full md:w-auto">
              <h2 className="text-[10vw] leading-[0.8] tracking-tighter text-white/10 font-bold select-none pointer-events-none font-serif">
                ORCHESTRATE.
              </h2>
            </div>
            
            <div className="flex flex-col gap-8 text-right">
              <p className="text-sm text-gray-600 font-mono uppercase tracking-widest">
                Powered by Algorand
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
