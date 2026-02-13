import "./globals.css";
import { Playfair_Display, Inter, Great_Vibes } from "next/font/google";
import GlobalAudioPlayer from "@/components/GlobalAudioPlayer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
  weight: ["400"],
});

export const metadata = {
  title: "Quiet Mode",
  description:
    "A calm, private space. You don't have to hold everything together here.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${greatVibes.variable}`}>
      <body>
        {children}
        <GlobalAudioPlayer />
      </body>
    </html>
  );
}
