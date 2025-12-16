import React, { useEffect, useState } from "react";
import { imageAPI as importedImageAPI } from "@/services/api";

export interface ImageDetails {
  id: string;
  userId: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  photographer?: string;
  aspectRatio?: string;
  liked:true;
  downloadCount?: number;
  downloadSizes?: Array<{
    id: string;
    name: string;
    url: string;
    width: number;
    height: number;
    fileSizeBytes: number;
  }>;
}

interface DownloadModalProps {
  isOpen: boolean;
  image: ImageDetails | null;
  onClose: () => void;
}

function formatFileSize(bytes: number): string {
  if (!bytes) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}

export default function DownloadModal({ isOpen, image, onClose }: DownloadModalProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
   const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setError(null);
      setSelectedSize(image?.downloadSizes?.[0]?.id ?? null);
    }
  }, [isOpen, image]);

  if (!isOpen) return null;

  const handleDownload = async () => {
    if (!image) return;
    if (!selectedSize) {
      setError("Please select a size");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Prefer imageAPI.downloadImage if available, otherwise call generic endpoint
      const downloadFn = (importedImageAPI as any)?.downloadImage ?? null;

      // let response: any;
      // if (downloadFn) {
      //   response = await downloadFn(image.id, selectedSize);
      // } else {
      //   // fallback direct fetch (uses VITE_API_BASE_URL if services/api doesn't provide helper)
      //   const base =
      //     (import.meta.env.VITE_API_BASE_URL as string) ??
      //     (import.meta.env.VITE_API_BASE as string) ??
      //     "";
      //   const res = await fetch(
      //     `${base}/images/${image.id}/download?size=${encodeURIComponent(selectedSize)}`
      //   );
      //   response = await (res.ok ? res.json() : res.text());
      //   if (!res.ok)
      //     throw new Error(
      //       typeof response === "string"
      //         ? response
      //         : response?.message ?? "Download failed"
      //     );
      // }

      // const downloadUrl =
      //   image?.data?.downloadUrl ?? response?.downloadUrl ?? response?.url;
      // const fileName =
      //   response?.data?.fileName ?? response?.fileName ?? `${image.title ?? image.id}.jpg`;

      if (!selectedImageUrl) throw new Error("Download URL not returned by API");

      try {
    const response = await fetch(selectedImageUrl, { mode: "cors" });
    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = image.title ? `${image.title}.jpg` : "download.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download failed:", error);
  }

      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4" style={{zIndex:1000}}>
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white max-w-2xl w-full mx-2 sm:mx-4 rounded-lg shadow-lg overflow-hidden max-h-[90vh] sm:max-h-[85vh] flex flex-col">
        <div className="p-3 sm:p-4 border-b flex justify-between items-start flex-shrink-0">
          <div className="flex-1 pr-2">
            <h3 className="text-base sm:text-lg text-black font-semibold">
              {image?.title ?? "Download Image"}
            </h3>
            <p className="text-xs sm:text-sm text-black text-muted-foreground mt-1">
              {image?.description}
            </p>
          </div>
          <button
            className="text-lg sm:text-xl text-gray-600 hover:text-gray-900 min-h-[44px] min-w-[44px] flex items-center justify-center flex-shrink-0"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="p-3 sm:p-4 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 overflow-y-auto flex-1">
          <div className="flex items-center justify-center">
            <img
              src={image?.imageUrl}
              alt={image?.title ?? "image"}
              className="max-h-60 sm:max-h-80 object-contain w-full"
            />
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-black font-medium">Select size</p>
              <div className="mt-2 space-y-2">
                {(image?.downloadSizes ?? []).map((s) => (
                  <label key={s.name} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="downloadSize"
                      checked={selectedSize === s.name}
                      onChange={() => {setSelectedSize(s.name);setSelectedImageUrl(s.url)} }
                    />
                    <span className="text-sm text-black">
                      {s.name}
                    </span>
                  </label>
                ))}
                {(image?.downloadSizes ?? []).length === 0 && (
                  <p className="text-sm text-black">
                    No download sizes available.
                  </p>
                )}
              </div>
            </div>

            {error && <div className="text-sm text-red-600">{error}</div>}

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
              <button
                onClick={handleDownload}
                disabled={isLoading}
                style={{
                  backgroundColor: "#2B21DA",
                  color: "#FFFFFF",
                  fontFamily: "Sora, system-ui, sans-serif",
                  fontSize: "15px",
                  lineHeight: "20px",
                  fontWeight: 500,
                }}
                className="px-4 py-3 sm:py-2 rounded-xl disabled:opacity-60 min-h-[44px] font-medium hover:bg-[#2319b5] transition-colors"
              >
                {isLoading ? "Downloading..." : "Download"}
              </button>
              <button
                onClick={onClose}
                style={{
                  fontFamily: "Sora, system-ui, sans-serif",
                  fontSize: "15px",
                  lineHeight: "20px",
                  fontWeight: 500,
                }}
                className="px-4 py-3 sm:py-2 text-black rounded-xl border min-h-[44px] font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
