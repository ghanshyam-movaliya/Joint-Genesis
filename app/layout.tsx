import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/SessionProvider";
import { getSettings } from "@/lib/settingsService";
import { WebsiteSettingsProvider } from "@/lib/settingsContext";

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

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  
  return {
    title: {
      default: settings.defaultTitle || "Joint Genesis™ | Support Rejuvenated Joint Comfort & Mobility",
      template: `%s | ${settings.websiteName || "Joint Genesis™"}`,
    },
    description: settings.defaultDescription || "Discover Joint Genesis™, the doctor-formulated supplement that targets the root cause of age-related joint stiffness by supporting healthy synovial fluid.",
    keywords: settings.defaultKeywords || ["Joint Genesis", "BioDynamix", "joint health supplement", "joint lubrication", "synovial fluid", "joint pain relief"],
    authors: [{ name: settings.defaultAuthor || "BioDynamix" }],
    openGraph: {
      title: settings.defaultTitle || "Joint Genesis™ | Support Rejuvenated Joint Comfort & Mobility",
      description: settings.defaultDescription || "Discover Joint Genesis™, the doctor-formulated supplement that targets the root cause of age-related joint stiffness by supporting healthy synovial fluid.",
      type: "website",
      locale: "en_US",
      url: settings.websiteUrl || "https://en-jointgenesis.com",
      siteName: settings.websiteName || "Joint Genesis™",
    },
    twitter: {
      card: "summary_large_image",
      title: settings.defaultTitle || "Joint Genesis™ | Rejuvenate Your Joint Health",
      description: settings.defaultDescription || "Doctor-formulated joint health supplement targeting synovial fluid support.",
    },
    metadataBase: new URL(settings.websiteUrl || "https://en-jointgenesis.com"),
    verification: {
      google: settings.googleVerification || undefined,
      other: settings.bingVerification ? {
        'msvalidate.01': [settings.bingVerification],
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
      lang="en"
      className={`${outfit.variable} ${inter.variable} h-full scroll-smooth antialiased`}
    >
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
