// Calendar.tsx
import { CalendarProps } from "@/helpers/types";
import React from "react";
import Event from "./event";

export default function Calendar({ events }: CalendarProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12 my-5">
      <p className="lg:text-4xl md:text-3xl text-2xl font-bold tracking-wide">
        SEE WHAT'S POPPING
      </p>
      {events?.map((event, idx) => (
        <Event key={idx} {...event} />
      ))}
    </div>
  );
}
