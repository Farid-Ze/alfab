/**
 * Services Experience - Type Definitions
 * 
 * @module types/services.types
 * @description Strict TypeScript types for the Immersive Services Experience section.
 * Uses branded types and discriminated unions for type safety.
 */

// =============================================================================
// Branded Types (Type-safe IDs)
// =============================================================================

/**
 * Branded type for Service IDs
 * Prevents accidental string assignment from non-service sources
 */
export type ServiceId = 'products' | 'education' | 'partnership';

/**
 * Service number display format
 */
export type ServiceNumber = '01' | '02' | '03';

// =============================================================================
// Localization Types
// =============================================================================

/**
 * Supported locales
 */
export type Locale = 'en' | 'id';

/**
 * Localized string with strict type checking
 */
export interface LocalizedString {
    readonly en: string;
    readonly id: string;
}

// =============================================================================
// Video Types
// =============================================================================

/**
 * Video format specifications
 */
export interface ServiceVideo {
    /** WebM format (VP9) - primary, smaller file size */
    readonly webm: string;
    /** MP4 format (H.264) - fallback for Safari */
    readonly mp4: string;
    /** Poster image for initial load and reduced motion */
    readonly poster: string;
    /** Video duration in seconds for progress calculation */
    readonly duration: number;
}

/**
 * Video loading state
 */
export type VideoLoadingState =
    | { status: 'idle' }
    | { status: 'loading' }
    | { status: 'loaded' }
    | { status: 'error'; error: string };

// =============================================================================
// Service Types
// =============================================================================

/**
 * Call-to-action configuration
 */
export interface ServiceCTA {
    readonly label: LocalizedString;
    readonly href: string;
}

/**
 * Complete service definition
 */
export interface Service {
    /** Unique identifier */
    readonly id: ServiceId;
    /** URL-safe slug */
    readonly slug: string;
    /** Display number (01, 02, 03) */
    readonly number: ServiceNumber;
    /** Service name */
    readonly name: LocalizedString;
    /** Short tagline */
    readonly tagline: LocalizedString;
    /** Full description */
    readonly description: LocalizedString;
    /** Call-to-action configuration */
    readonly cta: ServiceCTA;
    /** Video background configuration */
    readonly video: ServiceVideo;
    /** Accent color for gradient fallback (HSL format) */
    readonly accentColor: string;
}

// =============================================================================
// Component Props Types
// =============================================================================

/**
 * Navigation direction for animations
 */
export type NavigationDirection = -1 | 0 | 1;

/**
 * Animation state for orchestration
 */
export type AnimationPhase =
    | 'entering'
    | 'visible'
    | 'exiting';

/**
 * Transition configuration
 */
export interface TransitionConfig {
    readonly duration: number;
    readonly ease: readonly [number, number, number, number];
    readonly delay?: number;
}

/**
 * Services Experience component props
 */
export interface ServicesExperienceProps {
    /** Initial service to display */
    readonly initialService?: ServiceId;
    /** Enable auto-advance between services */
    readonly autoAdvance?: boolean;
    /** Auto-advance interval in milliseconds */
    readonly autoAdvanceInterval?: number;
    /** Callback when service changes */
    readonly onServiceChange?: (service: ServiceId) => void;
}

/**
 * Service content component props
 */
export interface ServiceContentProps {
    readonly service: Service;
    readonly locale: Locale;
    readonly direction: NavigationDirection;
    readonly isReducedMotion: boolean;
}

/**
 * Service navigation props
 */
export interface ServiceNavProps {
    readonly services: readonly Service[];
    readonly activeIndex: number;
    readonly locale: Locale;
    readonly onNavigate: (index: number) => void;
    readonly onPrev: () => void;
    readonly onNext: () => void;
}

/**
 * Video background props
 */
export interface VideoBackgroundProps {
    readonly service: Service;
    readonly isReducedMotion: boolean;
}

// =============================================================================
// Hook Return Types
// =============================================================================

/**
 * Service transition hook return type
 */
export interface UseServiceTransitionReturn {
    readonly activeIndex: number;
    readonly activeService: Service;
    readonly direction: NavigationDirection;
    readonly goToService: (index: number) => void;
    readonly goNext: () => void;
    readonly goPrev: () => void;
    readonly canGoNext: boolean;
    readonly canGoPrev: boolean;
}

/**
 * Video preload hook return type
 */
export interface UseVideoPreloadReturn {
    readonly preloadVideo: (src: string) => void;
    readonly preloadAdjacent: (currentIndex: number) => void;
    readonly isPreloaded: (src: string) => boolean;
}

/**
 * Swipe gesture hook return type
 */
export interface UseSwipeGestureReturn {
    readonly onTouchStart: (e: React.TouchEvent) => void;
    readonly onTouchMove: (e: React.TouchEvent) => void;
    readonly onTouchEnd: (e: React.TouchEvent) => void;
}

/**
 * Auto-advance hook return type
 */
export interface UseAutoAdvanceReturn {
    readonly isPlaying: boolean;
    readonly play: () => void;
    readonly pause: () => void;
    readonly toggle: () => void;
    readonly progress: number;
}
