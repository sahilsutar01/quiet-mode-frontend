"use client";

import PageWrapper from "@/components/PageWrapper";
import { motion } from "framer-motion";

export default function HiddenPage() {
    return (
        <PageWrapper>
            <div
                style={{
                    paddingTop: "3rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "60vh",
                }}
            >
                <motion.div
                    className="soft-card"
                    style={{
                        maxWidth: "360px",
                        textAlign: "center",
                        padding: "2.5rem 2rem",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <motion.p
                        style={{
                            fontSize: "0.78rem",
                            color: "rgba(46, 46, 46, 0.35)",
                            marginBottom: "1.75rem",
                            fontStyle: "italic",
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        This isn&apos;t a confession.
                        <br />
                        Just something small I&apos;ve noticed.
                    </motion.p>

                    <motion.div
                        style={{
                            fontSize: "0.92rem",
                            lineHeight: 1.9,
                            color: "var(--charcoal)",
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                    >
                        <p style={{ marginBottom: "1rem" }}>
                            You carry yourself like someone who&apos;s learned a lot without
                            talking about it.
                        </p>
                        <p style={{ marginBottom: "1rem" }}>
                            You don&apos;t ask for attention, but you leave an impression
                            anyway.
                        </p>
                        <p>
                            That quiet strength?{" "}
                            <span style={{ fontWeight: 500 }}>It&apos;s rare.</span>
                        </p>
                    </motion.div>
                </motion.div>

                <motion.p
                    style={{
                        fontSize: "0.72rem",
                        color: "rgba(46, 46, 46, 0.2)",
                        marginTop: "2.5rem",
                        textAlign: "center",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6, duration: 0.6 }}
                >
                    No pressure. No expectations. Just words.
                </motion.p>
            </div>
        </PageWrapper>
    );
}
