import React from "react";
import HeaderBanner from "@/components/HeaderBanner";

export default function BannerPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <HeaderBanner />
      <div className="max-w-4xl mx-auto py-12 px-6">
        <h2 className="text-2xl font-semibold mb-4">Banner details</h2>
        <p className="text-gray-700">
          This page demonstrates the header background component. Use this page
          to preview or iterate on the header visual.
        </p>
      </div>
    </main>
  );
}