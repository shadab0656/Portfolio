import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Experience from "@/components/Experience";
import VideoShowcase from "@/components/VideoShowcase";
import SocialProof from "@/components/SocialProof";
import AreasServed from "@/components/AreasServed";
import Faq from "@/components/Faq";
import BookingSection from "@/components/BookingSection";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { homeFaq } from "@/lib/cities";
import { bookingService, faqPage, graph, person, website } from "@/lib/schema";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <>
      <JsonLd data={graph(website, person, bookingService(), faqPage(homeFaq, `${site.url}/`))} />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Experience />
        <VideoShowcase />
        <SocialProof />
        <AreasServed index="04" />
        <Faq index="05" title={<>Booking questions, <span className="italic text-cream/45">answered.</span></>} items={homeFaq} />
        <BookingSection index="06" />
      </main>
      <Footer />
    </>
  );
}
