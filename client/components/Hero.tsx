import { Search, Image } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 py-12 sm:py-16 md:py-24">
      {/* Decorative patterns */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,transparent_20%,#3b82f6_100%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,transparent_30%,#3b82f6_100%)]"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 leading-tight">
          India<span className="text-foreground/70">, for Indians,</span> Through{" "}
          <span className="text-white">Indian Eyes</span>
        </h1>

        {/* Subheading */}
        <p className="text-foreground/80 text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
          Instant image search or identification powered by the India's largest collection of images
        </p>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="flex-1 flex items-center bg-white rounded-full px-4 sm:px-6 py-2.5 sm:py-3 shadow-lg min-h-[44px]">
            <Search className="text-gray-400 mr-2 sm:mr-3 flex-shrink-0" size={18} />
            <input
              type="text"
              placeholder="Search quick free stock image"
              className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-500 text-sm sm:text-base"
            />
          </div>
          <button 
            style={{
              backgroundColor: "#2B21DA",
              color: "#FFFFFF",
              fontFamily: "Sora, system-ui, sans-serif",
              fontSize: "15px",
              lineHeight: "20px",
              fontWeight: 500,
            }}
            className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium whitespace-nowrap hover:bg-[#2319b5] transition-colors flex items-center justify-center gap-2 shadow-lg min-h-[44px]"
          >
            <Image size={18} className="sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Search by Image</span>
            <span className="sm:hidden">Search</span>
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          <button 
            style={{
              fontFamily: "Sora, system-ui, sans-serif",
              fontSize: "13px",
              lineHeight: "18px",
              fontWeight: 400,
            }}
            className="px-4 sm:px-6 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors font-medium border border-white/20 min-h-[36px] sm:min-h-[40px]"
          >
            Creatives
          </button>
          <button 
            style={{
              fontFamily: "Sora, system-ui, sans-serif",
              fontSize: "13px",
              lineHeight: "18px",
              fontWeight: 400,
            }}
            className="px-4 sm:px-6 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors font-medium border border-white/20 min-h-[36px] sm:min-h-[40px]"
          >
            Editioned
          </button>
          <button 
            style={{
              fontFamily: "Sora, system-ui, sans-serif",
              fontSize: "13px",
              lineHeight: "18px",
              fontWeight: 400,
            }}
            className="px-4 sm:px-6 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors font-medium border border-white/20 min-h-[36px] sm:min-h-[40px]"
          >
            Photographic
          </button>
          <button 
            style={{
              fontFamily: "Sora, system-ui, sans-serif",
              fontSize: "13px",
              lineHeight: "18px",
              fontWeight: 400,
            }}
            className="px-4 sm:px-6 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors font-medium border border-white/20 min-h-[36px] sm:min-h-[40px]"
          >
            Architecture
          </button>
        </div>
      </div>
    </div>
  );
}
