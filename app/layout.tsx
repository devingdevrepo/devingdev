import type { Metadata } from "next";
import { Lora, Poppins } from "next/font/google";
import "./globals.css";
import { site } from "@/site.config";

const lora = Lora({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-serif" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} | Code, AI and honest takes`,
  description:
    "Short, practical emails about AI and code from Massin, a working software developer. Join the Deving Dev list.",
  openGraph: {
    title: site.name,
    description: "Practical AI tools, real code and honest takes from a working software developer.",
    url: site.url,
    siteName: site.name,
    type: "website",
  },
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${lora.variable} ${poppins.variable}`}>
      <body>{children}</body>
    </html>
  );
}
