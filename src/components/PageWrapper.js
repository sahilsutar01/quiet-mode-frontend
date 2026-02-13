"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PageWrapper({ children, className = "" }) {
    const pathname = usePathname();
    const showBackButton = pathname !== "/" && pathname !== "/home";

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`app-container ${className}`}
        >
            {showBackButton && (
                <Link href="/home" className="back-button" aria-label="Back to Home">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5" />
                        <path d="M12 19l-7-7 7-7" />
                    </svg>
                </Link>
            )}

            {children}

            <p className="page-footer">
                This space isn&apos;t trying to change you. Just to give you room.
            </p>
        </motion.div>
    );
}
