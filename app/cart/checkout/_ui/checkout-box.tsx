import { CartItemProps } from "@/helpers/types";
import Image from "next/image";

export default function CheckoutBox({ cart }: { cart: CartItemProps[] }) {
  const shippingFee = 6000;
  return (
    <div className="p-3 border border-dark lg:w-[46%] w-full lg:mb-0 mb-10">
      <div className="w-full lg:p-8 p-2">
        {cart?.map((c) => (
          <div className="flex items-center justify-between w-full lg:mb-2 mb-1">
            <div className="flex items-center w-full justify-start">
              <Image
                width={150}
                height={150}
                src={c?.item.image}
                alt="Product Image"
                className="lg:w-20 lg:h-20 w-16 h-16 rounded-full mr-4"
              />
              <div>
                <p className="tracking-wide font-medium lg:text-base text-sm">
                  {c?.item?.name}
                </p>
                <p className="font-extralight tracking-wide lg:text-base text-xs">
                  size - {c?.item?.size}
                </p>
              </div>
            </div>
            <p className="lg:text-base text-sm">₦{c?.item?.price}</p>
          </div>
        ))}
        <div className="w-full flex items-center justify-between">
          <input
            className="w-3/4 border border-dark bg-transparent outline-none p-1 lg:h-11 h-9"
            type="text"
            placeholder="Coupon or Discount Code"
            id="discountCode"
            name="discountCode"
          />
          <div className="p-2 lg:h-11 h-9 bg-dark border border-dark w-28 flex items-center justify-center cursor-pointer hover:opacity-80">
            <p className="text-awg-yellow uppercase text-xs">Apply</p>
          </div>
        </div>
        <div className="flex items-center justify-between w-full mt-8">
          <p className="font-medium tracking-wide lg:text-base text-sm">
            Subtotal
          </p>
          <p className="font-light tracking-wide lg:text-base text-sm">
            ₦
            {cart?.reduce(
              (sum, item) => item.item.price * item.quantity + sum,
              0
            )}
          </p>
        </div>
        <div className="flex items-center justify-between w-full">
          <p className="font-medium tracking-wide lg:text-base text-sm">
            Shipping Fee
          </p>
          <p className="font-light tracking-wide lg:text-base text-sm">
            ₦{shippingFee}
          </p>
        </div>
        <div className="flex items-center justify-between w-full mt-3">
          <p className="font-semibold tracking-wide lg:text-lg text-base">
            Total
          </p>
          <p className="font-medium tracking-wide lg:text-lg text-base">
            ₦
            {cart?.reduce(
              (sum, item) => item.item.price * item.quantity + sum,
              0
            ) + shippingFee}
          </p>
        </div>
      </div>
    </div>
  );
}
