import Image from "next/image";

export default function HeroGrid2() {
  return (
    <div className="w-full flex lg:flex-row flex-col lg:space-y-0 space-y-3 lg:items-start items-center lg:justify-between mt-12 mb-20">
      <div className="md:w-[435px] md:h-[580px] w-80 h-[427px]  relative">
        <Image fill={true} src="/gang/gang6.jpg" alt="start-grid" />
      </div>
      <div className="md:w-[435px] md:h-[580px] w-80 h-[427px] flex flex-col items-center justify-center z-50">
        <div className="flex items-start justify-between lg:w-[380px] w-72">
          <div className="lg:w-[200px] w-40 h-60 lg:h-[300px] relative">
            <Image
              fill={true}
              src="/ag/ag3.jpg"
              className="object-cover object-bottom"
              alt="top-grid"
            />
          </div>
          <div className="lg:w-[200px] w-40 h-60 lg:h-[300px] relative">
            <Image
              fill={true}
              src="/gang/gang5.jpg"
              className="object-cover object-left-bottom"
              alt="top-grid"
            />
          </div>
        </div>
        <div className="flex items-start justify-between lg:w-[380px] w-72">
          <div className="lg:w-[200px] w-40 h-60 lg:h-[300px] relative">
            <Image
              fill={true}
              src="/gang/gang8.jpg"
              className="object-cover object-bottom"
              alt="top-grid"
            />
          </div>
          <div className="lg:w-[200px] w-40 h-60 lg:h-[300px] relative ">
            <Image
              fill={true}
              src="/shagba/shagba3.jpg"
              className="object-cover object-left-bottom"
              alt="top-grid"
            />
          </div>
        </div>
      </div>
      <div className="md:w-[435px] md:h-[580px] w-80 h-[427px] relative">
        <Image
          fill={true}
          src="/gang/gang7.jpg"
          className="object-cover object-right-bottom"
          alt="start-grid"
        />
      </div>
    </div>
  );
}
