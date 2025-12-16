import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Use this around top-level content in pages and large sections.
 * Keeps consistent mobile-first padding + max width.
 */
export default function ResponsiveContainer({ children, className = "" }: Props) {
  return (
    <div className={`w-full px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </div>
  );
}