import { SectionProps } from "@/helpers/types";
import React from "react";

export default function Section({ label, children, id, font }: SectionProps) {
  return (
    <div
      className={`w-full ${"items-center"} flex flex-col justify-start my-10 px-10`}
      id={id}
    >
      <p
        className={`${font} lg:text-6xl text-3xl my-20 uppercase font-semibold   tracking-wider`}
      >
        {label}
      </p>
      {children}
      <div className="lg:h-32 h-16" />
    </div>
  );
}
