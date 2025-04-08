import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import MainHeader from "@/components/Headers/MainHeader";
import InfoNav from "@/components/Headers/InfoNav";
import FooterSection from "@/components/Footer/FooterSection";

const lato = Lato({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-lato",
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

// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  // Get the current pathname from the children's props
  const pathname = children.props.childProp.segment;

  const hideHeaderFooterPaths = ["sign-up", "login", "reset-password"];
  const shouldHideHeaderFooter = hideHeaderFooterPaths.includes(pathname);

  return (
    <html lang="en">
      <body className={`${lato.className} antialiased`}>
        {!shouldHideHeaderFooter && (
          <>
            <InfoNav />
            <MainHeader />
          </>
        )}
        {children}
        {!shouldHideHeaderFooter && <FooterSection />}
      </body>
    </html>
  );
}
