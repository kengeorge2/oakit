import Hero from "@/components/Hero";
import ContactUs from "@/components/ContactUs";
import Blog from "@/components/Blog";
import ServicesPricing from "@/components/ServicesPricing";
import ServicesList from "@/components/ServicesList";
import Testimonial from "@/components/Testimonial";
import Mission from "@/components/Mission";
import Faq from "@/components/Faq";
import DesktopDownload from "@/components/DesktopDownload";
import FullStackCourse from "@/components/FullStackCourse";

export const revalidate = 3600;

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <Hero />
      <ServicesPricing />
      <ServicesList />
      <Testimonial />
      <Blog />
      <Mission />
      <Faq />
      <DesktopDownload />
      <FullStackCourse />
      <ContactUs />
    </main>
  );
}

// Deploy trigger 1786609339
