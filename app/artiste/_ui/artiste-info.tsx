import { Artiste } from "@/helpers/types";
import Image from "next/image";
import Link from "next/link";

export default function ArtisteInfo({
  name,
  bio,
  image2,
  font,
  socials,
}: Artiste) {
  return (
    <div className="flex lg:flex-row flex-col-reverse lg:items-start items-center justify-between w-full lg:mt-24 mt-12">
      <div className="lg:w-2/5 lg:mt-0 mt-12 flex-col lg:items-start items-center flex">
        <p className={`${font} lg:text-4xl text-2xl`}>{name}</p>
        <p className="mt-10 text-sm leading-6 tracking-wide font-medium lg:text-left text-center">
          {bio}
        </p>
        <p className={`font-medium lg:text-lg lg:mt-6 mt-12 uppercase ${font}`}>
          Follow {name}
        </p>
        <div className="grid grid-cols-2 gap-6 mt-5">
          {socials?.map((s) => (
            <Link href={s.link} key={name}>
              <p className={`font-mono underline cursor-pointer`}>{s.name}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className="lg:w-[595px] lg:h-[595px] w-[300px] h-[300px] relative">
        <Image fill={true} alt="artiste-dp" src={image2 || ""} />
      </div>
    </div>
  );
}
