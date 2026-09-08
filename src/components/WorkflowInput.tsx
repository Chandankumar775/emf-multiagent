"use client";

import React, { useState } from "react";
import { Play } from "lucide-react";

export default function WorkflowInput({
  onExecute,
}: {
  onExecute: (query: string) => void;
}) {
  const [query, setQuery] = useState("");
  const presets = ["EV Market 2026", "AI Trends", "Competitor Analysis"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onExecute(query);
    }
  };

  return (
    <section id="workflow-input" className="py-24 relative overflow-hidden bg-[var(--bg)]">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-[var(--accent)] font-mono mb-4 block">
              // START A WORKFLOW
            </span>
            <h2 className="text-4xl md:text-5xl font-serif mb-6">
              Research <span className="italic font-light">Agent</span>
            </h2>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-[var(--card)] p-8 md:p-10 rounded-2xl border border-[var(--border)]"
          >
            <div className="space-y-2">
              <textarea
                rows={4}
                required
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Describe what you want to research..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[var(--accent)] transition-colors resize-none text-sm md:text-base font-light"
              ></textarea>
            </div>

            <div className="flex flex-wrap gap-2">
              {presets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setQuery(preset)}
                  className="px-4 py-2 rounded-full text-[10px] md:text-xs font-mono uppercase tracking-widest border border-white/10 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors text-white/50"
                >
                  {preset}
                </button>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-[var(--border)]">
              <button
                type="submit"
                disabled={!query.trim()}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-medium bg-[var(--accent)] text-white hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] transition-all duration-300"
              >
                <span>Execute Workflow</span>
                <Play className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
