"use client";

/**
 * HamburgerIcon Component
 * 
 * CK-style animated hamburger icon that morphs between 2 lines and X.
 * Uses CSS classes for transforms (Next.js 16 best practice - CSS over JS).
 * 
 * Features:
 * - 2-line design (modern, minimal)
 * - Smooth morph to X on open using CSS classes
 * - Respects reduced motion preferences
 * - Accessible (used within button with aria-label)
 */

interface HamburgerIconProps {
    /** Whether the menu is open (shows X) or closed (shows lines) */
    isOpen: boolean;
    /** Additional CSS classes */
    className?: string;
}

export default function HamburgerIcon({ isOpen, className = "" }: HamburgerIconProps) {
    return (
        <div
            className={`relative w-6 h-6 flex flex-col items-center justify-center ${className}`}
            aria-hidden="true"
        >
            {/* Top line - rotates to form top half of X */}
            <span
                className={`absolute h-hamburger-line w-5 bg-current transition-all-elegant ease-elegant ${isOpen ? "hamburger-line-top-open" : "hamburger-line-top"
                    }`}
            />
            {/* Bottom line - rotates to form bottom half of X */}
            <span
                className={`absolute h-hamburger-line w-5 bg-current transition-all-elegant ease-elegant ${isOpen ? "hamburger-line-bottom-open" : "hamburger-line-bottom"
                    }`}
            />
        </div>
    );
}
