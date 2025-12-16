import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { productHeaderSvgs } from "@/components/decorativeSvgs/productHeaderSvgs";
import FeatureSection from "@/components/FeatureSection";
import AuthSection from "@/components/AuthSection";
import ColorRibbon from "@/components/ColorRibbon";
import RibbonStroke from "@/components/RibbonStroke";
import RibbonSvgInline from "@/components/RibbonSvgInline";
import SignInSection from "@/components/SignInSection";

export default function Product() {
  const tags = ["Nature", "Portrait", "Architecture", "Food", "Animals", "Travel"];
    const headingStyle: React.CSSProperties = {
      fontFamily: "Sora, system-ui, sans-serif",
      fontWeight: 600,
      fontSize: "clamp(28px, 5vw, 60px)",
      lineHeight: "clamp(32px, 5.5vw, 60px)",
      textAlign: "center",
      color: "#FFFFFF",
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
      color: "#FFFFFF",
      maxWidth: "90%",
      margin: "8px auto 0",
    };
  
  const handleSignup = (data: {
    email: string;
    password: string;
    name: string;
  }) => {
    console.log("Signup data:", data);
    // Handle signup logic here
  };

  // amount (px) to pull subsequent FeatureSection up so its divider overlaps the previous section
  const dividerOverlapPx = 35; // adjust this single value to increase/decrease overlap

  return (
    <>
      <main className="flex-1" style={{ backgroundColor: "#FFFCF3" }}>
        <Header
          decorativeSvg={productHeaderSvgs}
          heading="Digna For Audience"
          description="How Image Creators are Shaping the Future of Visual Content"
        />
        <div
          className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 mx-auto flex flex-col sm:flex-row sm:justify-between relative z-[3] pointer-events-auto"
          style={{
            width: "95%",
            maxWidth: "1200px",
            marginTop: "-150px",
          }}
        >
          {/* LEFT SECTION */}
          <div
            className="w-full sm:w-[70%] mb-6 sm:mb-0 flex flex-col justify-between"
            style={{
              padding: "10px 12px",
            }}
          >
            <div className="text-left space-y-3 sm:space-y-4 w-full sm:w-[90%] p-0 sm:p-[5%]">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Create | Share | Shine</h3>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base">
                Launch your creative journey and showcase your unique perspective to the world. Share your work, build
                your portfolio, and inspire others.
              </p>
            </div>
            <div
              className="hidden sm:block"
              style={{
                position: "relative",
                height: "70%",
                marginTop: "2rem",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop"
                alt="Mock 1"
                className="rounded-lg object-cover shadow-lg"
                style={{
                  position: "absolute",
                  width: "35%",
                  height: "70%",
                  top: 0,
                  left: 0,
                  zIndex: 2,
                  transform: "rotate(-3deg)",
                  marginLeft: "20%",
                }}
              />
              <img
                src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop"
                alt="Mock 2"
                className="rounded-lg object-cover shadow-md"
                style={{
                  position: "absolute",
                  width: "35%",
                  height: "70%",
                  bottom: 0,
                  right: 0,
                  zIndex: 1,
                  transform: "rotate(3deg)",
                  marginRight: "20%",
                }}
              />
            </div>
          </div>
          <div className="w-full sm:w-[30%]">
            <SignInSection onSubmit={handleSignup} />
          </div>
        </div>

        <div className="relative pointer-events-none px-4 sm:px-6 md:px-8" style={{ top: "-200px" }}>
          {[
            {
              title: "Promote your Business",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, and leverage our comprehensive tools and templates designed specifically for business growth. Reach your target audience more effectively with our advanced features and analytics.",
              imageSrc: "digna_audience_1.jpg",
              ribbonColor: "purple",
              horizontalPosition: "right",
              verticalPosition: "bottom",
            },
            {
              title: "Add Elements to Blogs",
              description:
                "Enhance your blog content with beautiful, professionally curated images and elements. Our vast collection of high-quality visuals will help you create engaging blog posts that captivate your readers and improve your content strategy.",
              imageSrc: "digna_audience_2.jpg",
              ribbonColor: "blue",
              horizontalPosition: "right",
              verticalPosition: "center",
            },
            {
              title: "For your Presentations",
              description:
                "Create stunning presentations with our curated collection of professional images and design elements. Whether you're pitching to investors, presenting to clients, or sharing with colleagues, find the perfect visuals to support your message.",
              imageSrc: "digna_audience_3.jpg",
              ribbonColor: "yellow",
              horizontalPosition: "left",
              verticalPosition: "center",
            },
            {
              title: "Governments & NGO",
              description:
                "Specialized solutions for government agencies and non-profit organizations. Access images and resources that help you communicate your mission effectively, build trust with stakeholders, and create compelling visual narratives for social impact.",
              imageSrc: "digna_audience_4.jpg",
              ribbonColor: "green",
              horizontalPosition: "right",
              verticalPosition: "center",
            },
            {
              title: "For Content Creators",
              description:
                "Empower your creative journey with an extensive library of high-quality images. Perfect for YouTubers, influencers, social media creators, and digital content producers. Find the visual assets that bring your creative vision to life.",
              imageSrc: "digna_audience_5.jpg",
              ribbonColor: "purple",
              horizontalPosition: "left",
              verticalPosition: "center",
            },
          ].map((fs, idx) => (
            <div key={fs.title} className={idx === 0 ? "" : "-mt-[20%] sm:-mt-[30%] md:-mt-[35%]"}>
              <FeatureSection
                title={fs.title}
                description={fs.description}
                imageSrc={fs.imageSrc}
                ribbonColor={fs.ribbonColor as any}
                horizontalPosition={fs.horizontalPosition as any}
                verticalPosition={fs.verticalPosition as any}
                showStripedRibbon = {false}
              />
            </div>
          ))}

          {/* Auth Section with Signup */}
          <div className="flex px-4 sm:px-6 md:px-8">
            <AuthSection onSignup={handleSignup} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
