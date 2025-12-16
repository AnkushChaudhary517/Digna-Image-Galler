import React, { useId } from "react";

export interface RibbonStrokeProps {
  strokeColor?: string;
  width?: number | string;
  height?: number | string;
  viewBox?: string;
  strokeWidth?: number | string;
  strokeLinecap?: "butt" | "round" | "square";
  className?: string;
  style?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
}

export default function RibbonStroke({
  strokeColor = "#FF6B00",
  width = 1520.27,
  height = 1212.9585653520735,
  viewBox = "0 0 1440 844",
  strokeWidth = 78.8644,
  strokeLinecap = "round",
  className,
  style,
  containerStyle,
}: RibbonStrokeProps) {
  const id = useId().replace(/:/g, "-");
  const filterId = `filter0_ii_${id}`;

  // Figma defaults as requested (applied to wrapper so header content can sit above)
  const defaultContainerStyle: React.CSSProperties = {
    position: "absolute",
    width: "100%",
    maxWidth: "1520.27px",
    left: "0",
    sm: {
      left: "-181.31px",
    },
    top: "10.21%",
    bottom: "68.98%",
    transform: "rotate(-163.85deg)",
    pointerEvents: "none",
    background: "transparent",
    borderStyle: "solid",
    borderWidth: `${strokeWidth}px`, // mimic Figma border (visual fallback)
    borderColor: strokeColor,
    boxShadow: "inset 0px 12px 20px rgba(255, 255, 255, 0.25), inset 0px -18px 20px rgba(255, 255, 255, 0.2)",
    // allow overrides
    ...containerStyle,
  };

  const svgStyle: React.CSSProperties = {
    display: "block",
    background: "transparent",
    width: "100%",
    height: "100%",
    ...style,
  };

  return (
    <div aria-hidden style={defaultContainerStyle} className={`${className} hidden sm:block`}>
      <svg
        viewBox={viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={svgStyle}
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <g filter={`url(#${filterId})`}>
          <path
            d="M1539.33 39.4335C1586.25 845.112 1113.36 829.573 687.252 688.699C261.143 547.826 15.0873 494.491 -181.312 804.076"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap={strokeLinecap}
            fill="none"
          />
        </g>
        <defs>
          <filter
            id={filterId}
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
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow_195_814" />
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
            <feBlend mode="normal" in2="effect1_innerShadow_195_814" result="effect2_innerShadow_195_814" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}