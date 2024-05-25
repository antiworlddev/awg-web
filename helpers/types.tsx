import { ReactNode } from "react";

export interface Artiste {
  name: string;
  bio: string;
  image1?: string;
  font?: string;
  image2?: string;
  projects?: ProjectProps[];
  socials?: Social[];
  artisteSpotifyId?: string;
}

export interface Social {
  name: string;
  link: string;
}

export interface SharedState {
  artistes: Artiste[];
  all_merch: MerchProps[];
}

export interface SectionProps {
  label: string;
  children: ReactNode;
  id?: string;
  font?: string;
}

export interface ProjectProps {
  art: string;
  artist: string;
  project: string;
  title: string;
  link?: string;
}

export interface MerchProps {
  image: string;
  category?: string;
  name: string;
  price: number;
  artiste?: string;
}
