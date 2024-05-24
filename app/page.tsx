import ArtisteNav from "./ui/artiste-nav";
import Header from "./ui/header";
import HeroGrid from "./ui/hero-grid";
import { Vast_Shadow } from "next/font/google";

const vast_shadow = Vast_Shadow({
  weight: "400",
  subsets: ["latin"],
  adjustFontFallback: true,
  fallback: ["mono"],
  display: "swap",
  style: "normal",
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col lg:items-start items-center w-full lg:px-24 md:px-12 px-6">
      <Header />
      <HeroGrid />
      <ArtisteNav font={vast_shadow.className} />
    </main>
  );
}
