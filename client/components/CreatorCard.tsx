import React from "react";

type CreatorCardProps = {
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  position?: "left" | "right";
  className?: string;
  style?: React.CSSProperties;
};

export default function CreatorCard({
  title,
  description,
  imageSrc,
  imageAlt,
  position = "left",
  className,
  style,
}: CreatorCardProps) {
  // outer wrapper provides spacing so background ribbon remains visible
  const wrapperStyle: React.CSSProperties = {
    margin: "1rem",
    sm: {
      margin: "1.5rem",
    },
    md: {
      margin: "2rem",
    },
    position: "relative",
    zIndex: 10, // sit above the background ribbon
    ...style,
  };

  return (
    <div className={className} style={wrapperStyle}>
      {/* ...existing card markup (keeps original structure inside) ... */}
      <div
        className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-center bg-white/90 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 shadow-lg"
        style={{
          boxShadow: "0 10px 30px rgba(11,16,51,0.06)",
        }}
      >
        {position === "left" && imageSrc && (
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full sm:w-[200px] md:w-[240px] h-[180px] sm:h-[160px] object-cover rounded-lg flex-shrink-0"
          />
        )}

        <div className="flex-1 w-full sm:w-auto">
          <h3 className="m-0 text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">{title}</h3>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-[#334155] leading-relaxed">{description}</p>
        </div>

        {position === "right" && imageSrc && (
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full sm:w-[200px] md:w-[240px] h-[180px] sm:h-[160px] object-cover rounded-lg flex-shrink-0 order-first sm:order-last"
          />
        )}
      </div>
    </div>
  );
}
