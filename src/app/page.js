"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import RosePetalCanvas from "@/components/RosePetalCanvas";
import GlassPanels from "@/components/GlassPanels";

/* ── Headline lines ── */
const headlineLines = [
  "You don\u2019t have to hold",
  "everything together here.",
];
const closerLines = [
  "You\u2019ve carried enough.",
  "Let this be lighter.",
];

/* ── Word animation variant ── */
const wordVariant = {
  hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
  visible: (d) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { delay: d, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeVariant = {
  hidden: { opacity: 0, y: 14 },
  visible: (d) => ({
    opacity: 1, y: 0,
    transition: { delay: d, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};



export default function Home() {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);
  const [ripple, setRipple] = useState(null);

  const handleCTA = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setTimeout(() => setRipple(null), 600);
    setIsExiting(true);
    setTimeout(() => router.push("/mood"), 650);
  };

  /* ── Build word delays ── */
  let t = 0.8;
  const mainDelays = headlineLines.map((line) =>
    line.split(" ").map(() => { const d = t; t += 0.07; return d; })
  );
  const closerDelay = t + 0.3;

  return (
    <AnimatePresence mode="wait">
      {!isExiting ? (
        <motion.div
          key="landing"
          className="landing-hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Slow cinematic zoom on the whole hero */}
          <motion.div
            className="landing-zoom-layer"
            initial={{ scale: 1 }}
            animate={{ scale: 1.02 }}
            transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          >
            <div className="landing-gradient" />
          </motion.div>

          <div className="landing-grain" />
          <div className="landing-vignette" />

          {/* Radial glow behind headline */}
          <motion.div
            className="landing-glow"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          />

          <GlassPanels />
          <RosePetalCanvas fadeOut={isExiting} startDelay={1500} />

          {/* ── Content ── */}
          <div className="landing-content">
            {/* ── Main headline: word-by-word ── */}
            <div className="landing-headline">
              {headlineLines.map((line, li) => (
                <div key={li} className="landing-headline-line">
                  {line.split(" ").map((word, wi) => (
                    <motion.span
                      key={wi}
                      className="landing-word"
                      custom={mainDelays[li][wi]}
                      initial="hidden"
                      animate="visible"
                      variants={wordVariant}
                    >
                      {word}
                    </motion.span>
                  ))}
                </div>
              ))}
            </div>

            {/* ── Closer lines: softer, italic ── */}
            <motion.div
              className="landing-closer"
              custom={closerDelay}
              initial="hidden"
              animate="visible"
              variants={fadeVariant}
            >
              {closerLines.map((line, i) => (
                <div key={i} className="landing-closer-line">{line}</div>
              ))}
            </motion.div>

            {/* Brand mark */}
            <motion.div
              className="brand-mark"
              custom={closerDelay + 0.5}
              initial="hidden"
              animate="visible"
              variants={fadeVariant}
            >
              <svg width="26" height="26" viewBox="0 0 100 100" fill="none"
                xmlns="http://www.w3.org/2000/svg" className="brand-rose-icon">
                <path d="M50 15C50 15 35 25 30 40C25 55 35 70 50 75C65 70 75 55 70 40C65 25 50 15 50 15Z"
                  stroke="rgba(255,255,255,0.8)" strokeWidth="2" fill="none" />
                <path d="M50 30C50 30 42 38 40 48C38 58 44 65 50 68C56 65 62 58 60 48C58 38 50 30 50 30Z"
                  stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" fill="none" />
                <path d="M50 42C50 42 46 47 45 52C44 57 47 60 50 62C53 60 56 57 55 52C54 47 50 42 50 42Z"
                  stroke="rgba(255,255,255,0.35)" strokeWidth="1" fill="none" />
                <line x1="50" y1="75" x2="50" y2="92" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
                <path d="M50 82C50 82 42 78 38 82" stroke="rgba(255,255,255,0.35)" strokeWidth="1" fill="none" />
              </svg>
              <span className="brand-text">Quiet Mode</span>
            </motion.div>

            {/* CTA */}
            <motion.button
              className="glass-cta"
              custom={closerDelay + 0.7}
              initial="hidden"
              animate="visible"
              variants={fadeVariant}
              onClick={handleCTA}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="cta-shimmer" />
              Begin Your Journey
              {ripple && (
                <span className="cta-ripple" style={{ left: ripple.x, top: ripple.y }} />
              )}
            </motion.button>
          </div>


        </motion.div>
      ) : (
        <motion.div
          key="exit"
          className="landing-hero"
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="landing-gradient" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
