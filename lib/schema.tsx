import React from "react";
import { CONFIG } from "./config";

// Organization Schema
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": CONFIG.manufacturer,
    "url": CONFIG.domain,
    "logo": `${CONFIG.domain}/favicon.ico`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": CONFIG.supportPhone,
      "contactType": "customer service",
      "email": CONFIG.supportEmail,
      "areaServed": "US",
      "availableLanguage": "en"
    },
    "sameAs": [
      "https://facebook.com",
      "https://instagram.com"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// WebSite Schema
export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": CONFIG.siteName,
    "url": CONFIG.domain,
    "publisher": {
      "@type": "Organization",
      "name": CONFIG.manufacturer
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// FAQ Schema
export function FAQSchema({ faqs = CONFIG.faqs }: { faqs?: Array<{ question: string; answer: string }> }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Product Schema
export function ProductSchema() {
  const lowestPrice = Math.min(...CONFIG.packages.map((p) => p.pricePerBottle));
  const highestPrice = Math.max(...CONFIG.packages.map((p) => p.pricePerBottle));

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": CONFIG.siteName,
    "image": [
      `${CONFIG.domain}/images/joint genesis-image/MAIN HEADING (HERO SECTION)/hero.png`,
    ],
    "description": "Doctor-formulated supplement that targets the root cause of age-related joint decay by supporting synovial fluid and joint lubrication.",
    "brand": {
      "@type": "Brand",
      "name": CONFIG.manufacturer,
    },
    "sku": "JG-SUPP-01",
    "offers": {
      "@type": "AggregateOffer",
      "url": CONFIG.domain,
      "priceCurrency": "USD",
      "lowPrice": lowestPrice,
      "highPrice": highestPrice,
      "offerCount": CONFIG.packages.length,
      "priceValidUntil": "2028-12-31",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": CONFIG.manufacturer,
      },
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "1847",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Sarah M."
        },
        "datePublished": "2026-03-15",
        "reviewBody": "After 3 weeks taking Joint Genesis, my morning knee stiffness is virtually gone. Walking my dog is enjoyable again!",
        "name": "Life changing joint mobility",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Robert K."
        },
        "datePublished": "2026-04-02",
        "reviewBody": "Mobilee really makes a difference. My hands and hips feel lubricated and free of friction.",
        "name": "Great supplement for age 50+",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Dedicated Review Schema
export function ReviewSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "Product",
      "name": CONFIG.siteName,
      "image": `${CONFIG.domain}/images/joint genesis-image/MAIN HEADING (HERO SECTION)/hero.png`,
      "brand": {
        "@type": "Brand",
        "name": CONFIG.manufacturer
      }
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "4.9",
      "bestRating": "5",
      "worstRating": "1"
    },
    "name": "Joint Genesis™ Official Review 2026",
    "author": {
      "@type": "Person",
      "name": CONFIG.creator
    },
    "publisher": {
      "@type": "Organization",
      "name": CONFIG.manufacturer
    },
    "reviewBody": "Comprehensive assessment of Joint Genesis doctor-formulated joint supplement targeting synovial fluid hyaluronan restoration with Mobilee®."
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Breadcrumb Schema
export function BreadcrumbSchema({
  items,
}: {
  items: Array<{ name: string; url: string }>;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${CONFIG.domain}${item.url.startsWith("/") ? item.url : "/" + item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Blog Schema
export function BlogSchema({
  post,
}: {
  post: {
    title: string;
    description: string;
    slug: string;
    publishedAt: string;
    mainImage?: string;
    authorName?: string;
  };
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "image": post.mainImage || `${CONFIG.domain}/images/joint genesis-image/MAIN HEADING (HERO SECTION)/hero.png`,
    "datePublished": post.publishedAt,
    "dateModified": post.publishedAt,
    "inLanguage": "en-US",
    "author": {
      "@type": "Person",
      "name": post.authorName || CONFIG.creator,
    },
    "publisher": {
      "@type": "Organization",
      "name": CONFIG.manufacturer,
      "logo": {
        "@type": "ImageObject",
        "url": `${CONFIG.domain}/favicon.ico`,
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${CONFIG.domain}/blog/${post.slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// WebPage Schema
export function WebPageSchema({ name, description, url }: { name: string; description: string; url: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": name,
    "description": description,
    "url": `${CONFIG.domain}${url}`,
    "inLanguage": "en-US",
    "isPartOf": {
      "@type": "WebSite",
      "name": CONFIG.siteName,
      "url": CONFIG.domain
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
