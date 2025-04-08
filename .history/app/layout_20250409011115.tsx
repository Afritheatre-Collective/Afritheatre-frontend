import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import MainHeader from "@/components/Headers/MainHeader";
import InfoNav from "@/components/Headers/InfoNav";
import FooterSection from "@/components/Footer/FooterSection";
import { headers } from "next/headers";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const pathname = headersList.get("x-next-pathname") || "";

  // List of paths where header/footer should be hidden
  const hideHeaderFooterPaths = [
    "/signup",
    "/login",
    "/reset-password",
    // Add other auth routes here
  ];

  const shouldHideHeaderFooter = hideHeaderFooterPaths.some((path) =>
    pathname.startsWith(path)
  );

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
