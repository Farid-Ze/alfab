"use client";

import { ReactNode } from "react";

/**
 * Root Providers
 * 
 * Wraps the application with all necessary context providers.
 * Add new providers here as the application grows.
 */

interface ProvidersProps {
    children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    return (
        <>
            {/* Add providers here as needed */}
            {/* <ThemeProvider> */}
            {/* <ToastProvider> */}
            {children}
            {/* </ToastProvider> */}
            {/* </ThemeProvider> */}
        </>
    );
}

export default Providers;
