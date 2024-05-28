import { ProjectProps } from "@/helpers/types";
import Link from "next/link";
import React from "react";

export default function ProjectCard({
  title,
  art,
  artist,
  project,
  link,
}: ProjectProps) {
  return (
    <div className="bg-opacity-40 p-10 flex rounded-2xl flex-col items-center group hover:bg-awg-yellow hover:bg-opacity-90 transition-colors duration-500 ease-in-out w-64 lg:w-[450px] bg-white lg:mx-4 text-black uppercase">
      <div className="group-hover:-translate-x-6  transition transform duration-[1000ms] ease-in-out relative">
        <img
          src={art}
          alt="uncon"
          className="mb-8 w-[120px] h-[120px] lg:w-[100px] lg:h-[100px] z-10 relative group-hover:grayscale-0 grayscale transition duration-500 ease-in-out"
        />
        <div className="border-dark border-2 bg-yellow-100 lg:h-[95px] h-[110px] lg:w-[95px] w-[110px] rounded-full group-hover:rotate-[360deg] group-hover:translate-x-20  transition transform duration-[1000ms] ease-in-out left-0 top-1 flex items-center justify-center absolute z-0">
          <div className="bg-dark h-9 w-9 rounded-full flex items-center justify-center">
            <img src={art} alt="uncon" className="rounded-full lg:w-6 lg:h-6" />
          </div>
        </div>
      </div>
      <Link href={link ?? "https://example.com"}>
        <p className="lg:text-lg mb-4 font-semibold text-center tracking-wider group-hover:underline">
          {title}
        </p>
      </Link>
      <div className="flex space-x-3 items-center mb-2 tracking-wide">
        <p className="font-medium text-[10px] lg:text-xs text-center">
          {artist}
        </p>
      </div>
      <div className="flex space-x-3 items-center mb-2 tracking-wide">
        <p className="font-extralight text-[10px] lg:text-xs">
          {project.replace(/[\W_]+/g, " ")}
        </p>
      </div>
    </div>
  );
}
