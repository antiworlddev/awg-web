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
        <h2 className="md:text-2xl text-xl font-medium text-lightgrey tracking-wide">
          {eventName}
        </h2>
        <p className="md:text-lg text-sm font-extralight text-lightgrey">
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
