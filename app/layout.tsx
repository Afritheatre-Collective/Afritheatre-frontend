import type { Metadata } from "next";
import { Funnel_Display } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import InfoNav from "@/components/Headers/InfoNav";
import FooterSection from "@/components/Footer/FooterSection";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Headers/Navbar";
import { AuthProvider } from "@/context/authContext";

const funnelDisplay = Funnel_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Adjust weights as needed
  style: ["normal"],
  variable: "--font-funnel-display",
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
      <body className={`${funnelDisplay.className} antialiased`}>
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
