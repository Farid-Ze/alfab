/**
 * Header Context - Shared state for header components
 * 
 * Provides state management for:
 * - Active mega menu
 * - Mobile nav open/close
 * - Scroll state & direction (Smart Header)
 */
"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export interface HeaderContextValue {
    /** Currently active mega menu ID, null if none */
    activeMenu: string | null;
    /** Set active mega menu */
    setActiveMenu: (id: string | null) => void;
    /** Whether mobile nav is open */
    isMobileOpen: boolean;
    /** Open/close mobile nav */
    setMobileOpen: (open: boolean) => void;
    /** Whether page has been scrolled beyond threshold */
    isScrolled: boolean;
    /** Set scroll state */
    setScrolled: (scrolled: boolean) => void;
    /** Whether header should be visible (Smart Sticky) */
    isVisible: boolean;
    /** Set visibility */
    setVisible: (visible: boolean) => void;
}

const HeaderContext = createContext<HeaderContextValue | null>(null);

/**
 * Hook to access header context
 * @throws If used outside HeaderProvider
 */
export function useHeader(): HeaderContextValue {
    const context = useContext(HeaderContext);
    if (!context) {
        throw new Error("useHeader must be used within HeaderProvider");
    }
    return context;
}

interface HeaderProviderProps {
    children: ReactNode;
}

/**
 * Header Provider - Wraps header components with shared state
 */
export function HeaderProvider({ children }: HeaderProviderProps) {
    const [activeMenu, setActiveMenuState] = useState<string | null>(null);
    const [isMobileOpen, setMobileOpenState] = useState(false);
    const [isScrolled, setScrolledState] = useState(false);
    const [isVisible, setVisibleState] = useState(true);

    const setActiveMenu = useCallback((id: string | null) => {
        setActiveMenuState(id);
    }, []);

    const setMobileOpen = useCallback((open: boolean) => {
        setMobileOpenState(open);
        // Lock body scroll when mobile nav is open
        if (typeof document !== "undefined") {
            document.body.style.overflow = open ? "hidden" : "";
        }
    }, []);

    const setScrolled = useCallback((scrolled: boolean) => {
        setScrolledState(scrolled);
    }, []);

    const setVisible = useCallback((visible: boolean) => {
        setVisibleState(visible);
    }, []);

    return (
        <HeaderContext.Provider
            value={{
                activeMenu,
                setActiveMenu,
                isMobileOpen,
                setMobileOpen,
                isScrolled,
                setScrolled,
                isVisible,
                setVisible,
            }}
        >
            {children}
        </HeaderContext.Provider>
    );
}
