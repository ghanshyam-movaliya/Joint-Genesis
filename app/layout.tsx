import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/SessionProvider";
import { getSettings } from "@/lib/settingsService";
import { WebsiteSettingsProvider } from "@/lib/settingsContext";
import { OrganizationSchema, WebSiteSchema } from "@/lib/schema";
import Analytics from "@/components/Analytics";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const baseUrl = settings.websiteUrl || "https://en-jointgenesis.com";
  
  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: settings.defaultTitle || "Joint Genesis™ Official Site | Advanced Joint Health Supplement",
      template: `%s | ${settings.websiteName || "Joint Genesis™"}`,
    },
    description: settings.defaultDescription || "Discover Joint Genesis™ by BioDynamix. Doctor-formulated joint health supplement designed to restore synovial fluid, improve flexibility, and support joint mobility.",
    keywords: settings.defaultKeywords || [
      "Joint Genesis",
      "BioDynamix Joint Genesis",
      "joint health supplement",
      "joint lubrication",
      "synovial fluid support",
      "joint pain relief",
      "Mobilee hyaluronic acid",
      "joint flexibility supplement",
      "Joint Genesis reviews"
    ],
    authors: [{ name: settings.defaultAuthor || "BioDynamix" }],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title: settings.defaultTitle || "Joint Genesis™ | Support Rejuvenated Joint Comfort & Mobility",
      description: settings.defaultDescription || "Discover Joint Genesis™, the doctor-formulated supplement that targets the root cause of age-related joint stiffness by supporting healthy synovial fluid.",
      type: "website",
      locale: "en_US",
      url: baseUrl,
      siteName: settings.websiteName || "Joint Genesis™",
      images: [
        {
          url: `${baseUrl}/images/joint genesis-image/MAIN HEADING (HERO SECTION)/hero.png`,
          width: 1200,
          height: 630,
          alt: "Joint Genesis Supplement Bottle Mockup",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: settings.defaultTitle || "Joint Genesis™ | Rejuvenate Your Joint Health",
      description: settings.defaultDescription || "Doctor-formulated joint health supplement targeting synovial fluid support.",
      images: [`${baseUrl}/images/joint genesis-image/MAIN HEADING (HERO SECTION)/hero.png`],
    },
    verification: {
      google: settings.googleVerification || process.env.NEXT_PUBLIC_GSC_VERIFICATION || undefined,
      other: (settings.bingVerification || process.env.NEXT_PUBLIC_BING_VERIFICATION) ? {
        'msvalidate.01': [settings.bingVerification || process.env.NEXT_PUBLIC_BING_VERIFICATION || ""],
      } : undefined,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  return (
    <html
      lang="en-US"
      className={`${outfit.variable} ${inter.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <OrganizationSchema />
        <WebSiteSchema />
        <Analytics gaId={process.env.NEXT_PUBLIC_GA_ID} clarityId={process.env.NEXT_PUBLIC_CLARITY_ID} />
      </head>
      <body className="font-sans min-h-full flex flex-col text-brand-navy-900 bg-brand-navy-50">
        <SessionProvider>
          <WebsiteSettingsProvider affiliateLink={settings.affiliateLink}>
            {children}
          </WebsiteSettingsProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
