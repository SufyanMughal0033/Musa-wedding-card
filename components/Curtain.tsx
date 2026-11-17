
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { assets } from "@/config/site";

const SPARKS = Array.from({ length: 18 }, (_, i) => ({
  a: (i / 18) * Math.PI * 2,
  d: 38 + (i % 4) * 17,
}));

type Phase = "closed" | "press" | "opening" | "done";

export default function Curtain({
  onOpen,
  onReveal,
}: {
  onOpen: () => void;
  onReveal: () => void;
}) {
  const reduce = useReducedMotion();

  const [phase, setPhase] = useState<Phase>("closed");
  const phaseRef = useRef<Phase>("closed");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const updatePhase = (next: Phase) => {
    phaseRef.current = next;
    setPhase(next);
  };

  useEffect(() => {
    return () => {
      timers.current.forEach(clearTimeout);
    };
  }, []);

  const go = (skip = false) => {
    if (phaseRef.current !== "closed") return;

    timers.current.forEach(clearTimeout);
    timers.current = [];

    onOpen();

    if (skip || reduce) {
      updatePhase("done");
      onReveal();
      return;
    }

    updatePhase("press");

    timers.current.push(
      setTimeout(() => {
        updatePhase("opening");
      }, 650)
    );

    timers.current.push(
      setTimeout(() => {
        onReveal();
      }, 3100)
    );

    timers.current.push(
      setTimeout(() => {
        updatePhase("done");
      }, 3400)
    );
  };

  if (phase === "done") return null;

  const opening = phase === "opening";

  const panel = (left: boolean) => {
    const desktop = left
      ? assets.curtainLeftDesktop
      : assets.curtainRightDesktop;

    const mobile = left
      ? assets.curtainLeftMobile
      : assets.curtainRightMobile;

    return (
      <motion.div
        key={left ? "left-curtain" : "right-curtain"}
        aria-hidden="true"
        className={`curtain-panel pointer-events-none absolute inset-y-0 z-10 w-1/2 overflow-hidden ${
          left ? "left-0" : "right-0"
        }`}
        style={{
          transformOrigin: left ? "left center" : "right center",
          willChange: "transform",
        }}
        initial={false}
        animate={
          opening
            ? {
                x: left ? "-103%" : "103%",
                scaleX: 0.94,
                rotateY: left ? 7 : -7,
              }
            : {
                x: "0%",
                scaleX: 1,
                rotateY: 0,
              }
        }
        transition={
          opening
            ? {
                duration: 2.35,
                delay: left ? 0 : 0.12,
                ease: [0.76, 0, 0.18, 1],
              }
            : { duration: 0 }
        }
      >
        <picture className="absolute inset-0 block h-full w-full">
          <source media="(max-width: 767px)" srcSet={mobile} />

          <img
            src={desktop}
            alt=""
            draggable={false}
            className="h-full w-full select-none object-fill"
          />
        </picture>

        <motion.div
          className={`pointer-events-none absolute inset-y-0 w-12 ${
            left
              ? "right-0 bg-gradient-to-l"
              : "left-0 bg-gradient-to-r"
          } from-[#6d3340]/30 to-transparent`}
          animate={{ opacity: opening ? 1 : 0 }}
          transition={{ duration: 0.7 }}
        />
      </motion.div>
    );
  };

  return (
    <div
      className="fixed inset-0 z-[80] overflow-hidden bg-[#f2d0d0]"
      style={{
        height: "100dvh",
        minHeight: "100dvh",
        pointerEvents: opening ? "none" : "auto",
      }}
    >
      {/* CURTAIN PANELS */}
      {panel(true)}
      {panel(false)}

      {/* TAP TO OPEN */}
      <motion.button
        type="button"
        onClick={() => go(false)}
        disabled={phase !== "closed"}
        aria-label="Open wedding invitation"
        className="absolute left-1/2 top-[39%] z-[90] h-[28%] w-[min(42vw,560px)] cursor-pointer rounded-full bg-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b69a59] max-md:w-[88vw]"
        style={{
          pointerEvents: phase === "closed" ? "auto" : "none",
          WebkitTapHighlightColor: "transparent",
        }}
        animate={{
          x: "-50%",
          y: phase === "press" ? 5 : 0,
          scale: phase === "press" ? 0.94 : 1,
          opacity:
            phase === "closed" || phase === "press" ? 1 : 0,
        }}
        transition={{
          duration: 0.32,
          ease: "easeOut",
        }}
      >
        <span className="sr-only">Tap to open invitation</span>

        {/* GOLDEN GLOW */}
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full"
          animate={{
            opacity:
              phase === "press" ? 0.95 : [0.22, 0.5, 0.22],
            scale:
              phase === "press" ? 1.08 : [0.98, 1.04, 0.98],
          }}
          transition={
            phase === "press"
              ? { duration: 0.25 }
              : {
                  duration: 3.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
          style={{
            boxShadow:
              "0 0 34px 12px rgba(255,231,176,.58), inset 0 0 24px rgba(255,249,228,.32)",
          }}
        />

        {/* SPARKS */}
        {phase === "press" &&
          SPARKS.map((spark, i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-2 w-2 rotate-45 rounded-[1px] bg-gradient-to-br from-[#fff8d9] to-[#b58b3e]"
              initial={{
                opacity: 0,
                scale: 0,
                x: 0,
                y: 0,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.25, 0],
                x: Math.cos(spark.a) * spark.d * 2.1,
                y: Math.sin(spark.a) * spark.d * 1.35,
              }}
              transition={{
                duration: 0.85,
                delay: i * 0.018,
                ease: "easeOut",
              }}
            />
          ))}
      </motion.button>

      {/* SKIP INTRO */}
      <motion.button
        type="button"
        onClick={() => go(true)}
        disabled={phase !== "closed"}
        aria-label="Skip introduction"
        className="absolute bottom-[3.5%] left-1/2 z-[100] cursor-pointer border-b border-[#9d7650]/65 px-3 py-2 font-display text-[10px] uppercase tracking-[.34em] text-[#70434b] [text-shadow:0_1px_5px_rgba(255,248,240,.9)] transition-colors hover:text-[#a77b42] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#b69a59] sm:text-xs"
        style={{
          pointerEvents: phase === "closed" ? "auto" : "none",
          WebkitTapHighlightColor: "transparent",
        }}
        animate={{
          x: "-50%",
          opacity: phase === "closed" ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        Skip intro
      </motion.button>
    </div>
  );
}
