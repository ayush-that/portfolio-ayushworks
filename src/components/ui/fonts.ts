import { Geist, Geist_Mono, Inter } from "next/font/google";
import localFont from "next/font/local";

export const fontSans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const fontGeist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-geist",
  display: "swap",
});

export const fontMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const fontSoehne = localFont({
  src: [
    { path: "../../assets/fonts/soehne/Sohne-Leicht.otf", weight: "300", style: "normal" },
    { path: "../../assets/fonts/soehne/Sohne-Buch.otf", weight: "400", style: "normal" },
    { path: "../../assets/fonts/soehne/Sohne-Kraftig.otf", weight: "500", style: "normal" },
    { path: "../../assets/fonts/soehne/Sohne-Halbfett.otf", weight: "600", style: "normal" },
    { path: "../../assets/fonts/soehne/Sohne-Dreiviertelfett.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-soehne",
  display: "swap",
});

export const fontSerif = localFont({
  src: [
    { path: "../../assets/fonts/pp-neue-montreal/ppneuemontreal-thin.woff", weight: "300", style: "normal" },
    { path: "../../assets/fonts/pp-neue-montreal/ppneuemontreal-book.woff", weight: "400", style: "normal" },
    { path: "../../assets/fonts/pp-neue-montreal/ppneuemontreal-italic.woff", weight: "400", style: "italic" },
    { path: "../../assets/fonts/pp-neue-montreal/ppneuemontreal-medium.woff", weight: "500", style: "normal" },
    { path: "../../assets/fonts/pp-neue-montreal/ppneuemontreal-bold.woff", weight: "700", style: "normal" },
    { path: "../../assets/fonts/pp-neue-montreal/ppneuemontreal-semibolditalic.woff", weight: "600", style: "italic" },
  ],
  variable: "--font-pp-neue-montreal",
  display: "swap",
});
