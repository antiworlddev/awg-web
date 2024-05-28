"use client";

import ArtisteNav from "./ui/artiste-nav";
import Header from "./ui/header";
import HeroGrid from "./ui/hero-grid";
import HeroGrid2 from "./ui/hero-grid2";
import Discography from "./artiste/_ui/discography";
import { Vast_Shadow, Major_Mono_Display } from "next/font/google";
import { useAppContext } from "@/helpers/store";

const vast_shadow = Vast_Shadow({
  weight: "400",
  subsets: ["latin"],
  adjustFontFallback: true,
  fallback: ["mono"],
  display: "swap",
  style: "normal",
});
const major_mono_display = Major_Mono_Display({
  weight: "400",
  subsets: ["latin"],
  adjustFontFallback: true,
  fallback: ["mono"],
  display: "swap",
  style: "normal",
});

export default function Home() {
  const context = useAppContext();

  return (
    <main className="flex min-h-screen flex-col lg:items-start items-center w-full lg:px-24 md:px-12 px-6">
      <Header />
      <HeroGrid />
      <ArtisteNav font={vast_shadow.className} />
      <HeroGrid2 />
      <Discography
        font={major_mono_display.className}
        projects={context?.awgProjects}
      />
    </main>
  );
}
