import React from "react";
import { Download, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DownloadComponentProps {
  title?: string;
  description?: string;
  fileName?: string;
  fileSize?: string;
  onDownload?: () => void | Promise<void>;
  isLoading?: boolean;
  className?: string;
  variant?: "default" | "minimal" | "svg";
  showIcon?: boolean;
  downloadCount?: number;
  formats?: Array<{
    name: string;
    extension: string;
  }>;
  iconColor?: string;
}

export default function DownloadComponent({
  title = "Ready to Download",
  description = "Your file is ready to download",
  fileName = "document.pdf",
  fileSize = "2.5 MB",
  onDownload,
  isLoading = false,
  className = "w-full",
  variant = "default",
  showIcon = true,
  downloadCount = 0,
  formats = [
    { name: "PDF", extension: ".pdf" },
    { name: "JPG", extension: ".jpg" },
    { name: "PNG", extension: ".png" },
  ],
  iconColor = "#2B21DA",
}: DownloadComponentProps) {
  const handleDownload = async () => {
    if (onDownload) {
      try {
        await onDownload();
      } catch (error) {
        console.error("Download failed:", error);
      }
    }
  };

  if (variant === "minimal") {
    return (
      <div className={className}>
        <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 bg-white hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            {showIcon && <FileText size={24} className="text-gray-600" />}
            <div>
              <p className="font-semibold text-sm text-gray-900">{fileName}</p>
              <p className="text-xs text-gray-500">{fileSize}</p>
            </div>
          </div>
          <Button
            onClick={handleDownload}
            disabled={isLoading}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Download size={16} className="mr-2" />
            {isLoading ? "Downloading..." : "Download"}
          </Button>
        </div>
      </div>
    );
  }

  if (variant === "svg") {
    return (
      <div className={className}>
        <div className="relative w-full">
          <svg
            width="1195"
            height="613"
            viewBox="0 0 1195 613"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Main dashed container */}
            <rect x="1" y="1" width="1193" height="477" rx="29" fill="white" />
            <rect
              x="1"
              y="1"
              width="1193"
              height="477"
              rx="29"
              stroke="#DBDBDB"
              strokeWidth="2"
              strokeDasharray="7 7"
            />

            {/* Decorative icon elements */}
            <g clipPath="url(#clip0_218_185)">
              <path
                d="M620.045 154.328L619.958 154.376C619.619 152.131 619.694 149.713 620.172 147.156C619.703 149.679 619.706 152.083 620.045 154.328ZM649.97 131.487C652.094 132.096 654.373 131.836 656.305 130.765C658.237 129.694 659.665 127.9 660.274 125.776C660.883 123.652 660.623 121.374 659.552 119.441C658.481 117.509 656.686 116.081 654.562 115.473C652.439 114.864 650.16 115.123 648.228 116.194C646.296 117.265 644.868 119.06 644.259 121.184C643.65 123.307 643.91 125.586 644.981 127.518C646.052 129.451 647.847 130.878 649.97 131.487Z"
                fill={iconColor}
                fillOpacity="0.2"
              />
              <path
                d="M682.245 110.23L654.051 102.146C641.805 98.6339 632.41 103.841 628.899 116.088L620.814 144.282C619.763 147.949 619.486 151.328 619.959 154.377C621.019 161.599 626.177 166.974 634.757 169.434L662.95 177.518C675.197 181.03 684.591 175.823 688.103 163.576L696.187 135.382C699.699 123.136 694.491 113.742 682.245 110.23ZM686.179 149.589C684.201 146.582 679.962 145.367 676.691 146.868L659.251 154.866C655.98 156.368 651.741 155.152 649.763 152.146L648.889 150.875C647.099 148.105 643.355 146.813 640.142 147.858L625.138 152.694C624.938 150.598 625.128 148.286 625.861 145.729L633.945 117.535C636.666 108.047 643.116 104.472 652.604 107.192L680.798 115.277C690.286 117.997 693.861 124.448 691.141 133.935L686.51 150.084L686.179 149.589Z"
                fill={iconColor}
                fillOpacity="0.2"
              />
            </g>

            {/* Download button in SVG */}
            <rect x="528.5" y="303" width="138" height="50" rx="12" fill={iconColor} />

            {/* SVG definitions */}
            <defs>
              <clipPath id="clip0_218_185">
                <rect width="84" height="84" fill="white" transform="translate(629.705 87.8822) rotate(16)" />
              </clipPath>
              <clipPath id="clip1_218_185">
                <rect
                  width="84"
                  height="84"
                  fill="white"
                  transform="translate(484.549 111.306) rotate(-16)"
                />
              </clipPath>
            </defs>
          </svg>

          {/* Content overlay positioned absolutely over SVG */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 py-8">
            <div className="text-center max-w-md">
              {showIcon && (
                <div className="flex justify-center mb-4">
                  <div
                    className="p-4 rounded-full"
                    style={{ backgroundColor: `${iconColor}15` }}
                  >
                    <Download size={32} style={{ color: iconColor }} />
                  </div>
                </div>
              )}

              <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-600 text-sm mb-4">{description}</p>

              <div className="mb-4 p-3 bg-gray-50 rounded-lg inline-block">
                <p className="text-sm font-semibold text-gray-900">{fileName}</p>
                <p className="text-xs text-gray-500 mt-1">{fileSize}</p>
                {downloadCount > 0 && (
                  <p className="text-xs text-gray-500 mt-1">
                    Downloaded <span className="font-semibold">{downloadCount}</span> times
                  </p>
                )}
              </div>

              {formats.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-600 mb-2">
                    Available Formats
                  </p>
                  <div className="flex gap-2 justify-center flex-wrap">
                    {formats.map((format) => (
                      <span
                        key={format.extension}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded"
                      >
                        {format.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={handleDownload}
                disabled={isLoading}
                className="mt-4 px-6 py-2 text-white font-semibold rounded-lg flex items-center gap-2 mx-auto transition-opacity hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: iconColor }}
              >
                <Download size={18} />
                {isLoading ? "Downloading..." : "Download Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className} flex flex-col gap-6`}>
      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        <div className="flex items-start gap-6">
          {showIcon && (
            <div
              className="p-4 rounded-xl flex-shrink-0"
              style={{ backgroundColor: `${iconColor}15` }}
            >
              <Download size={32} style={{ color: iconColor }} />
            </div>
          )}

          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 mb-4">{description}</p>

            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{fileName}</p>
                  <p className="text-xs text-gray-500 mt-1">{fileSize}</p>
                </div>
                {downloadCount > 0 && (
                  <p className="text-xs text-gray-500">
                    <span className="font-semibold text-gray-700">{downloadCount}</span> downloads
                  </p>
                )}
              </div>
            </div>

            {formats.length > 0 && (
              <div className="mb-6">
                <p className="text-xs font-semibold text-gray-600 mb-2">Available Formats</p>
                <div className="flex gap-2 flex-wrap">
                  {formats.map((format) => (
                    <span
                      key={format.extension}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded"
                    >
                      {format.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <Button
              onClick={handleDownload}
              disabled={isLoading}
              className="text-white"
              style={{ backgroundColor: iconColor }}
            >
              <Download size={18} className="mr-2" />
              {isLoading ? "Downloading..." : "Download Now"}
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
