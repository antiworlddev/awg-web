"use client";

import Header from "@/app/ui/header";
import Incrementer from "@/app/ui/incrementer";
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
      <div className="flex items-start center space-x-16 w-full mt-10">
        <div className="w-[600px] h-[600px] relative">
          <Image alt="merch" src={merch?.image ?? ""} fill={true} />
        </div>
        <div>
          <p className="text-4xl font-medium tracking-wider">{merch?.name}</p>
          <p className="mt-6 text-lg tracking-wide">
            ₦{merch?.price && merch?.price * orderDetails.quantity}
          </p>
          <p className="mt-8 tracking-wider">
            Designed and Crafted in {merch?.city}, {merch?.country}.
          </p>
          <div className="mt-6">
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
          <div className="mt-6">
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
            className={`mt-24 w-64 p-3 border-dark border flex items-center ${
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
