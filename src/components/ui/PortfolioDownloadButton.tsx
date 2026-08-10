"use client";

import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getPublicPdfDocuments, PdfDocument } from "@/services/pdf";

let _cachedPdfUrl: string | null | undefined = undefined;

interface PortfolioDownloadButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export const PortfolioDownloadButton: React.FC<PortfolioDownloadButtonProps> = ({
  className = "",
  children = "DOWNLOAD PORTFOLIO",
}) => {
  const [portfolioPdfUrl, setPortfolioPdfUrl] = useState<string | null>(
    _cachedPdfUrl !== undefined ? _cachedPdfUrl : null
  );
  const [isLoadingPdf, setIsLoadingPdf] = useState(_cachedPdfUrl === undefined);

  useEffect(() => {
    if (_cachedPdfUrl !== undefined) return;

    let cancelled = false;

    const loadPortfolioPdf = async () => {
      try {
        const res = await getPublicPdfDocuments({ page: 1, limit: 50 });
        const active = res.items
          .filter((doc: PdfDocument) => doc.isActive)
          .sort((a, b) => a.displayOrder - b.displayOrder);

        const url = active.length > 0 ? active[0].fileUrl : null;
        _cachedPdfUrl = url;

        if (!cancelled) {
          setPortfolioPdfUrl(url);
        }
      } catch {
        _cachedPdfUrl = null;
        if (!cancelled) setPortfolioPdfUrl(null);
      } finally {
        if (!cancelled) setIsLoadingPdf(false);
      }
    };

    loadPortfolioPdf();
    return () => {
      cancelled = true;
    };
  }, []);

  const buttonVisible = !isLoadingPdf && !!portfolioPdfUrl;

  if (!buttonVisible) return null;

  return (
    <a
      href={portfolioPdfUrl!}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {isLoadingPdf && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </a>
  );
};
