import SignupCard from "./SignupCard";
import ColorRibbon from "./ColorRibbon";
import SignInSection from "./SignInSection";
import React from "react";

interface AuthSectionProps {
  title?: string;
  subtitle?: string;
  onSignup?: (data: { email: string; password: string; name: string }) => void;
}

export default function AuthSection({
  
  title = "By Signing up with Digna, you can",
  subtitle = "Unlock the full potential of Digna's powerful features. Create an account and start exploring what's possible.",
  onSignup,
}: AuthSectionProps) {
  const handleSignup = (data: {
    email: string;
    password: string;
    name: string;
  }) => {
    console.log("Signup data:", data);
    // Handle signup logic here
  };
      const headingStyle: React.CSSProperties = {
        fontFamily: "Sora, system-ui, sans-serif",
        fontWeight: 600,
        fontSize: "clamp(28px, 5vw, 45px)",
        lineHeight: "clamp(32px, 5.5vw, 100%)",
        textAlign: "center",
        color: "#0C1633",
        maxWidth: "90%",
        margin: "0 auto",
      };
    
      const descriptionStyle: React.CSSProperties = {
        fontFamily: "'Work Sans', system-ui, sans-serif",
        fontWeight: 400,
        fontSize: "clamp(14px, 1.6vw, 20px)",
        lineHeight: "1.4",
        letterSpacing: "0.01em",
        textAlign: "center",
        color: "#0C1633",
        maxWidth: "90%",
        margin: "8px auto 0",
      };
  const benefits = [
    { icon: "📥", label: "Download Images" },
    { icon: "✏️", label: "Customize your feed" },
    { icon: "🏷️", label: "Create collections" },
    { icon: "👑", label: "Buy Premium Passes" },
  ];

  return (
    <>
      {/* center the bordered boundary (80% width) */}
      <div className="w-full flex justify-center px-4 sm:px-0">
        <div
          aria-label="auth-section-boundary"
          className="w-full sm:w-[95%] md:w-[80%] rounded-2xl sm:rounded-[30px] border border-black relative overflow-hidden flex flex-col bg-white"
        >
          {/* svg inside the border area with 20px gap from all sides */}
          <svg
            viewBox="0 0 1170 747"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
            className="absolute pointer-events-none z-0 bg-transparent w-[calc(100%-40px)] h-[calc(100%-40px)]"
            style={{
              position: "absolute",
              inset: "20px",
              pointerEvents: "none",
              zIndex: 0,
              background: "transparent",
            }}
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              opacity={0.1}
              d="M1214.66 1272.51C1422.61 775.601 1104.85 379.175 669.43 417.063C234.016 454.951 -60.0682 239.109 -162.632 -112.88"
              stroke="#2B21DA"
              strokeWidth={78.8644}
              strokeLinecap="round"
            />
          </svg>

          {/* content (unchanged orientation) placed above svg and inside the border */}
          <div
            className="relative z-10 flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-5"
          >
            
              <div className="w-full sm:w-[40%] flex items-start">
                <SignInSection onSubmit={handleSignup} />
              </div>
            <div className="flex flex-col justify-between flex-1">
              
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="text-center max-w-[900px]">
                <h2 style={{...headingStyle}}>{title}</h2>
                <p style={{...descriptionStyle}}>{subtitle}</p>
              </div>
            </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="flex gap-3 sm:gap-4 flex-wrap justify-center sm:justify-start">
                  {benefits.map((benefit, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-[#F1F1F3] flex items-center gap-2 sm:gap-3 min-w-[140px] sm:min-w-0"
                      style={{
                        boxShadow: "0 6px 18px rgba(11,16,51,0.04)",
                      }}
                    >
                      <div className="text-xl sm:text-2xl md:text-[28px]">{benefit.icon}</div>
                      <div className="font-semibold text-sm sm:text-base text-[#111827]">{benefit.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
