import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Joint Genesis™ | Support Rejuvenated Joint Comfort & Mobility",
    template: "%s | Joint Genesis™",
  },
  description: "Discover Joint Genesis™, the doctor-formulated supplement that targets the root cause of age-related joint stiffness by supporting healthy synovial fluid.",
  keywords: ["Joint Genesis", "BioDynamix", "joint health supplement", "joint lubrication", "synovial fluid", "joint pain relief"],
  authors: [{ name: "BioDynamix" }],
  openGraph: {
    title: "Joint Genesis™ | Support Rejuvenated Joint Comfort & Mobility",
    description: "Discover Joint Genesis™, the doctor-formulated supplement that targets the root cause of age-related joint stiffness by supporting healthy synovial fluid.",
    type: "website",
    locale: "en_US",
    url: "https://en-jointgenesis.com",
    siteName: "Joint Genesis™",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joint Genesis™ | Rejuvenate Your Joint Health",
    description: "Doctor-formulated joint health supplement targeting synovial fluid support.",
  },
  metadataBase: new URL("https://en-jointgenesis.com"),
};

import SessionProvider from "@/components/SessionProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} h-full scroll-smooth antialiased`}
    >
      <body className="font-sans min-h-full flex flex-col text-brand-navy-900 bg-brand-navy-50">
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
