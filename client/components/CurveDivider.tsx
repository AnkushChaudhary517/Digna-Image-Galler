import React from "react";

interface OrangeCurveDividerProps {
  className?: string;
  gWidth?: number | string; // Width of the <g> element
  gHeight?: number | string; // Height of the <g> element
  stripWidth?: number; // Thickness/width of the curved strip (stroke width)
  strokeColor?: string;
  opacity?: number;
}

export default function OrangeCurveDivider({
  className = "w-full",
  gWidth = 1440, // Default width of <g> element (matches viewBox width)
  gHeight = 844, // Default height of <g> element (matches viewBox height)
  stripWidth = 48.8644, // Default strip thickness
  strokeColor = "#FF6B00",
  opacity = 1,
}: OrangeCurveDividerProps) {

  return (
    <div className={className} style={{zIndex:3,position:"relative"}}>
      <svg
        viewBox="0 450 1440 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        style={{ opacity }}
      >
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
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="-18" />
            <feGaussianBlur stdDeviation="10" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.2 0"
            />
            <feBlend
              mode="normal"
              in2="shape"
              result="effect1_innerShadow_195_813"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="12" />
            <feGaussianBlur stdDeviation="10" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="effect1_innerShadow_195_813"
              result="effect2_innerShadow_195_813"
            />
          </filter>
        </defs>

        <g
          filter="url(#filter0_ii_195_813)"
          width={gWidth}
          height={gHeight}
        >
          <path
            d="M1539.33 39.4335C1586.25 845.112 1113.36 829.573 687.252 688.699C261.143 547.826 15.0873 494.491 -181.312 804.076"
            stroke={strokeColor}
            strokeWidth={stripWidth}
            strokeLinecap="round"
          />
          <path
            d={`M1539.33 ${39.4335 + stripWidth}C1586.25 ${845.112 + stripWidth} 1113.36 ${829.573 + stripWidth} 687.252 ${688.699 + stripWidth}C261.143 ${547.826 + stripWidth} 15.0873 ${494.491 + stripWidth} -181.312 ${804.076 + stripWidth}`}
            stroke="#22C55E"
            strokeWidth={stripWidth}
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}
