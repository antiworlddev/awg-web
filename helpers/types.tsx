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
  videoIds?: string[];
}

export interface Social {
  name: string;
  link: string;
}

export interface SharedState {
  artistes: Artiste[];
  all_merch: MerchProps[];
  awgProjects: ProjectProps[];
  cart: CartItemProps[];
  setcart: (value: CartItemProps[]) => void;
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
  id: string;
  image: string;
  category?: string;
  name: string;
  price: number;
  artiste?: string;
  viewProduct?: () => void;
  country?: string;
  city?: string;
  sizes?: string[];
  quantity?: number;
  size?: string;
}

export interface CartItemProps {
  item: MerchProps;
  quantity: number;
}

export interface IncrementerProps {
  leftClick: () => void;
  rightClick: () => void;
  value: number;
}
