import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ImageGrid from "@/components/ImageGrid";
import Footer from "@/components/Footer";
import HeaderBanner from "@/components/HeaderBanner";

export default function Index() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header/>
      <main className="flex-1">
        <Hero />
        <ImageGrid />
      </main>
      <Footer />
    </div>
  );
}
