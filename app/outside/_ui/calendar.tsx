// Calendar.tsx
import { CalendarProps } from "@/helpers/types";
import React from "react";
import Event from "./event";

export default function Calendar({ events }: CalendarProps) {
  return (
    <div className="max-w-7xl mx-auto px py-8 space-y-6 mt-2">
      <p className="lg:text-4xl md:text-3xl text-2xl font-normal tracking-normal">
        Upcoming Events
      </p>
      <div className="bg-amber-900 bg-opacity-85 rounded-lg px-4 pt-3 pb-3">
        {events?.map((event, idx) => (
          <Event key={idx} {...event} />
        ))}
      </div>
    </div>
  );
}
