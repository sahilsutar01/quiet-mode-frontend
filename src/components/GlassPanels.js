"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

/* ── 3 depth tiers for glass panels ── */
const panelData = [
    {
        id: 1, tier: "far",
        w: 250, h: 330, mw: 140, mh: 195,
        top: "14%", right: "6%",
        mTop: "16%", mRight: "0%",
        rotate: 12,
        floatDur: "10s", floatDelay: "0s",
        shimmerDelay: "0s",
        blur: 24, opacity: 0.07, borderOpacity: 0.14,
        parallaxFactor: 3,
    },
    {
        id: 2, tier: "mid",
        w: 175, h: 175, mw: 100, mh: 100,
        bottom: "22%", left: "6%",
        mBottom: "26%", mLeft: "2%",
        rotate: -8,
        floatDur: "8s", floatDelay: "-3s",
        shimmerDelay: "-3s",
        blur: 18, opacity: 0.1, borderOpacity: 0.2,
        parallaxFactor: 5,
    },
    {
        id: 3, tier: "near",
        w: 135, h: 195, mw: 80, mh: 120,
        top: "54%", right: "14%",
        mTop: "56%", mRight: "8%",
        rotate: 6,
        floatDur: "7s", floatDelay: "-5s",
        shimmerDelay: "-5.5s",
        blur: 14, opacity: 0.13, borderOpacity: 0.25,
        parallaxFactor: 7,
    },
];

const panelVariant = {
    hidden: { opacity: 0, filter: "blur(16px)", scale: 0.92 },
    visible: (i) => ({
        opacity: 1, filter: "blur(0px)", scale: 1,
        transition: { delay: 1.4 + i * 0.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    }),
};

export default function GlassPanels() {
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);
    const rafRef = useRef(null);
    const targetRef = useRef({ x: 0, y: 0 });
    const currentRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 640);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    useEffect(() => {
        if (isMobile) return;
        const handleMouse = (e) => {
            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;
            targetRef.current = { x: (e.clientX - cx) / cx, y: (e.clientY - cy) / cy };
        };
        const lerp = () => {
            currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.02;
            currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.02;
            setOffset({ ...currentRef.current });
            rafRef.current = requestAnimationFrame(lerp);
        };
        window.addEventListener("mousemove", handleMouse);
        rafRef.current = requestAnimationFrame(lerp);
        return () => {
            window.removeEventListener("mousemove", handleMouse);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [isMobile]);

    return (
        <div style={{
            position: "fixed", top: 0, left: 0,
            width: "100%", height: "100%",
            pointerEvents: "none", zIndex: 1, overflow: "hidden",
        }} aria-hidden="true">
            {panelData.map((p, idx) => {
                const px = isMobile ? 0 : offset.x * p.parallaxFactor;
                const py = isMobile ? 0 : offset.y * (p.parallaxFactor * 0.6);
                const width = isMobile ? p.mw : p.w;
                const height = isMobile ? p.mh : p.h;

                return (
                    <motion.div
                        key={p.id}
                        custom={idx}
                        initial="hidden"
                        animate="visible"
                        variants={panelVariant}
                        className="glass-panel-float"
                        style={{
                            position: "absolute",
                            width, height,
                            top: isMobile ? (p.mTop || "auto") : (p.top || "auto"),
                            bottom: isMobile ? (p.mBottom || "auto") : (p.bottom || "auto"),
                            left: isMobile ? (p.mLeft || "auto") : (p.left || "auto"),
                            right: isMobile ? (p.mRight || "auto") : (p.right || "auto"),
                            transform: `rotate(${p.rotate}deg) translate(${px}px, ${py}px)`,
                            background: `rgba(255, 255, 255, ${p.opacity})`,
                            backdropFilter: `blur(${p.blur}px)`,
                            WebkitBackdropFilter: `blur(${p.blur}px)`,
                            border: `1px solid rgba(255, 255, 255, ${p.borderOpacity})`,
                            borderRadius: 32,
                            boxShadow: `inset 0 1px 0 rgba(255,255,255,${p.borderOpacity * 0.6}), 0 8px 32px rgba(0,0,0,0.05)`,
                            animationDuration: p.floatDur,
                            animationDelay: p.floatDelay,
                            overflow: "hidden",
                        }}
                    >
                        <div className="glass-shimmer" style={{ animationDelay: p.shimmerDelay }} />
                    </motion.div>
                );
            })}
        </div>
    );
}
