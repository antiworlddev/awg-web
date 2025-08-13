import { CalendarProps, EventProps } from "@/helpers/types";
import React from "react";
import EventDay from "./event-day";

export default function Event({
  eventName,
  artistes,
  dates,
  eventId,
}: EventProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="lg:text-3xl md:text-2xl text-xl font-bold">
          {eventName}
        </h2>
        <p className="text-gray-500 lg:text-xl md:text-lg text-sm font-semibold">
          {artistes.join(", ")}
        </p>
      </div>

      <div className="space-y-4">
        {dates.map((day) => (
          <EventDay
            key={day?.id}
            {...day}
            eventName={eventName}
            eventId={eventId}
          />
        ))}
      </div>
    </div>
  );
}
