import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PopularCategories from "@/components/PopularCategories";
import WhyChooseUs from "@/components/WhyChooseUs";
import ConversionBanner from "@/components/ConversionBanner";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Golu Camera Rental House | Camera Rental in Chas, Bokaro",
  description:
    "Rent professional cameras, lenses, gimbals, drones, and lighting in Chas, Bokaro. Quality-checked gear, flexible rental plans, and fast WhatsApp support.",
};

export default function Home() {
  return (
    <>
      {/* Accessibility: skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-gray-900 focus:shadow-lg"
      >
        Skip to content
      </a>

      <Header />

      <main id="main-content" className="flex min-h-screen flex-col">
        <Hero />
        <PopularCategories />
        <WhyChooseUs />
        <ConversionBanner />
      </main>

      <Footer />
    </>
  );
}