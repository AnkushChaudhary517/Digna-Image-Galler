import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ImageGrid from "@/components/ImageGrid";
import Footer from "@/components/Footer";
import { imageAPI as importedImageAPI } from "@/services/api";

export default function HomeComponent() {
  const heading = "India, for Indians, Through Indian Eyes";
  const description =
    "Instant Image search or identification powered by the India's largest collection of Images";

  // responsive heading and description (minimal changes)
  const headingStyle: React.CSSProperties = {
    fontFamily: "Sora, system-ui, sans-serif",
    fontWeight: 500,
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

  const tags = ["Nature", "Portrait", "Architecture", "Food", "Animals", "Travel"];
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = async (q = null) => {
    try {
      const results: any = await importedImageAPI.searchImages(q ?? query);
      console.log("Search results:", results);
      setSearchResults(results?.data || []);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <main className="flex-1">
      <Header
        heading={heading}
        description={description}
        headingStyle={headingStyle}
        descriptionStyle={descriptionStyle}
      />

      {/* Search block overlapped over Header (pulled up) */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          
          justifyContent: "center",
         // marginTop: "clamp(-120px, -25vh, -48px)", // responsive to viewport height
          position: "relative",
          zIndex: 60,
          pointerEvents: "auto",
          paddingLeft: 16,
          paddingRight: 16,
          boxSizing: "border-box",
        }}
        className="sm:-mt-[160px]"
      >
        <div
          style={{
            width: "clamp(300px, 94vw, 772px)",
            minHeight: "48px",
            height: "auto",
            borderRadius: 16,
            paddingTop: "clamp(8px, 1.5vw, 12px)",
            paddingRight: "clamp(12px, 2vw, 16px)",
            paddingBottom: "clamp(8px, 1.5vw, 12px)",
            paddingLeft: "clamp(12px, 2vw, 16px)",
            gap: "clamp(8px, 1.5vw, 12px)",
            background: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            boxSizing: "border-box",
            boxShadow: "0 8px 24px rgba(11,16,51,0.12)",
            maxWidth: "100%",
          }}
          role="search"
          aria-label="Image search"
        >
          {/* search icon (28x28) */}
          <svg
            width="24"
            height="24"
            className="sm:w-7 sm:h-7 flex-shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
            style={{ width: 'clamp(20px, 4vw, 28px)', height: 'clamp(20px, 4vw, 28px)', flexShrink: 0 }}
          >
            <path
              d="M21 21L16.65 16.65"
              stroke="#606060"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="11"
              cy="11"
              r="6"
              stroke="#606060"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* helper text: make flexible */}
          <input
            type="text"
            placeholder="Search images, tags or identify visually"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              fontFamily: "Sora, system-ui, sans-serif",
              fontSize: "clamp(14px, 2vw, 16px)",
              fontWeight: 400,
              lineHeight: "23px",
              letterSpacing: "0.01em",
              color: "#333",
              paddingRight: 12,
              minWidth: 0,
              background: "transparent",
            }}
          />

          {/* "or Search by Image" link */}
          <a
            href="#"
            className="hidden sm:inline-flex items-center ml-2 sm:ml-4 flex-shrink-0 text-sm sm:text-base"
            style={{
              height: 23,
              fontFamily: "Sora, system-ui, sans-serif",
              fontWeight: 500,
              lineHeight: "23px",
              color: "#2B21DA",
              textDecoration: "none",
            }}
          >
            or Search by Image
          </a>

          {/* right svg icon (50x50) with primary color and white border */}
          <div
            style={{
              width: "clamp(36px, 8vw, 46px)",
              height: "clamp(36px, 8vw, 46px)",
              borderRadius: "12px",
              background: "#2B21DA",
              border: "2px solid #FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxSizing: "border-box",
              marginLeft: "clamp(6px, 1.5vw, 8px)",
              flexShrink: 0,
            }}
            aria-hidden
          >
            {/* simple image/upload icon in white */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: 'clamp(16px, 3.5vw, 20px)', height: 'clamp(16px, 3.5vw, 20px)' }}
            >
              <path
                d="M4 17.5V7.5C4 6.67157 4.67157 6 5.5 6H18.5C19.3284 6 20 6.67157 20 7.5V17.5"
                stroke="#FFFFFF"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 11V3"
                stroke="#FFFFFF"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 11L12 7L16 11"
                stroke="#FFFFFF"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect x="7" y="14" width="10" height="4" rx="1" fill="#FFFFFF" opacity="0.12" />
            </svg>
          </div>
        </div>
         {/* Tags row below search bar: flexible, max 4 items per row */}
      <div
        className="w-full flex justify-center"
        style={{ marginTop: 10, zIndex: 60, position: "relative", paddingLeft: 12, paddingRight: 12, boxSizing: "border-box" }}
      >
        <div
          style={{
            width: "clamp(260px, 94vw, 608px)",
            minHeight: 45,
            gap: 8,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: "100%",
          }}
        >
          {tags.map((t) => (
            <button
              onClick={(e) => handleSearch(t)}
              key={t}
              style={{
                height: 36,
                padding: "0 12px",
                borderRadius: 12,
                background: "rgba(255,255,255,0.12)",
                color: "#FFFFFF",
                border: "1px solid rgba(255,255,255,0.08)",
                fontFamily: "Sora, system-ui, sans-serif",
                fontSize: 13,
                lineHeight: "18px",
                fontWeight: 400,
                margin: 6,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                boxSizing: "border-box",
                cursor: "pointer",
                minWidth: 64,
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      </div>

     

      {/* keep ImageGrid and its logic exactly as before */}
      <ImageGrid images={searchResults} />
      <Footer></Footer>
    </main>
  );
}