import { Download, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { imageAPI as importedImageAPI } from "@/services/api";
import { useEffect, useState } from "react";

interface UploadImageCardProps {
  id: string;
  title: string;
  imageUrl: string;
  downloads?: number;
  photographer?: string;
  downloadedAt?: string;
  createdAt?: string;
  isUpload?: boolean;
  liked?: boolean;
  onDownload?: (imageId: string) => void;
  onDelete?: (imageId: string) => void;
}

export default function UploadImageCard({
  id,
  title,
  imageUrl,
  downloads,
  photographer,
  downloadedAt,
  createdAt,
  liked,
  isUpload = true,
  onDownload,
  onDelete,
}: UploadImageCardProps) {
  const date = isUpload ? createdAt : downloadedAt;
  const [likedImages, setLikedImages] = useState<boolean>(liked || false);

  useEffect(() => {
    setLikedImages(liked || false);
  }, [liked]);

  return (
    <div 
      className="group rounded-xl overflow-hidden bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 flex flex-col"
      style={{
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Image */}
      <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Overlay on Hover - Mobile: Always visible, Desktop: On hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 sm:gap-3">
          {isUpload && onDelete && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(id)}
              style={{
                fontFamily: "Sora, system-ui, sans-serif",
                fontSize: "15px",
                lineHeight: "20px",
                fontWeight: 500,
              }}
              className="min-h-[44px] px-4 sm:px-6 rounded-xl"
            >
              Delete
            </Button>
          )}
          {!isUpload && onDownload && (
            <Button
              size="sm"
              onClick={() => onDownload(id)}
              style={{
                backgroundColor: "#2B21DA",
                color: "#FFFFFF",
                fontFamily: "Sora, system-ui, sans-serif",
                fontSize: "15px",
                lineHeight: "20px",
                fontWeight: 500,
              }}
              className="text-white min-h-[44px] px-4 sm:px-6 rounded-xl hover:bg-[#2319b5]"
            >
              <Download size={16} className="mr-1 sm:mr-2" />
              Download
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 md:p-5 flex-1 flex flex-col">
        {/* Title */}
        <h3 
          className="font-semibold text-foreground mb-1 sm:mb-2 truncate" 
          style={{
            fontFamily: "Sora, system-ui, sans-serif",
            fontSize: "clamp(14px, 1.2vw, 16px)",
            lineHeight: "1.4",
            fontWeight: 600,
            color: "#0C1633",
          }}
        >
          {title}
        </h3>

        {/* Photographer/Creator */}
        {photographer && (
          <p 
            className="text-muted-foreground mb-2 sm:mb-3" 
            style={{
              fontFamily: "Work Sans, system-ui, sans-serif",
              fontSize: "clamp(12px, 1vw, 14px)",
              lineHeight: "1.4",
              color: "#666",
            }}
          >
            by {photographer}
          </p>
        )}

        {/* Stats */}
        <div 
          className="flex items-center justify-between mb-2 sm:mb-3 text-muted-foreground"
          style={{
            fontFamily: "Work Sans, system-ui, sans-serif",
            fontSize: "clamp(12px, 1vw, 14px)",
            lineHeight: "1.4",
            color: "#666",
          }}
        >
          {isUpload && downloads !== undefined ? (
            <span>{downloads} {downloads === 1 ? 'download' : 'downloads'}</span>
          ) : (
            <span>{date && new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          )}
        </div>

        {/* Actions */}
        {isUpload && (
          <div className="flex gap-2 sm:gap-3 mt-auto">
            <button
              className="flex-1 flex items-center justify-center gap-1 sm:gap-2 p-2 sm:p-2.5 rounded-xl min-h-[44px] hover:bg-gray-100 active:bg-gray-200 transition-colors border border-gray-200"
              name="like-button"
              onClick={async () => {
                try {
                  const res:any = await importedImageAPI.likeImage(id);
            
                  // Only update UI if API returned success
                  if (res?.success) {
                    setLikedImages(true);
                  }
            
                } catch (err) {
                  console.error("Failed to like image:", err);
                }
              }}
              style={{
                fontFamily: "Sora, system-ui, sans-serif",
              }}
            >
              <Heart
                size={18}
                className="sm:w-5 sm:h-5"
                fill={likedImages ? "#2B21DA" : "none"}
                stroke={likedImages ? "#2B21DA" : "#0C1633"}
                strokeWidth={2}
              />
            </button>
            <button 
              className="flex-1 flex items-center justify-center gap-1 sm:gap-2 p-2 sm:p-2.5 rounded-xl min-h-[44px] hover:bg-gray-100 active:bg-gray-200 text-muted-foreground hover:text-foreground transition border border-gray-200"
              style={{
                fontFamily: "Sora, system-ui, sans-serif",
              }}
            >
              <Share2 size={18} className="sm:w-5 sm:h-5" strokeWidth={2} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
