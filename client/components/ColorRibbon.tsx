interface ColorRibbonProps {
  color: "orange" | "purple" | "blue" | "yellow" | "green" | "gradient";
  direction?: "left" | "right";
  height?: number;
}

export default function ColorRibbon({
  color,
  direction = "right",
  height = 60,
}: ColorRibbonProps) {
  const colorClasses = {
    orange: "from-orange-500 to-orange-400",
    purple: "from-purple-600 to-purple-400",
    blue: "from-blue-600 to-blue-400",
    yellow: "from-yellow-400 to-yellow-300",
    green: "from-green-500 to-green-400",
    gradient: "from-orange-500 via-purple-500 to-blue-500",
  };

  const rotationClass = direction === "left" ? "scale-x-[-1]" : "";

  return (
    <div
      className={`w-full bg-gradient-to-r ${colorClasses[color]} ${rotationClass}`}
      style={{ height: `${height}px` }}
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id={`ribbon-${color}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            {color === "orange" && (
              <>
                <stop offset="0%" style={{ stopColor: "#f97316" }} />
                <stop offset="100%" style={{ stopColor: "#fb923c" }} />
              </>
            )}
            {color === "purple" && (
              <>
                <stop offset="0%" style={{ stopColor: "#7c3aed" }} />
                <stop offset="100%" style={{ stopColor: "#a78bfa" }} />
              </>
            )}
            {color === "blue" && (
              <>
                <stop offset="0%" style={{ stopColor: "#2563eb" }} />
                <stop offset="100%" style={{ stopColor: "#60a5fa" }} />
              </>
            )}
            {color === "yellow" && (
              <>
                <stop offset="0%" style={{ stopColor: "#facc15" }} />
                <stop offset="100%" style={{ stopColor: "#fde047" }} />
              </>
            )}
            {color === "green" && (
              <>
                <stop offset="0%" style={{ stopColor: "#22c55e" }} />
                <stop offset="100%" style={{ stopColor: "#86efac" }} />
              </>
            )}
            {color === "gradient" && (
              <>
                <stop offset="0%" style={{ stopColor: "#f97316" }} />
                <stop offset="50%" style={{ stopColor: "#7c3aed" }} />
                <stop offset="100%" style={{ stopColor: "#2563eb" }} />
              </>
            )}
          </linearGradient>
        </defs>
        <path
          d="M0,40 Q300,0 600,40 T1200,40 L1200,120 Q600,80 0,120 Z"
          fill={`url(#ribbon-${color})`}
        />
      </svg>
    </div>
  );
}
