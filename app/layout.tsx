import dynamic from "next/dynamic";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Public_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const FloatingWhatsAppWrapper = dynamic(
  () =>
    import("@/src/components/ui/FloatingWhatsAppWrapper").then(
      (m) => m.FloatingWhatsAppWrapper
    )
);

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sevenstarsecurity.com.np"),
  title: {
    default:
      "Security Guard Services in Nepal | Seven Star Security - 24/7 Guard Company Kathmandu",
    template: "%s | Seven Star Security Services",
  },
  description:
    "Seven Star Security is a trusted security guard company in Nepal offering 24/7 guard services, security guards near you, event security, CCTV surveillance, VIP protection and bank security across Kathmandu and all of Nepal. Get security guard services near me today.",
  keywords: [
    "security guard near me",
    "security guard in Nepal",
    "security guard services Nepal",
    "security company Kathmandu",
    "security guard near me Kathmandu",
    "private security guard Nepal",
    "hire security guard Nepal",
    "security guard services Kathmandu",
    "24/7 security guards Nepal",
    "security company Nepal",
    "event security Nepal",
    "VIP protection Nepal",
    "bank security Nepal",
    "CCTV surveillance Nepal",
    "Seven Star Security",
  ],
  authors: [{ name: "Seven Star Security Services" }],
  creator: "Seven Star Security Services",
  publisher: "Seven Star Security Services",
  applicationName: "Seven Star Security Services",
  referrer: "no-referrer-when-downgrade",
  alternates: {
    canonical: "/",
  },
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
  openGraph: {
    title: "Security Guard Services in Nepal | Seven Star Security - 24/7 Guard Company",
    description:
      "Trusted security guard company in Nepal. 24/7 guard services, event security, VIP protection, CCTV surveillance and bank security across Kathmandu and Nepal. Get security guard services near me.",
    url: "https://www.sevenstarsecurity.com.np",
    siteName: "Seven Star Security Services",
    images: [
      {
        url: "/images/sevenstarbg.webp",
        width: 895,
        height: 279,
        alt: "Seven Star Security - Security Guard Services in Nepal",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Security Guard Services in Nepal | Seven Star Security",
    description:
      "Professional security guard company in Nepal - 24/7 guard services, event security, VIP protection, CCTV and bank security across Kathmandu and Nepal.",
    creator: "@SevenStarSecurity",
    site: "@SevenStarSecurity",
    images: ["/images/sevenstarbg.webp"],
  },
  icons: {
    icon: "/sevenstar.ico",
    shortcut: "/sevenstar.ico",
    apple: "/sevenstar.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b4226",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.sevenstarsecurity.com.np/#organization",
      name: "Seven Star Security Services",
      url: "https://www.sevenstarsecurity.com.np",
      logo: "https://www.sevenstarsecurity.com.np/images/sevenstarlogo.webp",
      image: "https://www.sevenstarsecurity.com.np/images/sevenstarbg.webp",
      description:
        "Professional security guard company in Nepal offering 24/7 guard services, event security, VIP protection, CCTV surveillance, and bank security across Kathmandu and Nepal.",
      telephone: ["+977-1-59159997", "+977-1-5920997"],
      email: "info@sevenstarsecurity.com.np",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Chandol-4",
        addressLocality: "Kathmandu",
        postalCode: "44600",
        addressCountry: "NP",
      },
      areaServed: [
        { "@type": "City", name: "Kathmandu" },
        { "@type": "Country", name: "Nepal" },
      ],
      foundingDate: "2012",
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://www.sevenstarsecurity.com.np/#localbusiness",
      parentOrganization: {
        "@id": "https://www.sevenstarsecurity.com.np/#organization",
      },
      name: "Seven Star Security Services",
      url: "https://www.sevenstarsecurity.com.np",
      image: "https://www.sevenstarsecurity.com.np/images/sevenstarbg.webp",
      priceRange: "$$",
      telephone: ["+977-1-59159997", "+977-1-5920997"],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Chandol-4",
        addressLocality: "Kathmandu",
        postalCode: "44600",
        addressCountry: "NP",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 27.7172,
        longitude: 85.324,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "00:00",
          closes: "23:59",
        },
      ],
      areaServed: [
        { "@type": "City", name: "Kathmandu" },
        { "@type": "City", name: "Lalitpur" },
        { "@type": "City", name: "Bhaktapur" },
        { "@type": "Country", name: "Nepal" },
      ],
      makesOffer: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Security Guard Services",
            url: "https://www.sevenstarsecurity.com.np/services",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Event Security",
            url: "https://www.sevenstarsecurity.com.np/services",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "VIP Protection",
            url: "https://www.sevenstarsecurity.com.np/services",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "CCTV Surveillance & Monitoring",
            url: "https://www.sevenstarsecurity.com.np/services",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Bank Security",
            url: "https://www.sevenstarsecurity.com.np/services",
          },
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.sevenstarsecurity.com.np/#website",
      url: "https://www.sevenstarsecurity.com.np",
      name: "Seven Star Security Services",
      description:
        "Professional security guard company in Nepal - 24/7 guard services, event security, VIP protection, CCTV surveillance, and bank security across Kathmandu and Nepal.",
      inLanguage: "en",
      publisher: {
        "@id": "https://www.sevenstarsecurity.com.np/#organization",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${publicSans.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        {/* Strip browser-extension injected attributes (e.g. bis_skin_checked from Bitdefender)
            BEFORE React hydrates so server/client HTML matches.
            strategy="beforeInteractive" still injects this into <head> automatically —
            it does not need to be placed inside a manual <head> tag. */}
        <Script id="strip-extension-attrs" strategy="beforeInteractive">
          {`(function(){try{var o=new MutationObserver(function(m){m.forEach(function(r){r.addedNodes.forEach(function(n){if(n.nodeType===1){n.querySelectorAll("[bis_skin_checked]").forEach(function(e){e.removeAttribute("bis_skin_checked")});if(n.hasAttribute&&n.hasAttribute("bis_skin_checked"))n.removeAttribute("bis_skin_checked")}})})});o.observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:["bis_skin_checked"]});document.querySelectorAll("[bis_skin_checked]").forEach(function(e){e.removeAttribute("bis_skin_checked")})}catch(e){}})();`}
        </Script>

        {children}
        <FloatingWhatsAppWrapper />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </body>
    </html>
  );
}