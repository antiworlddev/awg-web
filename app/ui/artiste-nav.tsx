"use client";

import { generateSlug } from "@/helpers/functions";
import { useAppContext } from "@/helpers/store";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ArtisteNav({ font }: { font: string }) {
  const context = useAppContext();

  const { artistes } = context;

  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 gap-x-12 gap-y-28 justify-between w-full my-32">
      {artistes?.map((a, i) => (
        <div
          key={a.name}
          className={`justify-center flex items-center p-3 group hover:bg-dark cursor-pointer relative`}
        >
          <Link className="" href={`/artiste/${generateSlug(a.name)}`}>
            <p
              className={`${font} text-2xl lg:text-3xl group-hover:text-awg-yellow uppercase text-dark`}
            >
              {a.name}
            </p>
            <div className="absolute w-36 h-0 left-1/3 bottom-0 group-hover:h-36 group-hover:-translate-y-14 transition transform duration-[1000ms] ease-in-out">
              <Image fill={true} alt={a.name} src={a.image1 || ""} />
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
