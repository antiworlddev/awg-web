import Image from "next/image";

export default function HeroGrid() {
  return (
    <div className="flex lg:flex-row flex-col-reverse lg:items-start items-center justify-between py-6 w-full lg:mt-6">
      <div className="flex flex-col lg:justify-start items-center lg:items-start w-full">
        <div className="md:w-[550px] md:h-[550px] w-[320px] h-[320px] relative">
          <Image src="/gang/gang10.jpg" fill={true} className="" alt="gang12" />
        </div>

        <p className="tracking-widest lg:text-[80px] lg:self-start self-center text-4xl font-black lg:mt-10 mt-6">
          GANGSTARS
        </p>
      </div>
      <div className="flex flex-col lg:justify-start items-center lg:items-start w-full lg:mb-0 mb-2">
        <p className="tracking-widest lg:text-[80px] lg:self-start self-center text-4xl font-black lg:mb-10 mb-6">
          ANTIWORLD
        </p>

        <div className="md:w-[550px] md:h-[550px] w-[320px] h-[320px] relative">
          <Image
            src="/gang/gang9.jpg"
            fill={true}
            className="object-cover"
            alt="gang12"
          />
        </div>
      </div>
    </div>
  );
}
