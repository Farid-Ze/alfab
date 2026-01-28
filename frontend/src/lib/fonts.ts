import localFont from "next/font/local";

export const fontSans = localFont({
    src: "../styles/fonts/Montserrat-Variable.ttf",
    variable: "--font-body",
    display: "swap",
});

export const fontPrint = localFont({
    src: [
        { path: "../styles/fonts/TTCommons-Regular.otf", weight: "400", style: "normal" },
        { path: "../styles/fonts/TTCommons-Italic.otf", weight: "400", style: "italic" },
        { path: "../styles/fonts/TTCommons-Medium.otf", weight: "500", style: "normal" },
        { path: "../styles/fonts/TTCommons-MediumItalic.otf", weight: "500", style: "italic" },
        { path: "../styles/fonts/TTCommons-SemiBold.otf", weight: "600", style: "normal" },
        { path: "../styles/fonts/TTCommons-SemiBoldItalic.otf", weight: "600", style: "italic" },
        { path: "../styles/fonts/TTCommons-Bold.otf", weight: "700", style: "normal" },
        { path: "../styles/fonts/TTCommons-BoldItalic.otf", weight: "700", style: "italic" },
    ],
    variable: "--font-print",
    display: "swap",
});

// Alias Serif to Sans (Montserrat) as users requested mostly Montserrat for digital.
// We must declare it separately to assign the "--font-display" variable required by globals.css
export const fontSerif = localFont({
    src: "../styles/fonts/Montserrat-Variable.ttf",
    variable: "--font-display",
    display: "swap",
});
