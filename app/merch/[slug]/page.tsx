"use client";

import Header from "@/app/ui/header";
import Incrementer from "@/app/ui/incrementer";
import { formatter } from "@/helpers/functions";
import { useAppContext } from "@/helpers/store";
import Image from "next/image";
import { useState } from "react";

export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const context = useAppContext();

  const merch = context?.all_merch?.find((m) => m.id === slug);
  const [orderDetails, setOrderDetails] = useState({
    quantity: 1,
    size: merch?.sizes && merch?.sizes[0],
  });
  const itemIndex = context?.cart?.findIndex((c) => c.item.id === slug);

  const isMerchInCart = itemIndex !== -1 ? true : false;

  const addToBag = () => {
    if (merch) {
      if (isMerchInCart) {
        const currentCart = [...context?.cart];
        currentCart[itemIndex].quantity += orderDetails?.quantity;
        context?.setcart(currentCart);
      } else {
        const itemData = {
          item: { ...merch, size: orderDetails.size },
          quantity: orderDetails?.quantity,
        };
        context?.setcart([...context?.cart, itemData]);
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col w-full lg:px-24 px-6">
      <Header itemsCount={context?.cart?.length} />
      <div className="flex lg:flex-row  flex-col lg:items-start lg:justify-center items-center lg:space-x-16 w-full lg:mt-10">
        <div className="lg:w-[600px] lg:h-[600px] w-[300px] h-[300px] relative">
          <Image alt="merch" src={merch?.image ?? ""} fill={true} />
        </div>
        <div className="flex flex-col lg:items-start items-center">
          <p className="lg:text-4xl text-2xl font-medium tracking-wider text-center">
            {merch?.name}
          </p>
          <p className="mt-6 lg:text-lg tracking-wide">
            {formatter.format(
              (merch?.price && merch?.price * orderDetails.quantity) ?? 0
            )}
          </p>
          <p className="mt-8 tracking-wider lg:text-base text-sm">
            Designed and Crafted in {merch?.city}, {merch?.country}.
          </p>
          <div className="mt-6 flex flex-col lg:items-start items-center">
            <p>Size</p>
            <select
              onChange={(e) =>
                setOrderDetails({ ...orderDetails, size: e.target.value })
              }
              className="mt-2 w-40 py-1 bg-transparent border-dark border uppercase outline-none"
            >
              {merch?.sizes?.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="mt-6 flex flex-col lg:items-start items-center">
            <p>Quantity</p>
            <div className="mt-4 w-64 p-3 border-dark border ">
              <Incrementer
                leftClick={() =>
                  setOrderDetails({
                    ...orderDetails,
                    quantity:
                      orderDetails.quantity > 0
                        ? orderDetails.quantity - 1
                        : orderDetails.quantity,
                  })
                }
                rightClick={() =>
                  setOrderDetails({
                    ...orderDetails,
                    quantity:
                      merch?.quantity && orderDetails.quantity < merch?.quantity
                        ? orderDetails.quantity + 1
                        : orderDetails.quantity,
                  })
                }
                value={orderDetails?.quantity}
              />
            </div>
          </div>
          <div
            onClick={
              orderDetails?.quantity > 0 && !isMerchInCart
                ? addToBag
                : undefined
            }
            className={`lg:mt-24 mt-16 w-64 p-3 border-dark border flex items-center ${
              orderDetails?.quantity === 0 && "cursor-not-allowed"
            } justify-center hover:bg-dark/10 ${
              isMerchInCart ? "bg-dark/10 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <p>{isMerchInCart ? "Already In Cart" : "Add To Bag"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
