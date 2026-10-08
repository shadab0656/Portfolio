import ArtNavbar from "@/components/art/ArtNavbar";
import ArtShell from "@/components/art/ArtShell";
import { ArtAbout, ArtBook, ArtFollow, ArtFooter, ArtTicker, ArtWatch } from "@/components/art/ArtSections";
import { RoughFilter } from "@/components/art/Riso";
import Hero from "@/components/Hero";
import JsonLd from "@/components/JsonLd";
import { bookingService, graph, person, website } from "@/lib/schema";

export default function Home() {
  return (
    <ArtShell tone="dark">
      <JsonLd data={graph(website, person, bookingService())} />
      <RoughFilter />
      <ArtNavbar />
      <main>
        <Hero />
        <ArtTicker />
        <ArtAbout />
        <ArtWatch />
        <ArtFollow />
        <ArtBook />
      </main>
      <ArtFooter />
    </ArtShell>
  );
}
