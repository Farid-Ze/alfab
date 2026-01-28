import { Inter, Instrument_Serif } from "next/font/google";

export const fontSans = Inter({
    subsets: ["latin"],
    variable: "--font-body",
    display: "swap",
});

export const fontSerif = Instrument_Serif({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-display",
    display: "swap",
});
