"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { motion } from "framer-motion";

const data = [
  { name: "Search", cost: 0.01 },
  { name: "Scraper", cost: 0.02 },
  { name: "Summarizer", cost: 0.01 },
  { name: "Report Writer", cost: 0.03 },
];

export default function CostBreakdown({ show }: { show: boolean }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!show || !mounted) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      className="py-12 pb-32 relative overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="bg-[var(--card)] p-8 md:p-12 rounded-3xl border border-[var(--border)] shadow-xl relative overflow-hidden">
            <div className="mb-10 text-center">
              <span className="text-xs uppercase tracking-widest text-[var(--accent)] font-mono block mb-2">
                // TRANSPARENCY
              </span>
              <h3 className="text-3xl font-serif text-white">Cost Breakdown</h3>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  layout="vertical"
                  margin={{ top: 0, right: 30, left: 20, bottom: 0 }}
                >
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="name"
                    type="category"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9ca3af", fontSize: 12, fontFamily: "monospace" }}
                    width={120}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
                    contentStyle={{
                      backgroundColor: "#111",
                      border: "1px solid #262626",
                      borderRadius: "12px",
                      fontFamily: "monospace",
                      fontSize: "12px",
                    }}
                    itemStyle={{ color: "#fff" }}
                  />
                  <Bar dataKey="cost" radius={[0, 4, 4, 0]} barSize={24}>
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index === 3 ? "var(--accent)" : "#333333"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
