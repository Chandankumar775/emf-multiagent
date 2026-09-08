import React from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function UnifiedReceipt({ show }: { show: boolean }) {
  if (!show) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-12 relative overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="bg-[var(--card)] p-8 md:p-12 rounded-3xl border border-[var(--border)] shadow-2xl relative overflow-hidden">
            {/* Top Pattern */}
            <div
              className="absolute top-0 left-0 w-full h-2"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, var(--accent) 0, var(--accent) 10px, transparent 10px, transparent 20px)",
              }}
            ></div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 border-b border-white/5 pb-8">
              <div>
                <span className="text-xs uppercase tracking-widest text-[var(--accent)] font-mono block mb-2">
                  // SETTLED
                </span>
                <h3 className="text-4xl font-serif text-white flex items-center gap-3">
                  Receipt <CheckCircle2 className="text-[var(--accent)] w-8 h-8" />
                </h3>
              </div>
              <div className="text-right">
                <div className="text-sm font-mono text-gray-500 uppercase">
                  Total Charged
                </div>
                <div className="text-2xl font-mono text-white mt-1">
                  0.07 USDC
                </div>
              </div>
            </div>

            <div className="space-y-6 font-mono text-sm">
              <div className="flex justify-between items-center text-gray-400 border-b border-white/5 pb-2">
                <span>Workflow ID</span>
                <span className="text-white">WF-8923-X402</span>
              </div>
              <div className="flex justify-between items-center text-gray-400 border-b border-white/5 pb-2">
                <span>Timestamp</span>
                <span className="text-white">
                  {new Date().toLocaleString("en-US", {
                    timeZone: "America/New_York",
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}{" "}
                  EST
                </span>
              </div>

              <div className="pt-4">
                <span className="text-xs text-gray-500 uppercase tracking-widest block mb-4">
                  Micro-Settlements
                </span>
                <ul className="space-y-4">
                  {[
                    { step: "01", amount: "0.01 USDC", hash: "ALGO7X9F...K2P" },
                    { step: "02", amount: "0.02 USDC", hash: "ALGO4Y2C...M9L" },
                    { step: "03", amount: "0.01 USDC", hash: "ALGO9A1B...Q5Z" },
                    { step: "04", amount: "0.03 USDC", hash: "ALGO2C4D...X8W" },
                  ].map((tx, i) => (
                    <li
                      key={i}
                      className="flex flex-col md:flex-row justify-between md:items-center gap-2 p-3 bg-white/5 rounded-xl border border-white/5"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-gray-500">{tx.step}</span>
                        <span className="text-white">{tx.amount}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-gray-400">{tx.hash}</span>
                        <a
                          href="#"
                          className="text-[10px] text-[var(--accent)] hover:text-white transition-colors flex items-center gap-1"
                        >
                          VERIFY <ArrowRight className="w-3 h-3" />
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-12 p-6 bg-black/50 border border-white/5 rounded-2xl text-center">
              <span className="block text-[10px] text-gray-500 uppercase tracking-widest mb-2">
                Master Receipt Hash
              </span>
              <span className="text-sm font-mono text-white/80 break-all">
                0x0000000000000000000000000000000000000000000000000000000000000000
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
