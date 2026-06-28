import React from "react";
import { CONFIG } from "./config";

// FAQ Schema
export function FAQSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": CONFIG.faqs.map((faq) => ({
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
      `${CONFIG.domain}/hero-bottle.png`,
    ],
    "description": "Doctor-formulated supplement that targets the root cause of age-related joint decay by supporting synovial fluid and joint lubrication.",
    "brand": {
      "@type": "Brand",
      "name": CONFIG.manufacturer,
    },
    "offers": {
      "@type": "AggregateOffer",
      "url": CONFIG.domain,
      "priceCurrency": "USD",
      "lowPrice": lowestPrice,
      "highPrice": highestPrice,
      "offerCount": CONFIG.packages.length,
      "priceValidUntil": "2027-12-31",
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
    },
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
      "item": `${CONFIG.domain}${item.url}`,
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
    "image": post.mainImage || `${CONFIG.domain}/blog-placeholder.jpg`,
    "datePublished": post.publishedAt,
    "dateModified": post.publishedAt,
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
