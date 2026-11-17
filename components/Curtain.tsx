"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { assets } from "@/config/site";

const SPARKS = Array.from({ length: 18 }, (_, i) => ({ a: (i / 18) * Math.PI * 2, d: 38 + (i % 4) * 17 }));

type Phase = "closed" | "press" | "opening" | "done";

export default function Curtain({ onOpen, onReveal }: { onOpen: () => void; onReveal: () => void }) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("closed");

  const go = (skip = false) => {
    if (phase !== "closed") return;
    onOpen();
    if (skip || reduce) {
      setPhase("done");
      onReveal();
      return;
    }
    setPhase("press");
    window.setTimeout(() => setPhase("opening"), 650);
    window.setTimeout(() => onReveal(), 2200);
    window.setTimeout(() => setPhase("done"), 3400);
  };

  if (phase === "done") return null;
  const opening = phase === "opening";

  const panel = (left: boolean) => {
    const desktop = left ? assets.curtainLeftDesktop : assets.curtainRightDesktop;
    const mobile = left ? assets.curtainLeftMobile : assets.curtainRightMobile;
    return (
      <motion.div
        aria-hidden="true"
        className={`curtain-panel absolute inset-y-0 w-1/2 overflow-hidden ${left ? "left-0" : "right-0"}`}
        style={{ transformOrigin: left ? "left center" : "right center" }}
        initial={false}
        animate={opening
          ? { x: left ? "-103%" : "103%", scaleX: 0.94, rotateY: left ? 7 : -7 }
          : { x: "0%", scaleX: 1, rotateY: 0 }}
        transition={opening
          ? { duration: 2.35, delay: left ? 0 : 0.12, ease: [0.76, 0, 0.18, 1] }
          : { duration: 0 }}
      >
        <picture className="absolute inset-0 block h-full w-full">
          <source media="(max-width: 767px)" srcSet={mobile} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={desktop} alt="" draggable={false} className="h-full w-full select-none object-fill" />
        </picture>
        <motion.div
          className={`pointer-events-none absolute inset-y-0 w-12 ${left ? "right-0 bg-gradient-to-l" : "left-0 bg-gradient-to-r"} from-[#6d3340]/30 to-transparent`}
          animate={{ opacity: opening ? 1 : 0 }}
          transition={{ duration: 0.7 }}
        />
      </motion.div>
    );
  };

  return (
    <div className="fixed inset-0 z-[80] overflow-hidden bg-[#f2d0d0]" style={{ height: "100dvh", pointerEvents: opening ? "none" : "auto" }}>
      {panel(true)}
      {panel(false)}

      <motion.button
        type="button"
        onClick={() => go()}
        aria-label="Tap to open Ansharah and Azhar's wedding invitation"
        className="curtain-plaque-hit absolute left-1/2 z-20 -translate-x-1/2 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#b69a59]"
        animate={{ opacity: phase === "closed" || phase === "press" ? 1 : 0, scale: phase === "press" ? 0.94 : 1, y: phase === "press" ? 5 : 0 }}
        transition={{ duration: 0.32, ease: "easeOut" }}
      >
        <span className="sr-only">Tap to open</span>
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-full"
          animate={{ opacity: phase === "press" ? 0.95 : [0.22, 0.5, 0.22], scale: phase === "press" ? 1.08 : [0.98, 1.04, 0.98] }}
          transition={phase === "press" ? { duration: 0.25 } : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ boxShadow: "0 0 34px 12px rgba(255,231,176,.58), inset 0 0 24px rgba(255,249,228,.32)" }}
        />
        {phase === "press" && SPARKS.map((spark, i) => (
          <motion.span
            key={i}
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-2 w-2 rotate-45 rounded-[1px] bg-gradient-to-br from-[#fff8d9] to-[#b58b3e]"
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1.25, 0], x: Math.cos(spark.a) * spark.d * 2.1, y: Math.sin(spark.a) * spark.d * 1.35 }}
            transition={{ duration: 0.85, delay: i * 0.018, ease: "easeOut" }}
          />
        ))}
      </motion.button>

      <motion.button
        type="button"
        onClick={() => go(true)}
        animate={{ opacity: phase === "closed" ? 1 : 0 }}
        className="absolute bottom-[3.5%] left-1/2 z-30 -translate-x-1/2 border-b border-[#9d7650]/65 px-3 py-2 font-display text-[10px] uppercase tracking-[.34em] text-[#70434b] [text-shadow:0_1px_5px_rgba(255,248,240,.9)] sm:text-xs"
      >
        Skip intro
      </motion.button>
    </div>
  );
}
