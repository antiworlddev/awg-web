"use client";

import Header from "@/app/ui/header";
import ArtisteInfo from "../_ui/artiste-info";
import { useAppContext } from "@/helpers/store";
import { generateSlug } from "@/helpers/functions";
import { Vast_Shadow, Major_Mono_Display } from "next/font/google";
import Discography from "../_ui/discography";
import ArtisteMerch from "../_ui/artiste-merch";
import { fetchArtisteAlbums } from "@/app/utils/api";
import { useQuery } from "@tanstack/react-query";

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

  const { data: albumsData, isError: albumsError } = useQuery({
    queryKey: ["albums"],
    queryFn: async () =>
      await fetchArtisteAlbums(artiste?.artisteSpotifyId ?? ""),
  });

  const artisteProjects = albumsData?.items?.map((item: any) => {
    return {
      project: item?.album_group,
      title: item?.name,
      art: item?.images[1]?.url,
      artist: item?.artists?.map((a: any) => a.name)?.join(" & "),
      link: item?.external_urls?.spotify,
    };
  });

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
        projects={artisteProjects}
      />
      <ArtisteMerch merch={artisteMerch} />
    </div>
  );
}
