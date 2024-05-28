import { DateTime } from "luxon";

export default function Footer() {
  const now = DateTime.now();
  return (
    <div className="w-full lg:px-20 px-5">
      <div className="flex lg:flex-row flex-col-reverse lg:space-y-0 space-y-2 bg-dark bg-opacity-95 w-full lg:px-20 px-10 pt-10 pb-6 lg:items-end justify-between">
        <p className="text-[#f5f5f5]/80 font-light text-xs">
          © {now.year} ANTIWORLD GANGSTARS
        </p>
        <div>
          <p className="text-[#f5f5f5]/80 font-light text-xs">
            antiworldgangstars@gmail.com
          </p>
          <p className="text-[#f5f5f5]/80 font-light text-xs mb-2">
            @antiworldgangstars
          </p>
        </div>
      </div>
    </div>
  );
}
