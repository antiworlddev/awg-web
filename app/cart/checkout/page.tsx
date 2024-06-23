"use client";

import Header from "@/app/ui/header";
import { useAppContext } from "@/helpers/store";
import CheckoutForm from "./_ui/checkout-form";
import Image from "next/image";
import CheckoutBox from "./_ui/checkout-box";

export default function Page() {
  const context = useAppContext();
  const { cart } = context;
  return (
    <div className="flex min-h-screen flex-col w-full lg:px-24 px-6">
      <Header />
      <div className="my-10 w-full flex lg:flex-row flex-col-reverse lg:items-start items-center lg:justify-center lg:space-y-0 lg:space-x-10">
        <div className="w-full lg:w-1/2">
          <h2 className="lg:text-4xl text-3xl font-medium tracking-wide">
            Delivery Information
          </h2>
          <CheckoutForm />
        </div>
        <CheckoutBox cart={cart} />
      </div>
    </div>
  );
}
