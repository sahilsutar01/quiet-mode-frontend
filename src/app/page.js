"use client";

import Link from "next/link";
import PageWrapper from "@/components/PageWrapper";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function Home() {
  return (
    <PageWrapper>
      <div style={{ paddingTop: "2rem" }}>
        {/* Headline */}
        <motion.h1
          className="page-title"
          style={{ fontSize: "1.65rem", lineHeight: 1.35, marginBottom: "1.5rem" }}
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          You don&apos;t have to hold everything together here.
        </motion.h1>

        {/* Subtext */}
        <motion.div
          className="page-intro"
          style={{ marginBottom: "2.5rem" }}
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <p style={{ marginBottom: "0.75rem" }}>
            There are places where you&apos;re expected to explain yourself, defend your
            silence, or pretend you&apos;re fine.
          </p>
          <p style={{ marginBottom: "0.75rem" }}>This isn&apos;t one of them.</p>
          <p>
            You don&apos;t owe this space strength. Just presence.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <Link href="/mood" style={{ textDecoration: "none" }}>
            <button className="btn-primary" style={{ width: "100%" }}>
              Enter Quiet Mode
            </button>
          </Link>

          <Link href="/roast" style={{ textDecoration: "none" }}>
            <button className="btn-secondary" style={{ width: "100%" }}>
              Roast Mode 🔥
            </button>
          </Link>

          <Link href="/brain-break" style={{ textDecoration: "none" }}>
            <button className="btn-secondary" style={{ width: "100%" }}>
              Brain Break
            </button>
          </Link>
        </motion.div>

        {/* Small footer line */}
        <motion.p
          style={{
            textAlign: "center",
            fontSize: "0.78rem",
            color: "rgba(46, 46, 46, 0.4)",
            marginTop: "3rem",
            lineHeight: 1.6,
            fontStyle: "italic",
          }}
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          Stay for a minute. Leave whenever you want. Nothing is demanded.
        </motion.p>

        {/* Hidden page link */}
        <motion.div
          style={{ textAlign: "center", marginTop: "2rem" }}
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <Link
            href="/hidden"
            style={{
              fontSize: "0.72rem",
              color: "rgba(46, 46, 46, 0.25)",
              textDecoration: "none",
              transition: "color 0.3s ease",
            }}
          >
            Not Important.
          </Link>
        </motion.div>
      </div>
    </PageWrapper>
  );
}
