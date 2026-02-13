"use client";

import { useState, useRef, useEffect } from "react";

/**
 * GlobalAudioPlayer — lives in layout, persists across all pages.
 * Plays /audio/relief.mp3 on loop.
 * Starts on first user click/touch (browser requires interaction).
 * Small mute/unmute toggle bottom-right.
 */
export default function GlobalAudioPlayer() {
    const audioRef = useRef(null);
    const hasStarted = useRef(false);
    const [muted, setMuted] = useState(false);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        // Create audio element once
        const audio = new Audio("/audio/relief.mp3");
        audio.loop = true;
        audio.preload = "auto";
        audio.volume = 0.25; // start at a clearly audible volume
        audioRef.current = audio;

        const tryPlay = () => {
            if (hasStarted.current) return;
            const p = audio.play();
            if (p && p.then) {
                p.then(() => {
                    hasStarted.current = true;
                    setStarted(true);
                    console.log("[Audio] ✅ Playing relief.mp3 at volume", audio.volume);
                }).catch((err) => {
                    console.log("[Audio] ⏳ Waiting for user interaction:", err.message);
                });
            }
        };

        // Try autoplay immediately
        tryPlay();

        // Also listen for user clicks/touches to retry
        const onInteract = () => {
            if (!hasStarted.current) tryPlay();
        };
        document.addEventListener("click", onInteract);
        document.addEventListener("touchstart", onInteract);
        document.addEventListener("keydown", onInteract);

        return () => {
            document.removeEventListener("click", onInteract);
            document.removeEventListener("touchstart", onInteract);
            document.removeEventListener("keydown", onInteract);
            audio.pause();
            audio.src = "";
        };
    }, []); // empty deps — only runs once

    const toggleMute = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (muted) {
            // Unmute: resume playing
            audio.volume = 0.25;
            audio.play().catch(() => { });
            setMuted(false);
        } else {
            // Mute: pause audio
            audio.pause();
            setMuted(true);
        }
    };

    return (
        <button
            onClick={toggleMute}
            aria-label={muted ? "Unmute music" : "Mute music"}
            title={muted ? "Unmute music" : "Mute music"}
            style={{
                position: "fixed",
                bottom: "80px",
                right: "16px",
                zIndex: 9999,
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
                opacity: started ? 1 : 0.5,
                boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
            }}
        >
            {muted ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
            ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
            )}
        </button>
    );
}
