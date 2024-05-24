import { ProjectProps } from "@/helpers/types";
import Link from "next/link";
import React from "react";

export default function ProjectCard({
  title,
  art,
  artist,
  project,
}: ProjectProps) {
  return (
    <div className="bg-opacity-40 p-10 flex flex-col items-center group hover:bg-awg-yellow hover:bg-opacity-90 transition-colors duration-500 ease-in-out w-[350px] lg:w-[450px] bg-white lg:mx-4 text-black uppercase">
      <div className="relative">
        <img
          src={art}
          alt="uncon"
          className="mb-8 w-[300px] lg:w-[100px] lg:h-[100px] z-10 relative"
        />
        <div className="border-dark border-2 bg-yellow-100 h-[95px] w-[95px] rounded-full group-hover:rotate-[360deg] group-hover:translate-x-20  transition transform duration-[1000ms] ease-in-out left-0 top-1 flex items-center justify-center absolute z-0">
          <div className="bg-dark h-9 w-9 rounded-full flex items-center justify-center">
            <img src={art} alt="uncon" className="rounded-full lg:w-6 lg:h-6" />
          </div>
        </div>
      </div>
      <Link href="https://example.com">
        <p className="text-lg mb-4 font-semibold tracking-wider group-hover:underline">
          {title}
        </p>
      </Link>
      <div className="flex space-x-3 items-center mb-2 tracking-wide">
        <p className="font-medium text-xs">{artist}</p>
      </div>
      <div className="flex space-x-3 items-center mb-2 tracking-wide">
        <p className="font-extralight text-xs">{project}</p>
      </div>
    </div>
  );
}
