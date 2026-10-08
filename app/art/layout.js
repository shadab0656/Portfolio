import ArtShell from "@/components/art/ArtShell";

export const metadata = {
  title: { absolute: "Shadab Hussain | Stand-up Comedian (poster edition)" },
  // Draft design: keep it out of search results until it replaces the main page
  robots: { index: false, follow: false },
};

export const viewport = {
  themeColor: "#EFE8D8",
};

export default function ArtLayout({ children }) {
  return <ArtShell>{children}</ArtShell>;
}
