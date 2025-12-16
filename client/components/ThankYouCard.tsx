import React from "react";

interface ThankYouCardProps {
  onSkipClick?: () => void;
  onEditProfileClick?: () => void;
}

export default function ThankYouCard({
  onSkipClick,
  onEditProfileClick,
}: ThankYouCardProps) {
  return (
    <div className="w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
      {/* Decorative Top Wave - Orange/Yellow/Blue */}
      <div className="relative h-24 bg-gradient-to-r from-blue-600 via-yellow-400 to-orange-500">
        <svg
          viewBox="0 0 1200 120"
          className="absolute -bottom-1 w-full h-16"
          preserveAspectRatio="none"
        >
          <path
            d="M 0,40 Q 300,80 600,40 T 1200,40 L 1200,120 L 0,120 Z"
            fill="white"
          />
        </svg>
      </div>

      {/* Decorative Top Right Pattern */}
      <div className="absolute top-6 right-6 opacity-10">
        <div className="w-20 h-20 border-2 border-gray-300 rounded-lg" />
        <div className="w-20 h-20 border-2 border-gray-300 rounded-lg mt-2" />
      </div>

      {/* Decorative Bottom Left Pattern */}
      <div className="absolute bottom-6 left-6 opacity-10">
        <div className="w-16 h-16 border-2 border-gray-300 rounded-lg" />
        <div className="w-16 h-16 border-2 border-gray-300 rounded-lg mt-2" />
      </div>

      {/* Content */}
      <div className="relative px-8 pt-8 pb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
          Thank you for confirming your email.
        </h2>

        <p className="text-center text-gray-600 mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna
        </p>

        <div className="flex gap-4">
          <button
            onClick={onSkipClick}
            className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-full font-semibold hover:bg-gray-400 transition-colors"
          >
            Skip
          </button>
          <button
            onClick={onEditProfileClick}
            className="flex-1 bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Decorative Bottom Wave - Orange/Yellow/Blue */}
      <div className="relative h-24 bg-gradient-to-r from-blue-600 via-yellow-400 to-orange-500">
        <svg
          viewBox="0 0 1200 120"
          className="absolute -top-1 w-full h-16"
          preserveAspectRatio="none"
        >
          <path
            d="M 0,80 Q 300,40 600,80 T 1200,80 L 1200,0 L 0,0 Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
}
