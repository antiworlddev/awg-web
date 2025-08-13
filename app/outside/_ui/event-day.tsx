"use client";

import React, { useState, useEffect } from "react";
import Button from "@/app/ui/button";
import { EventDayProps } from "@/helpers/types";
import EventModal from "./event-modal";

interface EventDayWithEventName extends EventDayProps {
  eventName: string;
  eventId: string;
}

export default function EventDay({
  city,
  country,
  id,
  eventId,
  date,
  tickets,
  tables,
  eventName,
  description,
  location,
  image,
}: EventDayWithEventName) {
  const [showModal, setShowModal] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    // Format date only on client to avoid hydration mismatch
    setFormattedDate(
      new Date(date).toLocaleDateString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    );
  }, [date]);

  return (
    <>
      {/* Event Day row */}
      <div className="flex w-full items-center justify-between border rounded-lg p-4 bg-white shadow-sm">
        <div className="lg:w-1/6 w-1/5">
          <p className="font-semibold md:text-base text-xs lg:tracking-normal tracking-tighter">
            {formattedDate}
          </p>
          <p className="text-gray-600 md:text-base text-xs lg:tracking-normal tracking-tighter">
            {city}, {country}
          </p>
        </div>
        <div className="flex flex-col items-center w-1/2 lg:w-1/3">
          <p className="font-semibold md:text-base text-xs">{description}</p>
          <p className="text-gray-600 md:text-base text-xs">{location}</p>
        </div>
        <Button label="Tickets" onClick={() => setShowModal(true)} />
      </div>

      {/* Modal */}
      {showModal && (
        <EventModal
          eventName={eventName}
          eventId={eventId}
          id={id}
          image={image}
          tickets={tickets}
          tables={tables}
          onClose={() => setShowModal(false)}
          city={city}
          country={country}
          date={formattedDate}
          description={description}
          location={location}
        />
      )}
    </>
  );
}
