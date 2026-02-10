/**
 * MenuContext — Active mega menu & mobile nav state
 *
 * Separated from scroll state so scroll events don't
 * re-render components that only read menu state.
 */
"use client";

import {
    createContext,
    useContext,
    useState,
    useMemo,
    type ReactNode,
} from "react";

export interface MenuContextValue {
    activeMenu: string | null;
    setActiveMenu: (id: string | null) => void;
    isMobileOpen: boolean;
    setMobileOpen: (open: boolean) => void;
}

const MenuContext = createContext<MenuContextValue | null>(null);

/** Subscribe to menu state only */
export function useMenu(): MenuContextValue {
    const ctx = useContext(MenuContext);
    if (!ctx) throw new Error("useMenu must be used within HeaderProvider");
    return ctx;
}

export function MenuProvider({ children }: { children: ReactNode }) {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [isMobileOpen, setMobileOpen] = useState(false);

    const value = useMemo(
        () => ({ activeMenu, setActiveMenu, isMobileOpen, setMobileOpen }),
        [activeMenu, isMobileOpen]
    );

    return (
        <MenuContext.Provider value={value}>
            {children}
        </MenuContext.Provider>
    );
}
