import type { Metadata } from "next";
import { IBM_Plex_Serif } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import InfoNav from "@/components/Headers/InfoNav";
import FooterSection from "@/components/Footer/FooterSection";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Headers/Navbar";
import { AuthProvider } from "@/context/authContext";

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-ibm-plex-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? siteConfig.url),
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: "website",
    locale: "en_US",
    url: "https://www.afritheatrecollective.com/",
    siteName: "Afritheatre Collective",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ibmPlexSerif.className} antialiased`}>
        <AuthProvider>
          <InfoNav />
          <Navbar /> {children}
          <Toaster position="bottom-right" />
          <FooterSection />
        </AuthProvider>
      </body>
    </html>
  );
}
