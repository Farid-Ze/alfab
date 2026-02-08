/**
 * MaintenancePage - Content placeholder
 * 
 * Features:
 * - Responsive Container Layout
 * - Brand Logo
 * - "Under Maintenance" Message
 * - Spring Animations
 */
"use client";

import { motion } from "framer-motion";

export function MaintenancePage() {
    return (
        <div
            style={{
                minHeight: "60vh",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                color: "var(--text-primary)",
                padding: "4rem 2rem",
                borderRadius: "var(--radius-lg)",
                margin: "2rem 0",
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    delay: 0.2
                }}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1.5rem",
                    textAlign: "center",
                }}
            >
                {/* Logo */}
                <div
                    style={{
                        padding: "1rem",
                        background: "rgba(255,255,255,0.5)",
                        backdropFilter: "blur(12px)",
                        borderRadius: "1rem",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
                    }}
                >
                    <span
                        style={{
                            fontSize: "2.5rem",
                            fontWeight: 800,
                            letterSpacing: "-0.025em",
                            background: "linear-gradient(to right, #1a1a1a, #4a4a4a)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        ALFA BEAUTY
                    </span>
                </div>

                {/* Status */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    <h1
                        style={{
                            fontSize: "1.5rem",
                            fontWeight: 600,
                            marginBottom: "0.5rem",
                            color: "#333"
                        }}
                    >
                        Under Maintenance
                    </h1>
                    <p style={{ color: "#666", maxWidth: "400px", lineHeight: 1.6 }}>
                        We are currently upgrading our digital experience to serve you better.
                        Please check back soon.
                    </p>
                </motion.div>

                {/* Loading Indicator / Decoration */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        backgroundColor: "#333",
                        marginTop: "2rem"
                    }}
                />
            </motion.div>
        </div>
    );
}
