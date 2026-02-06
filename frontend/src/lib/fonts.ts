/**
 * Font Configuration
 * 
 * Uses next/font/local for optimal font loading:
 * - Auto self-hosting (no external requests)
 * - Zero layout shift (CLS = 0)
 * - Automatic font-display: swap
 * - CSS variable generation
 */

import localFont from 'next/font/local'

export const montserrat = localFont({
    src: '../styles/fonts/Montserrat-Variable.ttf',
    variable: '--font-montserrat',
    display: 'swap',
    weight: '100 900',
    preload: true,
})

// Aliases for layout.tsx compatibility
export const fontSans = montserrat
export const fontSerif = montserrat // Using same font until brand serif is provided

// Export combined font variables
export const fontVariables = montserrat.variable
