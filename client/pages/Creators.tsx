import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthSection from "@/components/AuthSection";
import ColorRibbon from "@/components/ColorRibbon";
import SignupCard from "@/components/SignupCard";
import CreatorCard from "@/components/CreatorCard";
import SignInSection from "@/components/SignInSection";

export default function Creators() {
  const heading = "Digna For Creators";
  const description =
    "How image creators are shaping the future of visual content";

  // explicit styles per your spec (these will override Header defaults)
  const headingStyle: React.CSSProperties = {
    fontFamily: "Sora, system-ui, sans-serif",
    fontWeight: 700,
    fontSize: "clamp(28px, 5vw, 60px)",
    lineHeight: "clamp(32px, 5.5vw, 100%)",
    verticalAlign: "middle",
    horizontalAlign: "center",
    color: "#FFFFFF",
    width: "100%",
    maxWidth: "90%",
  };

  const descriptionStyle: React.CSSProperties = {
    fontFamily: "'Work Sans', system-ui, sans-serif",
    fontWeight: 400,
    fontSize: "clamp(14px, 1.6vw, 20px)",
    lineHeight: "clamp(18px, 2.2vw, 26px)",
    letterSpacing: "0.01em",
    textAlign: "center",
    color: "#FFFFFF",
    width: "100%",
    maxWidth: "90%",
  };
  const handleSignup = (data: {
    email: string;
    password: string;
    name: string;
  }) => {
    console.log("Creator signup data:", data);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header
        heading={heading}
        description={description}
        headingStyle={headingStyle}
        descriptionStyle={descriptionStyle}
      ></Header>

      <main className="flex-1" style={{ backgroundColor: "white" }}>
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
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                Create | Share | Shine
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base">
                Launch your creative journey and showcase your unique
                perspective to the world. Share your work, build your
                portfolio, and inspire others.
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
                  marginLeft:"20%",
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
                  marginRight:"20%",
                }}
              />
            </div>
          </div>

          {/* Replaced inline sign-in markup with reusable component */}
          <div className="w-full sm:w-[30%]">
            <SignInSection onSubmit={handleSignup} />
          </div>
        </div>

        {/* Feature Cards */}
        <CreatorCard
          title="Share your Creativity with the World"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, and leverage our comprehensive tools to share your work globally. Reach creative minds and build an engaged community around your unique perspective and artistic vision."
          imageSrc="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
          imageAlt="Share creativity"
          position="left"
        />

        {/* <ColorRibbon color="blue" height={80} /> */}

        <CreatorCard
          title="Verify If People Want to use your Work"
          description="Understand demand for your creations with real-time analytics and licensing tracking. Know exactly how your work is being used, by whom, and ensure proper attribution and compensation for your creative efforts."
          imageSrc="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop"
          imageAlt="Verify work"
          position="right"
        />

        {/* <ColorRibbon color="yellow" height={80} /> */}

        <CreatorCard
          title="Build your Creator Portfolio"
          description="Create a stunning portfolio that showcases your best work. Organize your images by projects, create collections, and present your skills in a professional way that impresses potential clients, collaborators, and fans."
          imageSrc="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
          imageAlt="Creator portfolio"
          position="left"
        />

        {/* <ColorRibbon color="purple" height={80} /> */}

        <CreatorCard
          title="Model Yourself"
          description="Craft your personal brand and professional identity. Customize your profile with a bio, showcase your expertise, connect with your audience, and establish yourself as an authority in your creative niche."
          imageSrc="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop"
          imageAlt="Model yourself"
          position="right"
        />

        {/* <ColorRibbon color="green" height={80} /> */}

        <CreatorCard
          title="Show your Editing and Design Skills"
          description="Highlight your technical expertise and creative skills. Showcase your editing techniques, design capabilities, and artistic process. Build credibility with potential clients and establish yourself as a skilled professional in your field."
          imageSrc="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
          imageAlt="Design skills"
          position="left"
        />

        <ColorRibbon color="orange" height={80} />

        {/* Auth/Signup Section */}
        <AuthSection
          title="By Signing up with Digna, you can"
          subtitle="Unlock exclusive creator tools and features designed to help you succeed in the digital creative economy."
          onSignup={handleSignup}
        />
      </main>

      <Footer />
    </div>
  );
}
