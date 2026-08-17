interface BreadcrumbItem {
  name: string;
  url?: string;
}

const BASE_URL = "https://www.sevenstarsecurity.com.np";

export const BreadcrumbJsonLd: React.FC<{ items: BreadcrumbItem[] }> = ({
  items,
}) => {
  const itemListElement = items.map((item, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    name: item.name,
    ...(item.url
      ? { item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}` }
      : {}),
  }));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement,
        }),
      }}
    />
  );
};

export { BASE_URL as SITE_BASE_URL };
