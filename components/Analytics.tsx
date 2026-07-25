"use client";

import Script from "next/script";

interface AnalyticsProps {
  gaId?: string;
  clarityId?: string;
}

export default function Analytics({ gaId, clarityId }: AnalyticsProps) {
  const finalGaId = gaId || process.env.NEXT_PUBLIC_GA_ID;
  const finalClarityId = clarityId || process.env.NEXT_PUBLIC_CLARITY_ID;

  return (
    <>
      {/* Google Analytics 4 */}
      {finalGaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${finalGaId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${finalGaId}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}

      {/* Microsoft Clarity */}
      {finalClarityId && (
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${finalClarityId}");
          `}
        </Script>
      )}
    </>
  );
}
