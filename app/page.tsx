import ArtisteNav from "./ui/artiste-nav";
import Header from "./ui/header";
import HeroGrid from "./ui/hero-grid";
import HeroGrid2 from "./ui/hero-grid2";
import Discography from "./artiste/_ui/discography";
import { Vast_Shadow, Major_Mono_Display } from "next/font/google";

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

export default async function Home() {
  const res = await fetch(
    "http:localhost:3000/api/get-artiste-albums?artistId=4em6zsRUNAPC2YTfqdCpow"
  );

  const data = await res.json();

  const artisteProjects = data?.items?.map((item: any) => {
    return {
      project: item?.album_group,
      title: item?.name,
      art: item?.images[1]?.url,
      artist: item?.artists?.map((a: any) => a.name)?.join(" & "),
      link: item?.external_urls?.spotify,
    };
  });

  return (
    <main className="flex min-h-screen flex-col lg:items-start items-center w-full lg:px-24 md:px-12 px-6">
      <Header />
      <HeroGrid />
      <ArtisteNav font={vast_shadow.className} />
      <HeroGrid2 />
      <Discography
        font={major_mono_display.className}
        projects={artisteProjects}
      />
    </main>
  );
}
