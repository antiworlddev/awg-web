import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuCalendar, LuCalendarDays, LuMicVocal } from "react-icons/lu";

export default function Header({ itemsCount }: { itemsCount?: number }) {
  const pathname = usePathname();
  return (
    <div className="w-full flex items-center justify-between mt-10">
      <div className="tracking-wider hidden lg:block">
        <p className="font-bold tracking-wider lg:text-sm text-xs">
          Abuja, Nigeria
        </p>
        <p className="font-semibold tracking-wider text-[10px] lg:text-xs">
          9.0563° N, 7.4985° 🇳🇬
        </p>
      </div>
      <Link href="/">
        <div className="relative w-[70px] h-[60px] lg:h-20 lg:w-24">
          <Image src="/logos/awg-logo.png" fill={true} alt="AWG-LOGO" />
        </div>
      </Link>
      <div className="lg:w-36 w-20 flex items-center justify-center lg:justify-end">
        <Link href="/outside" className=" mr-3">
          {pathname.startsWith("/outside") ? (
            <LuCalendarDays size={25} />
          ) : (
            <p className="font-black tracking-wider lg:text-sm text-xs hover:text-yellow-600 ease-in transition-colors">
              OUTSIDE
            </p>
          )}
        </Link>
        {pathname.startsWith("/merch/cart") ? (
          <></>
        ) : pathname.startsWith("/merch") ? (
          <Link href="/merch/cart">
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              {itemsCount !== undefined && itemsCount > 0 && (
                <div className="w-4 h-4 rounded-full bg-dark flex items-center justify-center absolute -top-1 -right-2">
                  <p className="text-awg-yellow text-[10px]">{itemsCount}</p>
                </div>
              )}
            </div>
          </Link>
        ) : (
          <Link href="/merch">
            <p className="font-black tracking-wider lg:text-sm text-xs hover:text-yellow-600 ease-in transition-colors">
              MERCH
            </p>
          </Link>
        )}
      </div>
    </div>
  );
}
