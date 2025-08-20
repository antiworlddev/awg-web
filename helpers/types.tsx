import { ReactNode } from "react";

export interface Artiste {
  name: string;
  bio: string;
  images?: string[];
  font?: string;
  projects?: ProjectProps[];
  socials?: Social[];
  artisteSpotifyId?: string;
  videoIds?: string[];
}

export interface Social {
  name: string;
  link: string;
}

export interface TicketOption {
  price: number;
  count: number;
}

export interface EventDayProps {
  id: string;
  city: string;
  country: string;
  location: string;
  description: string;
  image?: string;
  date: string;
  tickets: { [type: string]: TicketOption };
  tables: { [type: string]: TicketOption };
}

export interface EventProps {
  eventName: string;
  artistes: string[];
  dates: EventDayProps[];
  eventId: string;
}

export interface CalendarProps {
  events: EventProps[];
}

export interface SharedState {
  artistes: Artiste[];
  all_merch: MerchProps[];
  awgProjects: ProjectProps[];
  cart: { items: any[]; discount: string };
  setcart: (value: any) => void;
  currency: string;
  setCurrency: (value: string) => void;
  currencies?: string[];
  user: any;
  setuser: (value: any) => void;
  exchangeRates: { [key: string]: number };
  setExchangeRates: (value: { [key: string]: number }) => void;
  selectedMerch: any;
  setSelectedMerch: (value: MerchProps) => void;
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

export interface Material {
  name: string; // e.g., "Cotton", "Silk"
  price: number; // Price for this material variation
  stock: number; // Stock level for this material
  weight?: number;
}

export interface MerchComponent {
  id: string;
  name: string; // e.g., "Shirt" or "Pants"
  price: number; // Price for this component if sold individually
  stock: number;
  materialOptions?: Material[];
  weight?: number;
}

export interface MerchProps {
  images: string[];
  id: string;
  name: string; // e.g., "Two-Piece Set"
  description: string;
  price: number; // Price for the full Merch if sold as a set
  components?: MerchComponent[]; // For Merchs like Two-Piece
  materialOptions?: Material[];
  colors: ColorProps[];
  category: string;
  collection?: string;
  quantity: number;
  weight?: number;
  artiste?: string;
  sizes: string[];
}

export interface ColorProps {
  name?: string;
  hexCode?: string;
  stock?: number;
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
