import React from "react";
import { Sparkles } from "lucide-react";

export default function Hero() {
  const scrollToWorkflow = () => {
    const el = document.getElementById("workflow-input");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-60 mix-blend-screen">
          <img
            src="https://framerusercontent.com/images/9zvwRJAavKKacVyhFCwHyXW1U.png?width=1536&height=1024"
            alt="Atmosphere"
            className="w-full h-full object-cover object-center opacity-80"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg)] z-10"></div>
      </div>

      {/* Floating Surrealist Elements */}
      <div className="absolute -left-[10%] top-[-10%] md:left-[-5%] md:top-[-15%] w-[50vw] md:w-[40vw] max-w-[800px] z-10 pointer-events-none mix-blend-hard-light opacity-80 animate-pulse duration-[12000ms]">
        <img
          src="https://framerusercontent.com/images/KNhiA5A2ykNYqNkj04Hk6BVg5A.png?width=1540&height=1320"
          alt="Hand Reaching"
          className="w-full h-auto object-contain -translate-y-4"
        />
      </div>

      <div className="absolute -right-[10%] bottom-[-10%] md:right-[-5%] md:bottom-[-5%] w-[45vw] md:w-[35vw] max-w-[700px] z-10 pointer-events-none mix-blend-hard-light opacity-80 animate-pulse duration-[14000ms]">
        <img
          src="https://framerusercontent.com/images/X89VFCABCEjjZ4oLGa3PjbOmsA.png?width=1542&height=1002"
          alt="Hand Receiving"
          className="w-full h-auto object-contain translate-y-4"
        />
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-6 relative z-20 text-center flex flex-col items-center justify-center h-full">
        <div className="max-w-4xl mx-auto opacity-0 animate-[fadeInUp_1s_ease-out_forwards]">
          <h1
            className="text-5xl md:text-7xl font-medium leading-[1.1] tracking-tight mb-6 text-[#ffe0e0] mix-blend-overlay font-serif"
            style={{ textShadow: "0 0 12px rgba(255,255,255,0.71)" }}
          >
            Pay once. <br />
            <span className="italic font-light text-[#ffe0e0]">
              Orchestrate everything.
            </span>
          </h1>

          <p
            className="text-base md:text-lg text-[#ffe0e0]/90 max-w-lg mx-auto mb-16 font-light tracking-wide leading-relaxed mix-blend-overlay opacity-0 animate-[fadeInUp_1s_ease-out_0.2s_forwards]"
            style={{ textShadow: "0 0 12px rgba(255,255,255,0.71)" }}
          >
            One request atomically coordinates multiple paid AI endpoints on
            Algorand. No subscriptions. No friction.
          </p>

          <div className="flex flex-col items-center gap-6 opacity-0 animate-[fadeInUp_1s_ease-out_0.4s_forwards]">
            <button
              onClick={scrollToWorkflow}
              className="relative group cursor-pointer border-none bg-transparent"
            >
              <div className="absolute inset-0 bg-[var(--accent)]/20 blur-xl rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
              <div className="relative border border-white/20 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full flex items-center gap-3 text-xs md:text-sm text-white uppercase tracking-widest hover:bg-white/10 transition-colors duration-300">
                <span>Run a Workflow</span>
                <Sparkles className="w-4 h-4 text-[var(--accent)]" />
              </div>
            </button>

            <div className="flex items-center gap-4 text-[10px] md:text-xs text-white/40 uppercase tracking-widest mt-8 font-mono">
              <span>ALGORAND TESTNET</span>
              <span className="w-px h-3 bg-white/20"></span>
              <span>USDC ASA</span>
              <span className="w-px h-3 bg-white/20"></span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                LIVE
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
