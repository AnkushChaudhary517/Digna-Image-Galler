import React from "react";

type Props = {
  strokeColor?: string;
  strokeWidth?: number;
  className?: string;
  style?: React.CSSProperties;
};

export default function RibbonSvgInline({
  strokeColor = "#FF6B00",
  strokeWidth = 78.8644,
  className,
  style,
}: Props) {
  return (
    <div style={{ position: "relative" }} className={className}>
      <svg
        viewBox="0 0 1440 844"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        style={style}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <g filter="url(#filter0_ii_195_813)">
          <path
            d="M1539.33 39.4335C1586.25 845.112 1113.36 829.573 687.252 688.699C261.143 547.826 15.0873 494.491 -181.312 804.076"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            data-index={0}
            style={{ opacity: 1 }}
          />
        </g>

        <defs>
          <filter
            id="filter0_ii_195_813"
            x="-220.75"
            y="-18"
            width="1802.72"
            height="873.514"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="-18" />
            <feGaussianBlur stdDeviation="10" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.2 0" />
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow_195_813" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="12" />
            <feGaussianBlur stdDeviation="10" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
            <feBlend mode="normal" in2="effect1_innerShadow_195_813" result="effect2_innerShadow_195_813" />
          </filter>
        </defs>
      </svg>

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
          width: "100%",
          height: "100%",
        }}
        aria-hidden
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <line
            x1="0"
            y1="0"
            x2="200"
            y2="200"
            style={{
              display: "none",
              fill: "black",
              stroke: "#ffffff",
              strokeWidth: 2,
              strokeLinecap: "round",
            }}
          />
        </svg>
      </div>
    </div>
  );
}