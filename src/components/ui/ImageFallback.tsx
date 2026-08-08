"use client";

import React, { useState } from "react";

interface ImageFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackText?: string;
  containerClassName?: string;
  priority?: boolean;
  fetchPriority?: "high" | "low" | "auto";
  fetchpriority?: "high" | "low" | "auto";
}

export const ImageFallback: React.FC<ImageFallbackProps> = ({
  src,
  alt,
  fallbackText,
  className = "",
  containerClassName = "",
  priority = false,
  loading,
  decoding = "async",
  fetchPriority,
  fetchpriority,
  ...props
}) => {
  const [error, setError] = useState(false);

  // Extract basename from path, e.g., "/images/police.jpg" -> "police.jpg"
  const fileName = fallbackText || src.split("/").pop() || src;

  if (error) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-emerald-950/20 border-2 border-dashed border-emerald-700/40 rounded-lg p-4 text-center min-h-[120px] transition-all hover:border-emerald-500/60 ${containerClassName} ${className}`}
      >
        <div className="w-8 h-8 rounded-full bg-emerald-900/40 text-emerald-400 flex items-center justify-center font-mono text-xs mb-2">
          🖼️
        </div>
        <span className="font-mono text-xs font-semibold text-emerald-300 tracking-wider">
          {fileName}
        </span>
        <span className="text-[10px] text-emerald-500/70 mt-1">
          (Place image in /public/images/)
        </span>
      </div>
    );
  }

  const computedLoading = loading || (priority ? "eager" : "lazy");
  const computedFetchPriority = fetchPriority || fetchpriority || (priority ? "high" : "low");

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={computedLoading}
      decoding={decoding}
      fetchPriority={computedFetchPriority}
      onError={() => setError(true)}
      {...props}
    />
  );
};

