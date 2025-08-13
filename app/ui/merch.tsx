"use client";

import { formatPrice } from "@/helpers/functions";
import { useAppContext } from "@/helpers/store";
import Image from "next/image";

type MerchComponentProps = {
  addToBag?: () => void;
  isInCart?: boolean;
  viewMerch?: () => void;
  merch: any;
};

export default function Merch({ merch, viewMerch }: MerchComponentProps) {
  const context = useAppContext();

  const { exchangeRates, currency } = context;

  return (
    <div className={`${""} flex flex-col items-center mb-8 relative w-full`}>
      <div onClick={viewMerch} className="lg:w-fit w-full">
        <div className="p-3 bg-gray-400 bg-opacity-20 flex items-center justify-center">
          <div className="relative lg:h-72 w-32 h-40 lg:w-64">
            {merch?.images[0] ? (
              <Image
                priority
                fill={true}
                src={merch?.images[0]}
                alt={merch?.name}
                className="transition-transform duration-300 ease-out cursor-pointer hover:scale-105 object-cover"
                sizes="33vw"
              />
            ) : (
              <></>
            )}
            {/* <div className=" absolute lg:top-1 lg:left-1 top-2 left-2 py-2 px-4 flex items-center justify-center rounded-full bg-white shadow-dark/20 shadow-md">
            <p className="text-xs uppercase opacity-60">NEW</p>
          </div> */}
          </div>
        </div>
        <div className="flex lg:items-center items-start justify-between w-full mt-6 mb-2">
          <p className="text-xs lg:w-auto w-32 font-medium uppercase text-dark">
            {merch?.name}
          </p>
          <p className="text-xs font-light text-dark">
            {formatPrice(
              currency,
              merch?.price * exchangeRates[currency.toLowerCase()]
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
