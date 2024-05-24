import { MerchProps } from "@/helpers/types";
import useWindowSize from "@/hooks/useWindowSize";
import React from "react";

export default function Merch({ image, category, price, name }: MerchProps) {
  const { width, height } = useWindowSize();

  const naira = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NGN",
  });

  return (
    <div
      className={`${""} transition-transform duration-300 ease-out cursor-pointer hover:scale-105 flex flex-col items-center`}
    >
      <div
        className={`w-full lg:rounded-[50px] rounded-[30px] ${"lg:h-80 h-60"} relative flex items-center justify-center mb-9 p-2`}
      >
        <img src={image} alt={name} className="w-full h-full object-contain" />
        {/* <div className=" absolute lg:top-5 lg:left-5 top-2 left-2 py-2 px-4 flex items-center justify-center rounded-full bg-white shadow-dark/20 shadow-md">
          <p className="text-xs uppercase opacity-60">{category}</p>
        </div> */}
      </div>
      <p className="text-base font-semibold uppercase mb-4 text-center">
        {name}
      </p>
      <p className="text-xs font-medium text-center">{naira.format(price)}</p>
    </div>
  );
}
