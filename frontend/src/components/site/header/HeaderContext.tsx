/**
 * HeaderProvider — Combined provider for scroll + menu contexts
 *
 * Components should import useScroll() or useMenu() directly
 * to subscribe only to the state they need, reducing re-renders.
 */
"use client";

import { type ReactNode } from "react";
import { ScrollProvider } from "./ScrollContext";
import { MenuProvider } from "./MenuContext";

// Re-export types for convenience
export type { HeaderMode, ScrollState, ScrollContextValue } from "./ScrollContext";
export type { MenuContextValue } from "./MenuContext";

export function HeaderProvider({ children }: { children: ReactNode }) {
    return (
        <ScrollProvider>
            <MenuProvider>
                {children}
            </MenuProvider>
        </ScrollProvider>
    );
}

