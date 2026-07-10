"use client";

import React, { createContext, useContext } from "react";

interface WebsiteSettingsContextType {
  affiliateLink: string;
}

const WebsiteSettingsContext = createContext<WebsiteSettingsContextType>({
  affiliateLink: "",
});

export function WebsiteSettingsProvider({
  affiliateLink,
  children,
}: {
  affiliateLink: string;
  children: React.ReactNode;
}) {
  return (
    <WebsiteSettingsContext.Provider value={{ affiliateLink }}>
      {children}
    </WebsiteSettingsContext.Provider>
  );
}

export function useWebsiteSettings() {
  return useContext(WebsiteSettingsContext);
}

/**
 * Returns the affiliate URL.
 * Designed to easily append analytics tracking parameters or execute click logging in the future.
 */
export function getAffiliateUrl(affiliateLink: string, trackingParams?: Record<string, string>): string {
  if (!affiliateLink) return "";
  
  try {
    const url = new URL(affiliateLink);
    if (trackingParams) {
      Object.entries(trackingParams).forEach(([key, val]) => {
        url.searchParams.set(key, val);
      });
    }
    return url.toString();
  } catch (e) {
    // Return original string if URL parsing fails (e.g. not a full url path)
    return affiliateLink;
  }
}

/**
 * Reusable hook to obtain the dynamic affiliate URL and its disabled status.
 */
export function useAffiliateUrl(trackingParams?: Record<string, string>) {
  const { affiliateLink } = useWebsiteSettings();
  const url = getAffiliateUrl(affiliateLink, trackingParams);
  const isDisabled = !affiliateLink || affiliateLink.trim() === "";
  
  return {
    affiliateUrl: url,
    isDisabled,
  };
}
