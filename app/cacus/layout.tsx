import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Cacus Only",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="w-screen h-screen">{children}</div>;
}
