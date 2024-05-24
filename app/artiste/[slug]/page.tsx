"use client";

import Header from "@/app/ui/header";
import React from "react";
import ArtisteInfo from "../_ui/artiste-info";
import { useAppContext } from "@/helpers/store";
import { generateSlug } from "@/helpers/functions";
import { Vast_Shadow, Major_Mono_Display } from "next/font/google";
import Discography from "../_ui/discography";
import ArtisteMerch from "../_ui/artiste-merch";

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

export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const context = useAppContext();
  const artiste = context?.artistes?.find(
    (a) => generateSlug(a.name) === slug
  ) || { bio: "", image1: "", name: "" };

  const artisteMerch = context?.all_merch?.filter(
    (m) => generateSlug(m.artiste ?? "") === slug
  );

  return (
    <div className="flex min-h-screen flex-col w-full lg:px-24 px-6">
      <Header />
      <ArtisteInfo
        bio={artiste?.bio}
        image2={artiste?.image2}
        name={artiste?.name}
        font={vast_shadow.className}
        socials={artiste?.socials}
      />
      <Discography
        font={major_mono_display.className}
        projects={artiste?.projects ?? []}
      />
      <ArtisteMerch merch={artisteMerch} />
    </div>
  );
}
