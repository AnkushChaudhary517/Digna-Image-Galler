// ActionButtons.jsx
import "./ActionButton.css";

export default function ActionButtons() {
  return (
    <div className="frame">
      <div className="iconBox">
        {/* Download Icon */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="icon"
        >
          <path
            d="M12 3V15M12 15L8 11M12 15L16 11M4 21H20"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="iconBox">
        {/* Heart Icon */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="icon"
        >
          <path
            d="M12 21s-6.5-4.35-9-8.5C1.5 9 3.5 5 7.5 5c2.1 0 3.4 1.2 4.5 2.7C13.1 6.2 14.4 5 16.5 5c4 0 6 4 4.5 7.5-2.5 4.15-9 8.5-9 8.5z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
