import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Public_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

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
  metadataBase: new URL("https://sevenstarsecurity.com.np"),
  title: {
    default: "Seven Star Security Services - Professional Security & Protection",
    template: "%s | Seven Star Security Services",
  },
  description:
    "Seven Star Security Services delivers professional security, protection, event safety, and operational support solutions for institutions, corporations, and high-value environments across Nepal.",
  keywords: [
    "security services Nepal",
    "professional security",
    "event security",
    "corporate protection",
    "asset protection",
    "security management",
    "Seven Star Security",
    "security company Nepal",
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
    title: "Seven Star Security Services",
    description:
      "Trusted security solutions for corporations, events, and high-risk environments in Nepal.",
    url: "https://sevenstarsecurity.com.np",
    siteName: "Seven Star Security Services",
    images: [
      {
        url: "/images/sevenstarlogo.png",
        width: 1200,
        height: 630,
        alt: "Seven Star Security Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Seven Star Security Services",
    description:
      "Professional security and protection services for institutions, events, and enterprises in Nepal.",
    creator: "@SevenStarSecurity",
    site: "@SevenStarSecurity",
    images: ["/images/sevenstarlogo.png"],
  },
  icons: {
    icon: "/images/sevenstarlogo.png",
    shortcut: "/images/sevenstarlogo.png",
    apple: "/images/sevenstarlogo.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b4226",
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

        <Script id="sevenstar-structured-data" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Seven Star Security Services",
            url: "https://sevenstarsecurity.com.np",
            description:
              "Professional security and protection services for corporations, events, and institutions across Nepal.",
            inLanguage: "en",
            publisher: {
              "@type": "Organization",
              name: "Seven Star Security Services",
              url: "https://sevenstarsecurity.com.np",
              logo: {
                "@type": "ImageObject",
                url: "https://sevenstarsecurity.com.np/images/sevenstarlogo.png",
              },
            },
          })}
        </Script>
      </body>
    </html>
  );
}