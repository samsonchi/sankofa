import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FollowLinkedin } from "@/components/follow-linkedin";
import { CustomCursor } from "@/components/custom-cursor";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sankofa.org"),
  title: {
    default: "Sankofa — Community-led STREAM education",
    template: "%s · Sankofa",
  },
  description:
    "Sankofa is a volunteer-led movement bringing STREAM education — Science, Technology, Reading, Engineering, Art and Mathematics — to underserved communities, rooted in local culture and what's at hand.",
  openGraph: {
    title: "Sankofa — Community-led STREAM education",
    description:
      "Quality learning in under-resourced communities, rooted in daily life, culture and community.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-on-primary"
        >
          Skip to main content
        </a>
        <CustomCursor />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
          <FollowLinkedin />
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
