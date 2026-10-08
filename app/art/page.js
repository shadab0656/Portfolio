import ArtHero from "@/components/art/ArtHero";
import { ArtAbout, ArtBook, ArtFollow, ArtFooter, ArtTicker, ArtWatch } from "@/components/art/ArtSections";
import { RoughFilter } from "@/components/art/Riso";

export default function ArtPage() {
  return (
    <>
      <RoughFilter />
      <main>
        <ArtHero />
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
