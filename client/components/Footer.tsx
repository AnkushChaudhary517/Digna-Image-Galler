
export default function Footer() {

  return (<>
    <footer className="bg-primary text-primary-foreground" style={{ backgroundColor: '#2B21DA', color: 'white'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        {/* Top Section: Brand and Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-12 mb-6 sm:mb-8 md:mb-10">
          
          {/* Brand */}
          <div className="flex items-center gap-2 sm:gap-3 justify-center sm:justify-start">
            <svg 
              width="24" 
              height="24" 
              className="sm:w-[34.6px] sm:h-[35px] flex-shrink-0" 
              viewBox="0 0 34.6 35" 
              xmlns="http://www.w3.org/2000/svg" 
              aria-hidden
              style={{ width: '24px', height: '24px', maxWidth: 'none', flexShrink: 0 }}
            >
              <rect y="14.8223" width="34.6049" height="5.35578" fill="white" />
              <rect x="2.19531" y="27.8413" width="34.6049" height="5.35578" transform="rotate(-45 2.19531 27.8413)" fill="white" />
              <rect width="34.6049" height="5.35578" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 30.4512 27.8413)" fill="white" />
              <rect x="13.6445" y="34.8027" width="34.6049" height="5.35578" transform="rotate(-90 13.6445 34.8027)" fill="white" />
              <path d="M15.7919 11.2294C16.0134 10.7994 16.6283 10.7994 16.8499 11.2294L17.8124 13.0977C17.9456 13.3561 18.2459 13.4805 18.5228 13.392L20.5245 12.7515C20.9852 12.6041 21.42 13.0389 21.2726 13.4996L20.6321 15.5013C20.5435 15.7782 20.668 16.0785 20.9264 16.2117L22.7947 17.1742C23.2247 17.3958 23.2247 18.0106 22.7947 18.2322L20.9264 19.1947C20.668 19.3279 20.5435 19.6282 20.6321 19.9051L21.2726 21.9068C21.42 22.3676 20.9852 22.8023 20.5245 22.6549L18.5228 22.0145C18.2459 21.9259 17.9456 22.0503 17.8124 22.3087L16.8499 24.177C16.6283 24.607 16.0134 24.607 15.7919 24.177L14.8293 22.3087C14.6962 22.0503 14.3959 21.9259 14.119 22.0145L12.1173 22.6549C11.6565 22.8023 11.2217 22.3676 11.3692 21.9068L12.0096 19.9051C12.0982 19.6282 11.9738 19.3279 11.7154 19.1947L9.84711 18.2322C9.41706 18.0106 9.41706 17.3958 9.84711 17.1742L11.7154 16.2117C11.9738 16.0785 12.0982 15.7782 12.0096 15.5013L11.3692 13.4996C11.2217 13.0389 11.6565 12.6041 12.1173 12.7515L14.119 13.392C14.3959 13.4805 14.6962 13.3561 14.8293 13.0977L15.7919 11.2294Z" fill="#2B21DA" />
            </svg>
            <span 
              className="font-semibold" 
              style={{ 
                color: "#FFFFFF",
                fontFamily: "Sora, system-ui, sans-serif",
                fontSize: "clamp(16px, 1.8vw, 24px)",
                lineHeight: "100%",
                fontWeight: 600,
                letterSpacing: "0.01em"
              }}
            >
              DIGNA
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 justify-center sm:justify-end" style={{ color: "#FFFFFF" }}>
              <a
                href="/"
                className="min-h-[44px] flex items-center hover:opacity-80 transition-opacity"
                style={{ 
                  color: "#FFFFFF",
                  fontFamily: "Sora, system-ui, sans-serif",
                  fontSize: "18px",
                  lineHeight: "100%",
                  fontWeight: 400,
                  letterSpacing: "0.01em"
                }}
              >
                Home
              </a>
              <a
                href="/product"
                className="min-h-[44px] flex items-center hover:opacity-80 transition-opacity"
                style={{ 
                  color: "#FFFFFF",
                  fontFamily: "Sora, system-ui, sans-serif",
                  fontSize: "18px",
                  lineHeight: "100%",
                  fontWeight: 400,
                  letterSpacing: "0.01em"
                }}
              >
                Product
              </a>
              <a
                href="/creators"
                className="min-h-[44px] flex items-center hover:opacity-80 transition-opacity"
                style={{ 
                  color: "#FFFFFF",
                  fontFamily: "Sora, system-ui, sans-serif",
                  fontSize: "18px",
                  lineHeight: "100%",
                  fontWeight: 400,
                  letterSpacing: "0.01em"
                }}
              >
                Creators
              </a>
              <a 
                href="#" 
                className="min-h-[44px] flex items-center hover:opacity-80 transition-opacity hidden sm:flex" 
                style={{ 
                  color: "#FFFFFF",
                  fontFamily: "Sora, system-ui, sans-serif",
                  fontSize: "18px",
                  lineHeight: "100%",
                  fontWeight: 400,
                  letterSpacing: "0.01em"
                }}
              >
                License
              </a>
              <a 
                href="#" 
                className="min-h-[44px] flex items-center hover:opacity-80 transition-opacity" 
                style={{ 
                  color: "#FFFFFF",
                  fontFamily: "Sora, system-ui, sans-serif",
                  fontSize: "18px",
                  lineHeight: "100%",
                  fontWeight: 400,
                  letterSpacing: "0.01em"
                }}
              >
                Why Digna
              </a>
            </nav>
        </div>

        {/* Middle Section: Social Icons and Copyright */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-6 md:mb-8">
          {/* Social Icons */}
          <div className="flex items-center justify-center sm:justify-start overflow-x-auto sm:overflow-visible">
            <svg
              viewBox="0 0 1340 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto max-w-full"
              preserveAspectRatio="xMinYMid meet"
              style={{ minWidth: 'min(100%, 400px)' }}
            >
            <defs>
              <clipPath id="clip0_323_4161">
                <rect width="60" height="60" x="136" y="0" rx="12"/>
              </clipPath>
            </defs>
            {/* Email Icon */}
            <a href="mailto:contact@thedigna.com" target="_blank" rel="noopener noreferrer" style={{ cursor: 'pointer' }}>
              <rect width="60" height="60" rx="12" fill="#FFFCF3" />
              <path
                d="M34.041 31.1333L31.754 33.428C30.8266 34.3587 29.1948 34.3787 28.2474 33.428L25.9603 31.1333L17.7461 39.3742C18.0519 39.5155 18.389 39.5999 18.7474 39.5999L41.254 39.5999C41.6124 39.5999 41.9495 39.5156 42.2551 39.3742L34.041 31.1333Z"
                fill="#2B21DA"
              />
              <path
                d="M41.2543 20.3999L18.7477 20.3999C18.3893 20.3999 18.0521 20.4843 17.7465 20.6257L26.5239 29.4322C26.5245 29.4328 26.5252 29.4329 26.5258 29.4335C26.5262 29.4339 26.5264 29.4344 26.5265 29.4349L29.3805 32.2984C29.6837 32.6015 30.3184 32.6015 30.6216 32.2984L33.475 29.4354C33.475 29.4354 33.4757 29.4341 33.4763 29.4335C33.4763 29.4335 33.4776 29.4328 33.4782 29.4322L42.2554 20.6256C41.9497 20.4842 41.6127 20.3999 41.2543 20.3999ZM16.6029 21.7445C16.4447 22.0644 16.3477 22.4195 16.3477 22.7999L16.3477 37.1999C16.3477 37.5803 16.4446 37.9354 16.6029 38.2553L24.8313 30.0002L16.6029 21.7445ZM43.3991 21.7444L35.1708 30.0002L43.3991 38.2554C43.5573 37.9355 43.6543 37.5804 43.6543 37.1999L43.6543 22.7999C43.6543 22.4194 43.5573 22.0643 43.3991 21.7444Z"
                fill="#2B21DA"
              />
            </a>
            {/* X/Twitter Icon - keeping for now but not linking */}
            {/* <rect x="68" width="60" height="60" rx="12" fill="#FFFCF3" />
            <path
              d="M100.234 28.1624L108.976 18H106.905L99.3137 26.8238L93.2507 18H86.2578L95.4262 31.3432L86.2578 42H88.3296L96.3459 32.6817L102.749 42H109.742L100.234 28.1624Z"
              fill="#2B21DA"
            /> */}
            {/* Instagram Icon */}
            <a href="https://www.instagram.com/the_digna/" target="_blank" rel="noopener noreferrer" style={{ cursor: 'pointer' }}>
              <rect x="136" width="60" height="60" rx="12" fill="#FFFCF3" />
              <g clipPath="url(#clip0_323_4161)">
                <path
                  d="M172.399 17.2002L159.599 17.2002C156.079 17.2002 153.199 20.0804 153.199 23.6V36.4003C153.199 39.919 156.079 42.8002 159.599 42.8002L172.399 42.8002C175.918 42.8002 178.799 39.919 178.799 36.4003V23.6C178.799 20.0804 175.918 17.2002 172.399 17.2002ZM176.665 36.4003C176.665 38.7523 174.752 40.6668 172.399 40.6668L159.599 40.6668C157.247 40.6668 155.333 38.7523 155.333 36.4003V23.6C155.333 21.2475 157.247 19.3336 159.599 19.3336L172.399 19.3336C174.752 19.3336 176.665 21.2475 176.665 23.6V36.4003Z"
                  fill="#2B21DA"
                />
                <path
                  d="M172.932 24.6667C173.816 24.6667 174.532 23.9504 174.532 23.0668C174.532 22.1831 173.816 21.4668 172.932 21.4668C172.048 21.4668 171.332 22.1831 171.332 23.0668C171.332 23.9504 172.048 24.6667 172.932 24.6667Z"
                  fill="#2B21DA"
                />
                <path
                  d="M165.999 23.6001C162.464 23.6001 159.6 26.465 159.6 29.9999C159.6 33.5336 162.464 36.4004 165.999 36.4004C169.534 36.4004 172.399 33.5336 172.399 29.9999C172.399 26.465 169.534 23.6001 165.999 23.6001ZM165.999 34.267C163.643 34.267 161.733 32.3567 161.733 29.9999C161.733 27.6432 163.643 25.7335 165.999 25.7335C168.356 25.7335 170.266 27.6432 170.266 29.9999C170.266 32.3567 168.356 34.267 165.999 34.267Z"
                  fill="#2B21DA"
                />
              </g>
            </a>
            {/* Other Icon - keeping for now but not linking */}
            {/* <rect x="204" width="60" height="60" rx="12" fill="#FFFCF3" />
            <path
              d="M232.23 34.1322C231.558 37.6562 230.737 41.0352 228.305 42.8002C227.554 37.4732 229.407 33.4727 230.267 29.2258C228.8 26.7558 230.444 21.7858 233.538 23.0108C237.346 24.5168 230.241 32.1922 235.011 33.1507C239.991 34.1512 242.023 24.5103 238.936 21.3753C234.474 16.8478 225.948 21.2718 226.996 27.7538C227.251 29.3383 228.889 29.8193 227.651 32.0057C224.795 31.3728 223.943 29.1208 224.052 26.1183C224.229 21.2033 228.468 17.7623 232.721 17.2863C238.098 16.6843 243.145 19.2603 243.842 24.3193C244.627 30.0288 241.415 36.2122 235.665 35.7677C234.106 35.6467 233.452 34.8742 232.23 34.1322Z"
              fill="#2B21DA"
            /> */}
            {/* LinkedIn Icon */}
            <a href="https://www.linkedin.com/company/thedigna/posts/?feedView=all" target="_blank" rel="noopener noreferrer" style={{ cursor: 'pointer' }}>
              <rect x="272" width="60" height="60" rx="12" fill="#FFFCF3" />
              <path
                d="M295.383 42H290.409V25.977H295.383V42ZM292.893 23.79C292.321 23.7923 291.761 23.625 291.283 23.3089C290.806 22.9929 290.433 22.5425 290.212 22.0146C289.99 21.4867 289.93 20.905 290.039 20.3431C290.149 19.7811 290.422 19.2642 290.825 18.8575C291.228 18.4508 291.742 18.1727 292.303 18.0584C292.864 17.944 293.446 17.9985 293.976 18.2149C294.506 18.4314 294.96 18.8001 295.28 19.2745C295.601 19.7488 295.773 20.3075 295.776 20.88C295.778 21.6476 295.476 22.3846 294.935 22.9299C294.395 23.4752 293.661 23.7844 292.893 23.79ZM314.013 42H309.042V34.2C309.042 32.34 309.006 29.955 306.456 29.955C303.906 29.955 303.456 31.977 303.456 34.065V42H298.503V25.977H303.276V28.161H303.345C304.008 26.901 305.631 25.572 308.052 25.572C313.086 25.572 314.013 28.89 314.013 33.198V42Z"
                fill="#2B21DA"
              />
            </a>
            {/* YouTube Icon */}
            <a href="https://www.youtube.com/@thedigna" target="_blank" rel="noopener noreferrer" style={{ cursor: 'pointer' }}>
              <rect x="340" width="60" height="60" rx="12" fill="#FFFCF3" />
              <path
                d="M383.146 23.4042C382.83 22.2294 381.904 21.3034 380.729 20.987C378.584 20.3999 370 20.3999 370 20.3999C370 20.3999 361.417 20.3999 359.271 20.9648C358.119 21.2808 357.17 22.2297 356.854 23.4042C356.289 25.5499 356.289 29.9999 356.289 29.9999C356.289 29.9999 356.289 34.4723 356.854 36.5956C357.17 37.7702 358.096 38.6963 359.271 39.0126C361.439 39.5999 370 39.5999 370 39.5999C370 39.5999 378.584 39.5999 380.729 39.035C381.904 38.7188 382.83 37.7928 383.147 36.6182C383.711 34.4723 383.711 30.0225 383.711 30.0225C383.711 30.0225 383.734 25.5499 383.146 23.4042ZM367.267 34.1109V25.8888L374.405 29.9999L367.267 34.1109Z"
                fill="#2B21DA"
              />
            </a>
          </svg>
          </div>
          
          {/* Copyright */}
          <div className="flex items-center justify-center sm:justify-end">
            <p 
              className="text-center sm:text-right" 
              style={{ 
                margin: 0,
                fontFamily: "Sora, system-ui, sans-serif",
                fontWeight: 400,
                fontStyle: "normal",
                fontSize: "18px",
                lineHeight: "100%",
                letterSpacing: "0.01em",
                color: "#FFFFFF"
              }}
            >
              All rights reserved - Digna © 2025
            </p>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}