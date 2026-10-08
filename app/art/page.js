import ArtHero from "@/components/art/ArtHero";
import ArtNavbar from "@/components/art/ArtNavbar";
import { ArtAbout, ArtBook, ArtFollow, ArtFooter, ArtTicker, ArtWatch } from "@/components/art/ArtSections";
import { RoughFilter } from "@/components/art/Riso";
import Hero from "@/components/Hero";

export default function ArtPage() {
  return (
    <>
      <RoughFilter />
      <main>
        {/* <ArtHero /> */}
        <ArtNavbar />
        <Hero />
        <ArtTicker />
        <ArtAbout />
        <ArtWatch />
        <ArtFollow />
        <ArtBook />
      </main>
      <ArtFooter />
    </>
  );
}
