import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import HowItWorks from "@/components/HowItWorks";
import CastPreview from "@/components/CastPreview";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import ServiceAreas from "@/components/ServiceAreas";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <Services />
        <WhyChooseUs />
        <HowItWorks />
        <CastPreview />
        <Pricing />
        <Testimonials />
        <ServiceAreas />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
