/**
 * ScrollContext — Header scroll state with useReducer
 *
 * Single dispatch replaces separate setState calls.
 * Reducer bails out on unchanged state → React skips re-render.
 * Components that only care about menu state import MenuContext instead.
 *
 * Enterprise features:
 * - scrollProgress (0–100) for scroll progress indicators
 * - Referential equality bailout for zero-cost no-op dispatches
 */
"use client";

import {
    createContext,
    useContext,
    useReducer,
    useMemo,
    type ReactNode,
    type Dispatch,
} from "react";

export type HeaderMode = "full" | "compact" | "hidden";

export interface ScrollState {
    isScrolled: boolean;
    isVisible: boolean;
    headerMode: HeaderMode;
    /** Page scroll progress 0–100 for progress bar indicators */
    scrollProgress: number;
}

export type ScrollAction = {
    type: "SCROLL_UPDATE";
    isScrolled: boolean;
    isVisible: boolean;
    headerMode: HeaderMode;
    scrollProgress: number;
};

function scrollReducer(state: ScrollState, action: ScrollAction): ScrollState {
    if (
        state.isScrolled === action.isScrolled &&
        state.isVisible === action.isVisible &&
        state.headerMode === action.headerMode &&
        state.scrollProgress === action.scrollProgress
    ) {
        return state;
    }
    return {
        isScrolled: action.isScrolled,
        isVisible: action.isVisible,
        headerMode: action.headerMode,
        scrollProgress: action.scrollProgress,
    };
}

const initialState: ScrollState = {
    isScrolled: false,
    isVisible: true,
    headerMode: "full",
    scrollProgress: 0,
};

export interface ScrollContextValue extends ScrollState {
    dispatch: Dispatch<ScrollAction>;
}

const ScrollContext = createContext<ScrollContextValue | null>(null);

/** Subscribe to scroll-driven header state only */
export function useScroll(): ScrollContextValue {
    const ctx = useContext(ScrollContext);
    if (!ctx) throw new Error("useScroll must be used within HeaderProvider");
    return ctx;
}

export function ScrollProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(scrollReducer, initialState);
    const value = useMemo(() => ({ ...state, dispatch }), [state, dispatch]);

    return (
        <ScrollContext.Provider value={value}>
            {children}
        </ScrollContext.Provider>
    );
}
