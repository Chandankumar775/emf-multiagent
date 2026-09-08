"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, XCircle, RefreshCcw } from "lucide-react";

type StepStatus = "Pending" | "Paying" | "Settled" | "Rolled Back" | "Cancelled";

interface WorkflowStep {
  id: string;
  name: string;
  price: number;
  txHash?: string;
}

const STEPS: WorkflowStep[] = [
  { id: "01", name: "Search API", price: 0.01, txHash: "ALGO7X9F...K2P" },
  { id: "02", name: "Scraper API", price: 0.02, txHash: "ALGO4Y2C...M9L" },
  { id: "03", name: "Summarizer API", price: 0.01, txHash: "ALGO9A1B...Q5Z" },
  { id: "04", name: "Report Writer", price: 0.03, txHash: "ALGO2C4D...X8W" },
];

export default function LiveWorkflowExecution({
  isActive,
  onComplete,
}: {
  isActive: boolean;
  onComplete: (success: boolean) => void;
}) {
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [stepStates, setStepStates] = useState<StepStatus[]>(
    Array(STEPS.length).fill("Pending")
  );
  const [shouldFail, setShouldFail] = useState(false);
  const [workflowDone, setWorkflowDone] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setCurrentStepIndex(-1);
      setStepStates(Array(STEPS.length).fill("Pending"));
      setWorkflowDone(false);
      return;
    }

    let isCancelled = false;

    const runWorkflow = async () => {
      for (let i = 0; i < STEPS.length; i++) {
        if (isCancelled) return;
        setCurrentStepIndex(i);

        // Set to Paying
        setStepStates((prev) => {
          const next = [...prev];
          next[i] = "Paying";
          return next;
        });

        // Wait for 'paying' simulation
        await new Promise((res) => setTimeout(res, 1200));
        if (isCancelled) return;

        if (shouldFail && i === 2) {
          // Fail on step 03
          setStepStates((prev) => {
            const next = [...prev];
            // Current step cancels
            next[i] = "Cancelled";
            // Previous steps roll back
            for (let j = 0; j < i; j++) next[j] = "Rolled Back";
            // Future steps cancel
            for (let j = i + 1; j < STEPS.length; j++) next[j] = "Cancelled";
            return next;
          });
          setWorkflowDone(true);
          onComplete(false);
          return;
        }

        // Settled
        setStepStates((prev) => {
          const next = [...prev];
          next[i] = "Settled";
          return next;
        });

        await new Promise((res) => setTimeout(res, 500));
      }

      if (!isCancelled) {
        setWorkflowDone(true);
        onComplete(true);
      }
    };

    runWorkflow();

    return () => {
      isCancelled = true;
    };
  }, [isActive, shouldFail, onComplete]);

  const totalCost = STEPS.reduce((acc, step) => acc + step.price, 0);
  const isRolledBack = stepStates.includes("Rolled Back");

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif">
                Live <span className="italic">Execution</span>
              </h2>
            </div>
            {/* Demo Toggle */}
            <div className="flex items-center gap-3 bg-[var(--card)] border border-[var(--border)] px-4 py-2 rounded-full">
              <span className="text-xs font-mono text-gray-400 uppercase">
                Simulate Failure
              </span>
              <button
                onClick={() => setShouldFail(!shouldFail)}
                className={`w-10 h-5 rounded-full relative transition-colors ${
                  shouldFail ? "bg-red-900" : "bg-white/10"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${
                    shouldFail ? "translate-x-5.5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {STEPS.map((step, idx) => {
              const status = stepStates[idx];
              const isPaying = status === "Paying";
              const isSettled = status === "Settled";
              const isRolled = status === "Rolled Back";
              const isCancelled = status === "Cancelled";

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: isActive && idx <= currentStepIndex ? 1 : 0.4,
                    y: 0,
                  }}
                  className={`bg-[var(--card)] border rounded-2xl p-6 relative overflow-hidden transition-colors duration-500 ${
                    isRolled || isCancelled
                      ? "border-red-900/50"
                      : isSettled
                      ? "border-[var(--accent)]/30"
                      : "border-[var(--border)]"
                  }`}
                >
                  {/* Progress Bar Background */}
                  {isPaying && (
                    <motion.div
                      className="absolute bottom-0 left-0 h-1 bg-[var(--accent)]/80"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.2, ease: "linear" }}
                    />
                  )}
                  {isSettled && (
                    <div className="absolute bottom-0 left-0 h-1 bg-[var(--accent)] w-full" />
                  )}
                  {isRolled && (
                    <div className="absolute bottom-0 left-0 h-1 bg-red-800 w-full" />
                  )}

                  <div className="flex justify-between items-start">
                    <div className="flex gap-4 items-start">
                      <span className="text-xs font-mono text-gray-500 border border-white/10 px-2 py-1 rounded-full">
                        {step.id}
                      </span>
                      <div>
                        <h4
                          className={`text-lg font-serif ${
                            isRolled || isCancelled
                              ? "text-gray-500 line-through"
                              : "text-white"
                          }`}
                        >
                          {step.name}
                        </h4>
                        <AnimatePresence>
                          {isSettled && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              className="text-[10px] md:text-xs font-mono text-gray-400 mt-2 flex items-center gap-2"
                            >
                              <span>TX: {step.txHash}</span>
                              <Check className="w-3 h-3 text-[var(--accent)]" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <div className="text-right">
                      <div
                        className={`text-sm font-mono ${
                          isRolled || isCancelled
                            ? "text-gray-500 line-through"
                            : "text-white"
                        }`}
                      >
                        {step.price.toFixed(2)} USDC
                      </div>
                      <div className="mt-1">
                        {isPaying && (
                          <span className="text-xs font-mono text-[var(--accent)] uppercase animate-pulse flex items-center justify-end gap-1">
                            <RefreshCcw className="w-3 h-3 animate-spin" />
                            Paying...
                          </span>
                        )}
                        {isSettled && (
                          <span className="text-xs font-mono text-[var(--accent)] uppercase flex items-center justify-end gap-1">
                            Settled <Check className="w-3 h-3" />
                          </span>
                        )}
                        {isRolled && (
                          <span className="text-xs font-mono text-red-500 uppercase flex items-center justify-end gap-1">
                            Rolled Back <XCircle className="w-3 h-3" />
                          </span>
                        )}
                        {isCancelled && (
                          <span className="text-xs font-mono text-gray-500 uppercase flex items-center justify-end gap-1">
                            Cancelled <XCircle className="w-3 h-3" />
                          </span>
                        )}
                        {status === "Pending" && (
                          <span className="text-xs font-mono text-gray-600 uppercase">
                            Pending
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-8">
            {isRolledBack ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-950/40 border border-red-900/50 p-6 rounded-2xl text-center"
              >
                <h3 className="text-lg md:text-xl font-mono text-red-500 uppercase tracking-widest">
                  Atomic Rollback — 0.00 USDC Charged
                </h3>
              </motion.div>
            ) : (
              <div className="flex justify-between items-center p-6 bg-[var(--card)] rounded-2xl border border-[var(--border)]">
                <span className="text-sm font-mono text-gray-400 uppercase tracking-widest">
                  Total
                </span>
                <span className="text-xl font-mono text-white">
                  {totalCost.toFixed(2)} USDC
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
