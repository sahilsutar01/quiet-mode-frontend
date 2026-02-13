"use client";

import { useEffect, useRef, useCallback } from "react";

/*  ── Petal shape with depth-of-field ─────────────────────── */
function drawPetal(ctx, x, y, size, rotation, opacity, depth) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = opacity;

    // Depth-of-field: larger/closer petals get more blur via shadow
    const blur = depth > 0.6 ? (depth - 0.6) * 20 : 0;
    if (blur > 0) {
        ctx.shadowColor = `rgba(210, 160, 175, ${opacity * 0.5})`;
        ctx.shadowBlur = blur;
    }

    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
    grad.addColorStop(0, "rgba(225, 175, 185, 0.9)");
    grad.addColorStop(0.4, "rgba(210, 160, 172, 0.7)");
    grad.addColorStop(1, "rgba(190, 140, 155, 0.15)");
    ctx.fillStyle = grad;

    // Organic petal bezier
    ctx.beginPath();
    ctx.moveTo(0, -size * 0.5);
    ctx.bezierCurveTo(size * 0.38, -size * 0.48, size * 0.48, -size * 0.08, size * 0.14, size * 0.4);
    ctx.bezierCurveTo(size * 0.05, size * 0.52, -size * 0.05, size * 0.52, -size * 0.14, size * 0.4);
    ctx.bezierCurveTo(-size * 0.48, -size * 0.08, -size * 0.38, -size * 0.48, 0, -size * 0.5);
    ctx.closePath();
    ctx.fill();

    // Inner vein highlight
    ctx.globalAlpha = opacity * 0.15;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(0, -size * 0.35);
    ctx.quadraticCurveTo(size * 0.05, 0, 0, size * 0.3);
    ctx.stroke();

    ctx.restore();
}

function createPetal(w, h, isMobile) {
    const depth = 0.2 + Math.random() * 0.8; // 0.2 = far/small, 1.0 = close/large
    const baseSize = isMobile ? 16 : 22;
    const size = baseSize + depth * (isMobile ? 22 : 35);
    return {
        x: Math.random() * w,
        y: -size - Math.random() * h * 0.3,
        size,
        depth,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.006,
        vy: 0.12 + depth * 0.25,                 // closer = slightly faster
        vx: (Math.random() - 0.5) * 0.25,
        swayAmp: 15 + Math.random() * 30,
        swayFreq: 0.002 + Math.random() * 0.004,
        swayOff: Math.random() * Math.PI * 2,
        opacity: 0,
        maxOpacity: 0.3 + depth * 0.35,
        fadeIn: true,
        t: 0,
        // dispersion
        dx: 0,
        dy: 0,
    };
}

export default function RosePetalCanvas({ fadeOut = false, startDelay = 1500 }) {
    const canvasRef = useRef(null);
    const petalsRef = useRef([]);
    const animRef = useRef(null);
    const fadeOutRef = useRef(fadeOut);
    const startedRef = useRef(false);
    const startTimeRef = useRef(null);

    useEffect(() => { fadeOutRef.current = fadeOut; }, [fadeOut]);

    /* ── Tap / click dispersion ── */
    useEffect(() => {
        const handler = (e) => {
            const rect = canvasRef.current?.getBoundingClientRect();
            if (!rect) return;
            const tx = (e.touches?.[0]?.clientX ?? e.clientX);
            const ty = (e.touches?.[0]?.clientY ?? e.clientY);
            for (const p of petalsRef.current) {
                const dist = Math.hypot(p.x - tx, p.y - ty);
                if (dist < 120) {
                    const angle = Math.atan2(p.y - ty, p.x - tx);
                    const force = (1 - dist / 120) * 1.5;
                    p.dx += Math.cos(angle) * force;
                    p.dy += Math.sin(angle) * force;
                }
            }
        };
        window.addEventListener("click", handler);
        window.addEventListener("touchstart", handler, { passive: true });
        return () => {
            window.removeEventListener("click", handler);
            window.removeEventListener("touchstart", handler);
        };
    }, []);

    const animate = useCallback((timestamp) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp;
        const elapsed = timestamp - startTimeRef.current;

        // Delayed start
        if (elapsed < startDelay) {
            animRef.current = requestAnimationFrame(animate);
            return;
        }
        if (!startedRef.current) startedRef.current = true;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);

        const petals = petalsRef.current;
        const isMobile = w < 640;
        const maxPetals = isMobile ? 6 : 12;

        for (let i = petals.length - 1; i >= 0; i--) {
            const p = petals[i];
            p.t++;

            // Movement
            const sway = Math.sin(p.t * p.swayFreq + p.swayOff) * p.swayAmp;
            p.x += p.vx + p.dx;
            p.y += p.vy + p.dy;
            p.rotation += p.rotSpeed;

            // Dampen dispersion
            p.dx *= 0.96;
            p.dy *= 0.96;

            // Fade in
            if (p.fadeIn) {
                p.opacity = Math.min(p.opacity + 0.004, p.maxOpacity);
                if (p.opacity >= p.maxOpacity) p.fadeIn = false;
            }

            // Fade out near bottom
            if (p.y > h * 0.78) p.opacity = Math.max(0, p.opacity - 0.006);
            if (fadeOutRef.current) p.opacity = Math.max(0, p.opacity - 0.015);

            if (p.y > h + p.size || p.opacity <= 0) { petals.splice(i, 1); continue; }

            drawPetal(ctx, p.x + sway, p.y, p.size, p.rotation, p.opacity, p.depth);
        }

        // Spawn
        if (!fadeOutRef.current && petals.length < maxPetals && Math.random() < 0.015) {
            petals.push(createPetal(w, h, isMobile));
        }

        animRef.current = requestAnimationFrame(animate);
    }, [startDelay]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        // Seed a few petals already mid-fall
        const isMobile = window.innerWidth < 640;
        const seed = isMobile ? 2 : 4;
        for (let i = 0; i < seed; i++) {
            const p = createPetal(canvas.width, canvas.height, isMobile);
            p.y = Math.random() * canvas.height * 0.5;
            p.opacity = p.maxOpacity * 0.3;
            petalsRef.current.push(p);
        }

        animRef.current = requestAnimationFrame(animate);
        return () => {
            window.removeEventListener("resize", resize);
            if (animRef.current) cancelAnimationFrame(animRef.current);
        };
    }, [animate]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed", top: 0, left: 0,
                width: "100%", height: "100%",
                pointerEvents: "none", zIndex: 2,
            }}
            aria-hidden="true"
        />
    );
}
