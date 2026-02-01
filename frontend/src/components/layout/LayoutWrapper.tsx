"use client";

import LenisProvider from "@/components/ui/LenisProvider";
import HeaderNav from "@/components/navigation/HeaderNav";
import WhatsAppCTA from "@/components/cta/WhatsAppCTA";
import Preloader from "@/components/layout/Preloader";
import SkipLink from "@/components/a11y/SkipLink";
import FocusManager from "@/components/a11y/FocusManager";
import { ReducedMotionProvider } from "@/components/a11y/ReducedMotionProvider";
import BackToTop from "@/components/ui/BackToTop";

/**
 * Layout Wrapper
 * - Wraps the locale layout content with shell
 * - Lenis smooth scrolling enabled
 * - Design tokens active
 * - WCAG 2.2 AA accessibility patterns
 */
export default function LayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ReducedMotionProvider>
            <LenisProvider>
                <Preloader />
                <SkipLink />
                <FocusManager />
                <div className="v2-root" data-design-version="2">
                    <HeaderNav />
                    <main id="main-content" tabIndex={-1}>
                        {children}
                    </main>
                    <WhatsAppCTA />
                    <BackToTop />
                </div>
            </LenisProvider>
        </ReducedMotionProvider>
    );
}
