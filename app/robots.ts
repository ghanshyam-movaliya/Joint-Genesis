import { MetadataRoute } from "next";
import { getSettings } from "@/lib/settingsService";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSettings();
  const baseUrl = settings.websiteUrl || "https://www.jointgeneshis.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
