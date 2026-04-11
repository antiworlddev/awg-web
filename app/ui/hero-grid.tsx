import Image from "next/image";

export default function HeroGrid() {
  return (
    <div className="flex lg:flex-row flex-col-reverse lg:items-start items-center justify-between py-6 w-full lg:mt-6">
      <div className="flex flex-col lg:justify-start items-center lg:items-start w-full">
        <Image src="/gang/gang10.JPG" width={600} height={350} alt="gang12" />

        <p className="tracking-widest lg:text-[80px] lg:self-start self-center text-4xl font-black lg:mt-10 mt-6">
          GANGSTARS
        </p>
      </div>
      <div className="flex flex-col lg:justify-start items-center lg:items-start w-full lg:mb-0 mb-2">
        <p className="tracking-widest lg:text-[80px] lg:self-start self-center text-4xl font-black lg:mb-10 mb-6">
          ANTIWORLD
        </p>

        <Image src="/gang/gang9.JPG" width={600} height={350} alt="gang12" />
      </div>
    </div>
  );
}
