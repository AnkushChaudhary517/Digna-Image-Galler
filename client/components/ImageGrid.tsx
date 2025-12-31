import React, { useEffect, useState } from "react";
import DownloadModal, { ImageDetails } from "@/components/DownloadModel";
import { imageAPI as importedImageAPI } from "@/services/api";
import { Heart, Share2 } from "lucide-react";
import ShareImageModal from "./ShareImageModal";
import { useAuth } from "@/context/AuthContext";
import { useError } from "@/context/ErrorContext";
import { useNavigate } from "react-router-dom";
import { Color } from "three/src/Three.Core.js";
import ActionButtons from "./ActionButton";
import "./ActionButton.css";

export default function ImageGrid({ images: propImages = [] }) {
  const { showError } = useError();
  const [images, setImages] = useState<ImageDetails[]>(propImages);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<ImageDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [likedImages, setLikedImages] = useState<Record<string, boolean>>({}); // Track liked images
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [imageUrlToShare, setImageUrlToShare] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("ImageGrid2: loadImages called");
    if (propImages && propImages.length >= 0) {
      setImages(propImages as ImageDetails[]);
    }
  }, [propImages]);

  useEffect(() => {
    let mounted = true;

    async function loadImages() {
      console.log("ImageGrid: loadImages called");
      if (propImages.length > 0 && Array.isArray(propImages)) {
        setLoading(false);
        setError(null);
        if (mounted) setImages(propImages as ImageDetails[]);
        console.log("ImageGrid: loadImages called 2", propImages);
        return;
      }
      setLoading(true);
      setError(null);

      try {
        const apiMethod =
          (importedImageAPI as any)?.listImages ??
          (importedImageAPI as any)?.getImages ??
          (importedImageAPI as any)?.fetchImages ??
          (importedImageAPI as any)?.searchImages ??
          (importedImageAPI as any)?.getAllImages ??
          (importedImageAPI as any)?.list ??
          null;

        if (!apiMethod) throw new Error("imageAPI missing a list/get method");

        const res = await apiMethod();
        const imgs =
          Array.isArray(res)
            ? res
            : res?.data && Array.isArray(res.data)
              ? res.data
              : res?.images && Array.isArray(res.images)
                ? res.images
                : res?.results && Array.isArray(res.results)
                  ? res.results
                  : [];

        if (mounted) setImages(imgs as ImageDetails[]);
      } catch (err) {
        console.error("[ImageGrid] loadImages error:", err);
        const errorMessage = err instanceof Error ? err.message : String(err);
        setError(errorMessage);
        showError(
          err instanceof Error ? err : new Error(errorMessage),
          "Image Loading Error"
        );
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadImages();
    return () => {
      mounted = false;
    };
  }, []);

  function handleOpenModal(image: ImageDetails) {
    setSelectedImage(image);
    setIsModalOpen(true);
  }

  function handleShareButtonClick(imageUrl: string) {
    setImageUrlToShare(imageUrl);
    setShareModalOpen(true); // Show share options (either a modal or a simple inline share box)
  }

  const handleCloseShareModal = () => {
    setShareModalOpen(false); // Close the modal
    setImageUrlToShare(null);
  };

  function handleCloseModal() {
    setIsModalOpen(false);
    setTimeout(() => setSelectedImage(null), 200);
  }

  // Define possible width patterns per row
  const widthPatterns = [
    ["45%", "30%", "25%"],
    ["30%", "25%", "45%"],
    ["25%", "45%", "30%"],
  ];

  const titleStyle = {
    fontFamily: "Sora",
    fontWeight: 500,
    fontStyle: "normal",
    fontSize: "32px",
    lineHeight: "100%",
    letterSpacing: "0",
    verticalAlign: "middle",
    Color: "#0C1633",
  };

  // Group images into rows of 3
  const rows: ImageDetails[][] = [];
  for (let i = 0; i < images.length; i += 3) {
    rows.push(images.slice(i, i + 3));
  }

  return (
    <div className="bg-background py-6 sm:py-8 md:py-12" style={{ backgroundColor: "white" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 md:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-black" style={titleStyle}>DIGNA Stock Photos</h2>
        </div>

        {loading && <p className="text-sm text-gray-500">Loading images...</p>}
        {error && <div className="p-2 bg-red-100 text-red-700 rounded">{error}</div>}

        {!loading && images.length === 0 && !error && (
          <p className="text-sm text-gray-500">No images available.</p>
        )}

        {/* Dynamic rows — responsive: stacked on mobile, patterned on sm+ */}
        <div className="flex flex-col gap-3 sm:gap-4 mt-4 sm:mt-6">
          {rows.map((row, rowIndex) => {
            const pattern = widthPatterns[rowIndex % widthPatterns.length];

            return (
              <div key={rowIndex} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                {row.map((img, i) => {
                  const src =
                    (img as any).imageUrl ??
                    (img as any).thumbnailUrl ??
                    (img as any).url ??
                    "";

                  // Set CSS variable for sm+ width; on mobile CSS will force 100%
                  const colWidth = pattern[i % 3];

                  return (
                    <div
                      key={img.id ?? `${rowIndex}-${i}`}
                      className="image-item rounded-lg sm:rounded-xl overflow-hidden bg-gray-100 hover:shadow-lg focus:outline-none relative"
                      style={{ ["--col-width" as any]: colWidth, minHeight: "200px" }}
                    >
                      <div className="absolute left-0 right-0 flex justify-between items-center p-1.5 sm:p-2 md:p-3 z-10">
                        <div
                          className="ownerBox flex items-center gap-1 sm:gap-2 md:gap-3 cursor-pointer hover:opacity-80 transition-opacity min-w-0"
                          onClick={() => navigate(`/profile/${img.userId}`)}
                        >
                          {/* <img
                            src={img.photographer ?? "/default-user.png"}
                            alt="Uploader"
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-cover"
                          /> */}
                          <span className="text-[10px] sm:text-xs md:text-sm lg:text-base font-semibold truncate drop-shadow-lg" style={{ color: "white" }}>
                            {img.photographer ?? "Unknown User"}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 sm:gap-2 md:gap-3 flex-shrink-0">
                          <div className="frame flex items-center gap-1 sm:gap-2">
                            <div
                              className="iconBox cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenModal(img);
                              }}
                              aria-label="Download"
                              role="button"
                              tabIndex={0}
                            >
                              {/* Download Icon */}
                              <svg
                                width="16"
                                height="16"
                                className="sm:w-5 sm:h-5 md:w-6 md:h-6 icon"
                                viewBox="0 0 24 24"
                                fill="none"
                                aria-hidden="true"
                              >
                                <path
                                  d="M12 3V15M12 15L8 11M12 15L16 11M4 21H20"
                                  stroke="white"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>

                            {user && (
                              <div
                                className="iconBox cursor-pointer"
                                onClick={async (e) => {
                                  e.stopPropagation();
                                  try {
                                    const res: any = await importedImageAPI.likeImage(img.id);
                                    // toggle local like state if API call succeeded (or optimistically)
                                    setLikedImages((prev) => {
                                      const current = !!prev[img.id] || !!img.liked;
                                      // flip
                                      const next = { ...prev, [img.id]: !current };
                                      return next;
                                    });
                                    // If you want to strictly toggle only on API success, uncomment:
                                    // if (res && (res.success === true || res.status === 200 || res.status === "ok" || res.ok)) {
                                    //   setLikedImages((prev) => ({ ...prev, [img.id]: !prev[img.id] }));
                                    // }
                                  } catch (err) {
                                    console.error("Failed to like image:", err);
                                  }
                                }}
                                aria-label="Like"
                                role="button"
                                tabIndex={0}
                              >
                                {/* Heart Icon (uses currentColor for stroke/fill so tailwind classes work) */}
                                <svg
                                  width="16"
                                  height="16"
                                  className={`sm:w-5 sm:h-5 md:w-6 md:h-6 icon ${likedImages[img.id] || img.liked ? "text-accent" : "text-white"}`}
                                  viewBox="0 0 24 24"
                                  fill={likedImages[img.id] || img.liked ? "red" : "none"}
                                  aria-hidden="true"
                                >
                                  <path
                                    d="M12 21s-6.5-4.35-9-8.5C1.5 9 3.5 5 7.5 5c2.1 0 3.4 1.2 4.5 2.7C13.1 6.2 14.4 5 16.5 5c4 0 6 4 4.5 7.5-2.5 4.15-9 8.5-9 8.5z"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleOpenModal(img as ImageDetails)}
                        type="button"
                        aria-label={`Open download modal for ${img.title ?? img.id}`}
                        className="w-full h-full block"
                      >
                        <img
                          src={src}
                          alt={img.title ?? img.description ?? "image"}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          style={{ display: "block", minHeight: "200px" }}
                        />
                      </button>

                      {/* <div className="p-2 sm:p-3 text-left absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent z-10">
                        <p className="text-xs sm:text-sm text-gray-200 font-medium truncate">
                          {img.title ?? "Untitled"}
                        </p>
                        <p className="text-xs text-gray-300 truncate hidden sm:block">
                          {img.photographer ?? ""}
                        </p>
                      </div> */}

                      {shareModalOpen && imageUrlToShare && (
                        <ShareImageModal isOpen={shareModalOpen} onClose={handleCloseShareModal}>
                          <div className="p-4">
                            <h3 className="text-lg font-bold text-gray-500">Share this image</h3>

                            <div className="mt-4">
                              <input
                                type="text"
                                value={imageUrlToShare}
                                readOnly
                                className="p-2 border rounded-xl w-full text-gray-500 text-sm"
                              />
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(imageUrlToShare);
                                  alert("Image URL copied to clipboard!");
                                }}
                                style={{
                                  fontFamily: "Sora, system-ui, sans-serif",
                                  fontSize: "15px",
                                  lineHeight: "20px",
                                  fontWeight: 500,
                                }}
                                className="mt-2 p-2 bg-gray-200 rounded-xl text-sm hover:bg-gray-300 transition-colors"
                              >
                                Copy URL
                              </button>
                            </div>

                            <div className="mt-4">
                              <a
                                href={`mailto:?subject=Check out this image&body=${encodeURIComponent(
                                  imageUrlToShare
                                )}`}
                                className="text-blue-500 hover:underline text-sm"
                              >
                                Share via Email
                              </a>
                            </div>
                          </div>
                        </ShareImageModal>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        <DownloadModal isOpen={isModalOpen} image={selectedImage} onClose={handleCloseModal} />
      </div>
    </div>
  );
}
