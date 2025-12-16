import ColorRibbon from "./ColorRibbon";
import OrangeCurveDivider from "./CurveDivider";

interface FeatureSectionProps {
  title: string;
  description: string;
  imageSrc: string;
  ribbonColor: "orange" | "purple" | "blue" | "yellow" | "green" | "gradient";
  ribbonDirection?: "left" | "right";
  horizontalPosition?: "left" | "center" | "right";
  verticalPosition?: "top" | "center" | "bottom";
  showStripedRibbon?: boolean;
}

export default function FeatureSection({
  title,
  description,
  imageSrc,
  ribbonColor,
  ribbonDirection = "right",
  horizontalPosition = "left",
  verticalPosition = "center",
  showStripedRibbon = true,
}: FeatureSectionProps) {
  const horizontalClass =
    horizontalPosition === "left"
      ? "justify-start text-left"
      : horizontalPosition === "right"
      ? "justify-end text-right"
      : "justify-center text-center";

  const verticalClass =
    verticalPosition === "top" ? "items-start" : verticalPosition === "bottom" ? "items-end" : "items-center";

  return (
    <>
      <div className="relative" name="feature-section">
        {/* Background Image (kept) */}
        <div className="relative w-full min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px] overflow-hidden bg-gray-900">
          <img
            src={imageSrc}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/40 to-gray-900/60"></div>

          {/* Text container positioned based on input props
              z-20 to ensure it sits above the divider when the divider is translated up */}
          <div className={`absolute inset-0 z-20 flex ${verticalClass} ${horizontalClass} px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16`}>
            <div className="max-w-4xl w-full">
              <div className="space-y-3 sm:space-y-4 md:space-y-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  {title}
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider: place as sibling, keep it responsive and translate it up by 50% of its own height.
            This hides half the divider behind the feature-section (section content has z-20). */}
        
        <div className="w-full overflow-visible">
          <OrangeCurveDivider className="w-full transform -translate-y-1/2" />
        </div>
      </div>
    </>
  );
}
