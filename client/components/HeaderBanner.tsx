import React from "react";

export default function HeaderBanner() {
  return (
    <section
      aria-label="Header banner"
      className="w-full relative overflow-hidden"
      style={{
        height: 545,
        background: "linear-gradient(180deg, #001C6F 0%, #003BE6 136.97%)",
      }}
    >
      {/* left blurred ellipse */}
      <div
        aria-hidden
        className="absolute -left-20 -top-8 w-[150px] h-[150px] rounded-full"
        style={{ background: "#2B21DA", filter: "blur(132px)" }}
      />

      {/* right blurred ellipse */}
      <div
        aria-hidden
        className="absolute -right-10 -bottom-16 w-[150px] h-[150px] rounded-full"
        style={{ background: "#2B21DA", filter: "blur(132px)" }}
      />

      {/* decorative curved strokes (centered) */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 pointer-events-none">
        <svg
          width="756"
          height="493"
          viewBox="0 0 756 493"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block"
        >
          <path
            d="M57.8284 467C-43.6537 224.894 111.42 31.7433 323.91 50.2035C536.4 68.6639 679.918 -36.5009 729.971 -208"
            stroke="url(#paint0_linear_326_5783)"
            strokeWidth="51.9548"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient
              id="paint0_linear_326_5783"
              x1="693.542"
              y1="-202"
              x2="363.542"
              y2="159.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#039BE5" />
              <stop offset="1" stopColor="#EFFF00" />
            </linearGradient>
          </defs>
        </svg>

        <svg
          width="704"
          height="491"
          viewBox="0 0 704 491"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="-mt-10 block"
        >
          <path
            d="M5.85766 465C-95.6245 222.534 59.4495 29.0982 271.94 47.5859C484.429 66.0734 627.947 -39.247 678 -211"
            stroke="url(#paint0_linear_326_5781)"
            strokeWidth="51.9548"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient
              id="paint0_linear_326_5781"
              x1="651.572"
              y1="-131"
              x2="373.572"
              y2="106"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#06EE40" />
              <stop offset="0.370192" stopColor="#F5F7F6" />
              <stop offset="0.668269" stopColor="#13A5DE" />
              <stop offset="1" stopColor="#243E92" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* content container */}
      <div className="relative max-w-[1340px] w-full mx-auto px-6 flex flex-col items-center justify-center text-center h-full">
        <div className="bg-transparent">
          <h1
            className="font-extrabold text-[60px] leading-[76px] text-white"
            style={{ fontFamily: "Sora, system-ui, sans-serif" }}
          >
            Digna For Creators
          </h1>
          <p className="mt-4 text-[20px] text-white max-w-[980px]">
            How Image Creators are Shaping the Future of Visual Content
          </p>

          <div className="mt-8">
            <a
              href="/product"
              className="inline-block bg-white text-[#0C1633] px-6 py-3 rounded-lg font-medium"
            >
              Explore Product
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}