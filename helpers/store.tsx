"use client";

import React, { createContext, useContext, useState } from "react";
import { MerchProps, SharedState } from "./types";

const AppContext = createContext<SharedState>({} as SharedState);

export const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  const artistes = [
    {
      artisteSpotifyId: "3LOm0AZjpwVQebvkyanjDy",
      name: "ODUMODUBLVCK",
      bio: `Tochukwu Gbubemi Ojogwu (born 19 October), popularly known as Odumodublvck, is a Nigerian rapper, singer and songwriter. He is known for his stage performances, genre-blend and his often portrayal of Okpu Agu. Odumodublvck is a member of the hip-hop collective Anti World Gangstars. He currently resides in Abuja, Nigeria. In 2022, he signed a record deal with NATIVE Records, in partnership with Def Jam. On 23 November 2022, he released his first single under the NATIVE, titled "Picanto" featuring Ecko Miles, and Zlatan, which earned him his first chart entry on the Nigeria Top 100 at number 79, and reached number 65. On 23 January 2023, he ranked number 4 on TurnTable's NXT Emerging Top Artistes. In 2023, Def Jam Recordings signed an exclusive deal with Odumodublvck upon the release of EZIOKWU mixtape.`,
      image1: "/kala/kala1.png",
      image2: "/kala/kala2.jpg",
      socials: [
        {
          name: "X",
          link: "https://x.com/",
        },
        {
          name: "Instagram",
          link: "https://instagram.com/",
        },
        {
          name: "Snapchat",
          link: "https://snapchat.com/",
        },
        {
          name: "Tiktok",
          link: "https://tiktok.com/",
        },
      ],
      projects: [
        {
          artist: "ODUMODUBLVCK",
          project: "Album",
          art: "/kala/eziokwu-uncut.jpeg",
          title: "Eziokwu (Uncut)",
        },
        {
          artist: "ODUMODUBLVCK",
          project: "Album",
          art: "/kala/eziokwu.jpeg",
          title: "Eziokwu",
        },
        {
          artist: "ODUMODUBLVCK",
          project: "Single",
          art: "/kala/technician.jpeg",
          title: "Technician",
        },
      ],
    },
    {
      artisteSpotifyId: "2UausQcu26M23zEr5rUODB",
      name: "REEPLAY",
      bio: `Reeplay is an abuja based artist in Nigeria. His acronym, Reeplay, stands for "RAW EVOLVED ENERGY PLAYING LOUD ALL YEAR". Reeplay is recognized for his dynamic fusion of genres and authentic storytelling. His music seamlessly blends hip-hop, Afrobeat, and soul, reflecting his commitment to innovative and honest expression. Reeplay is a top member of the Anti world gangstars music collective based in Abuja alongside ODUMODUBLVCK, AGUNNA, SHAGBA, FATBOY E & CROSS.`,
      image1: "/reeplay/reeplay1.png",
      image2: "/reeplay/reeplay2.jpg",
      socials: [
        {
          name: "X",
          link: "https://x.com/",
        },
        {
          name: "Instagram",
          link: "https://instagram.com/",
        },
        {
          name: "Snapchat",
          link: "https://snapchat.com/",
        },
        {
          name: "Tiktok",
          link: "https://tiktok.com/",
        },
      ],
      projects: [
        {
          artist: "REEPLAY",
          project: "Album",
          art: "/reeplay/jig-is-up.png",
          title: "The Jig Is Up",
        },
        {
          artist: "REEPLAY",
          project: "Album",
          art: "/reeplay/who-is-reeplay.png",
          title: "Who Is Reeplay",
        },
        {
          artist: "REEPLAY x CASH'N'OUT",
          project: "Single",
          art: "/reeplay/show-must-go-on.png",
          title: "Show Must Go On",
        },
      ],
    },
    {
      artisteSpotifyId: "1CENr91YcmLqLMk3fPeqze",
      name: "AGUNNA",
      bio: "Hailing from Tampa, Florida, Doechii is a 25-year-old multihyphenate on her way to becoming the embodiment of pop culture. A singer-rapper-actor-dancer-entertainer, she began her music career by releasing “Girls” on SoundCloud in 2016, followed by additional singles, including “Spookie Coochie.” Building her fan base primarily on YouTube through personable vlogs, Doechii is confident, bold, unapologetic, transparent, and raw in everything she does. Recent performances include opening on SZA’s Good Days tour, Afropunk Atlanta 2021, and the BET Hip Hop Awards 2021 with Isaiah Rashad & Kal Banx. Recently listed as a 2022 Artist To Watch by Spotify, Complex’s Pigeons & Planes, and HipHopDX, Doechii continues to prove she is an artist you need to have on your playlist. From being personally called by Beyoncé to be an opener for one of her shows, to now going on her first arena tour with Doja Cat, Doechii is just getting started.",
      image1: "/ag/ag1.png",
      image2: "/ag/ag2.jpg",
      socials: [
        {
          name: "X",
          link: "https://x.com/",
        },
        {
          name: "Instagram",
          link: "https://instagram.com/",
        },
        {
          name: "Snapchat",
          link: "https://snapchat.com/",
        },
        {
          name: "Tiktok",
          link: "https://tiktok.com/",
        },
      ],
      projects: [
        {
          artist: "ODUMODUBLVCK",
          project: "Album",
          art: "/kala/eziokwu-uncut.jpeg",
          title: "Eziokwu (Uncut)",
        },
        {
          artist: "ODUMODUBLVCK",
          project: "Album",
          art: "/kala/eziokwu.jpeg",
          title: "Eziokwu",
        },
        {
          artist: "ODUMODUBLVCK",
          project: "Single",
          art: "/kala/technician.jpeg",
          title: "Technician",
        },
      ],
    },
    {
      artisteSpotifyId: "7oQ6PiDrtScurCpBvMtf5b",
      name: "FATBOY E",
      bio: `"Fatboy E," a prominent member of the Abuja Stronghold collective AntiWorldGangstars, originally hails from Port Harcourt but currently resides in Abuja. Renowned for his clever and infectious hooks, showcased notably on tracks like "Dull" and "Change Am" from Antiworldgangsters' sophomore project "Gang Business," he's made a mark in the Nigerian music scene. His EP "Fatboy Energy" underscores his versatility as a rapper, singer, and songwriter. Noteworthy collaborations include featuring on Odumodublvck’s "Shokolokobangoshe" from the "Time and Chance" EP, as well as handling the hook alongside Odumodublvck on the smash hit "Hotel Lobby" from the "Eziokwu" album. With over 15k views on YouTube, Fatboy E continues to captivate audiences with his unique style and magnetic presence.`,
      image1: "/fatboy/fatboy1.png",
      image2: "/fatboy/fatboy2.png",
      socials: [
        {
          name: "X",
          link: "https://x.com/",
        },
        {
          name: "Instagram",
          link: "https://instagram.com/",
        },
        {
          name: "Snapchat",
          link: "https://snapchat.com/",
        },
        {
          name: "Tiktok",
          link: "https://tiktok.com/",
        },
      ],
      projects: [
        {
          artist: "ODUMODUBLVCK",
          project: "Album",
          art: "/kala/eziokwu-uncut.jpeg",
          title: "Eziokwu (Uncut)",
        },
        {
          artist: "ODUMODUBLVCK",
          project: "Album",
          art: "/kala/eziokwu.jpeg",
          title: "Eziokwu",
        },
        {
          artist: "ODUMODUBLVCK",
          project: "Single",
          art: "/kala/technician.jpeg",
          title: "Technician",
        },
      ],
    },
    {
      artisteSpotifyId: "5GxgrhXvXlieEQX1KThYzh",
      name: "SHAGBA",
      bio: "Hailing from Tampa, Florida, Doechii is a 25-year-old multihyphenate on her way to becoming the embodiment of pop culture. A singer-rapper-actor-dancer-entertainer, she began her music career by releasing “Girls” on SoundCloud in 2016, followed by additional singles, including “Spookie Coochie.” Building her fan base primarily on YouTube through personable vlogs, Doechii is confident, bold, unapologetic, transparent, and raw in everything she does. Recent performances include opening on SZA’s Good Days tour, Afropunk Atlanta 2021, and the BET Hip Hop Awards 2021 with Isaiah Rashad & Kal Banx. Recently listed as a 2022 Artist To Watch by Spotify, Complex’s Pigeons & Planes, and HipHopDX, Doechii continues to prove she is an artist you need to have on your playlist. From being personally called by Beyoncé to be an opener for one of her shows, to now going on her first arena tour with Doja Cat, Doechii is just getting started.",
      image1: "/shagba/shagba1.png",
      image2: "/shagba/shagba2.jpg",
      socials: [
        {
          name: "X",
          link: "https://x.com/",
        },
        {
          name: "Instagram",
          link: "https://instagram.com/",
        },
        {
          name: "Snapchat",
          link: "https://snapchat.com/",
        },
        {
          name: "Tiktok",
          link: "https://tiktok.com/",
        },
      ],
      projects: [
        {
          artist: "ODUMODUBLVCK",
          project: "Album",
          art: "/kala/eziokwu-uncut.jpeg",
          title: "Eziokwu (Uncut)",
        },
        {
          artist: "ODUMODUBLVCK",
          project: "Album",
          art: "/kala/eziokwu.jpeg",
          title: "Eziokwu",
        },
        {
          artist: "ODUMODUBLVCK",
          project: "Single",
          art: "/kala/technician.jpeg",
          title: "Technician",
        },
      ],
    },
    {
      artisteSpotifyId: "4em6zsRUNAPC2YTfqdCpow",
      name: "CROSS",
      bio: `Omaki Farouk Ateiza, popularly known as Cross, is a music producer and mix engineer based in Abuja. Hailing from Nasarawa state, he was raised in Abuja and Kwara state. As a founding member of the Abuja hip hop collective "ANTIWORLD GANGSTARS," he has shaped the sounds of various artists in the drill, grime, and hip hop scenes. He produced hits like “Dull” from the Antiworld Gangstars' debut album “Gang Business,” and mixed most of the tracks. While at Afe Babalola University, he collaborated with rapper Eeskay, resulting in tracks like "9 Lives” and "Ready When You're Ready.” His notable work includes producing hits on Odumodublvck’s debut album "Eziokwu," such as WotoWoto Seasoning, Mc Oluomo, and Hotel Lobby. Upcoming projects include the 'Danger EP' by Fat Boy E and Reeplay, a solo sophomore project, and another AWG project. Cross cites 50 Cent and G-Unit as major influences, and Timbaland's "Shock Value 2" as his inspiration to produce.`,
      image1: "/cross/cross1.png",
      image2: "/cross/cross2.jpg",
      socials: [
        {
          name: "X",
          link: "https://x.com/",
        },
        {
          name: "Instagram",
          link: "https://instagram.com/",
        },
        {
          name: "Snapchat",
          link: "https://snapchat.com/",
        },
        {
          name: "Tiktok",
          link: "https://tiktok.com/",
        },
      ],
      projects: [
        {
          artist: "ODUMODUBLVCK",
          project: "Album",
          art: "/kala/eziokwu-uncut.jpeg",
          title: "Eziokwu (Uncut)",
        },
        {
          artist: "ODUMODUBLVCK",
          project: "Album",
          art: "/kala/eziokwu.jpeg",
          title: "Eziokwu",
        },
        {
          artist: "ODUMODUBLVCK",
          project: "Single",
          art: "/kala/technician.jpeg",
          title: "Technician",
        },
      ],
    },
  ];
  const all_merch: MerchProps[] = [
    {
      image: "/dummy/dummymerch.jpg",
      name: "Who De Check Am Hoodie",
      price: 45000,
      artiste: "Reeplay",
      category: "Hoodie",
    },
    {
      image: "/dummy/dummymerch2.jpg",
      name: "Jig Is Up Head Warmer",
      price: 45000,
      artiste: "Reeplay",
      category: "hat",
    },
    {
      image: "/dummy/dummymerch3.jpg",
      name: "Light My Bars Jacket",
      price: 45000,
      artiste: "Reeplay",
      category: "hoodie",
    },
    {
      image: "/dummy/dummymerch.jpg",
      name: "Who De Check Am Hoodie",
      price: 45000,
      artiste: "Reeplay",
      category: "Hoodie",
    },
    {
      image: "/dummy/dummymerch.jpg",
      name: "Eziokwu Hoodie",
      price: 45000,
      artiste: "Odumodublvck",
      category: "Hoodie",
    },
    {
      image: "/dummy/dummymerch2.jpg",
      name: "Kala Head Warmer",
      price: 45000,
      artiste: "Odumodublvck",
      category: "hat",
    },
    {
      image: "/dummy/dummymerch3.jpg",
      name: "Light My Bars Jacket",
      price: 45000,
      artiste: "Odumodublvck",
      category: "hoodie",
    },
    {
      image: "/dummy/dummymerch.jpg",
      name: "Who De Check Am Hoodie",
      price: 45000,
      artiste: "Odumodublvck",
      category: "Hoodie",
    },
    {
      image: "/dummy/dummymerch.jpg",
      name: "T's & C's Hoodie",
      price: 45000,
      artiste: "Fatboy E",
      category: "Hoodie",
    },
    {
      image: "/dummy/dummymerch2.jpg",
      name: "Agege Head Warmer",
      price: 45000,
      artiste: "Fatboy E",
      category: "hat",
    },
    {
      image: "/dummy/dummymerch3.jpg",
      name: "Big Zoot Jacket",
      price: 45000,
      artiste: "Fatboy E",
      category: "hoodie",
    },
    {
      image: "/dummy/dummymerch.jpg",
      name: "Who De Check Am Hoodie",
      price: 45000,
      artiste: "Fatboy E",
      category: "Hoodie",
    },
    {
      image: "/dummy/dummymerch.jpg",
      name: "4D Cruise Hoodie",
      price: 45000,
      artiste: "Agunna",
      category: "Hoodie",
    },
    {
      image: "/dummy/dummymerch2.jpg",
      name: "Tipper Head Warmer",
      price: 45000,
      artiste: "Agunna",
      category: "hat",
    },
    {
      image: "/dummy/dummymerch3.jpg",
      name: "Disrespect Jacket",
      price: 45000,
      artiste: "Agunna",
      category: "hoodie",
    },
    {
      image: "/dummy/dummymerch.jpg",
      name: "Who De Check Am Hoodie",
      price: 45000,
      artiste: "Agunna",
      category: "Hoodie",
    },
    {
      image: "/dummy/dummymerch.jpg",
      name: "Marktown Hoodie",
      price: 45000,
      artiste: "Shagba",
      category: "Hoodie",
    },
    {
      image: "/dummy/dummymerch2.jpg",
      name: "Kala Head Warmer",
      price: 45000,
      artiste: "Shagba",
      category: "hat",
    },
    {
      image: "/dummy/dummymerch3.jpg",
      name: "Light My Bars Jacket",
      price: 45000,
      artiste: "Shagba",
      category: "hoodie",
    },
    {
      image: "/dummy/dummymerch.jpg",
      name: "Who De Check Am Hoodie",
      price: 45000,
      artiste: "Shagba",
      category: "Hoodie",
    },
    {
      image: "/dummy/dummymerch.jpg",
      name: "You Dey Crase Hoodie",
      price: 45000,
      artiste: "Cross",
      category: "Hoodie",
    },
    {
      image: "/dummy/dummymerch2.jpg",
      name: "Kala Head Warmer",
      price: 45000,
      artiste: "Cross",
      category: "hat",
    },
    {
      image: "/dummy/dummymerch3.jpg",
      name: "Light My Bars Jacket",
      price: 45000,
      artiste: "Cross",
      category: "hoodie",
    },
    {
      image: "/dummy/dummymerch.jpg",
      name: "Who De Check Am Hoodie",
      price: 45000,
      artiste: "Cross",
      category: "Hoodie",
    },
  ];
  const sharedState: SharedState = {
    artistes,
    all_merch,
  };

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
