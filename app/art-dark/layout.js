import ArtShell from "@/components/art/ArtShell";

export const metadata = {
  title: { absolute: "Shadab Hussain | Stand-up Comedian (poster edition, dark)" },
  // Draft design: keep it out of search results until it replaces the main page
  robots: { index: false, follow: false },
};

export const viewport = {
  themeColor: "#131115",
};

export default function ArtDarkLayout({ children }) {
  return <ArtShell tone="dark">{children}</ArtShell>;
}
