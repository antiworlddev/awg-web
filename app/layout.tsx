import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PreHeader from "@/app/ui/pre-header";
import Footer from "./ui/footer";
import { AppWrapper } from "@/helpers/store";
import ReactQueryProvider from "./utils/ReactQueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ANTIWORLD GANGSTARS",
  description:
    "Welcome to the Home of Everything Antiworld Gangstars. Game changers and Evoluutionists",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <AppWrapper>
            {/* <PreHeader text="THE MOST SOLID GANG YOU'LL EVER SEE" /> */}
            {children}
            <Footer />
          </AppWrapper>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
