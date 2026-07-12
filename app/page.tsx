import Hero from "@/components/Hero";
import ContactUs from "@/components/ContactUs";
import Blog from "@/components/Blog";
import ServicesPricing from "@/components/ServicesPricing";
import ServicesList from "@/components/ServicesList";
import Testimonial from "@/components/Testimonial";
import Mission from "@/components/Mission";
import Faq from "@/components/Faq";
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
      <FullStackCourse />
      <ContactUs />
    </main>
  );
}
