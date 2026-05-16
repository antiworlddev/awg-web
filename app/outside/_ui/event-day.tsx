"use client";

import React, { useState, useEffect } from "react";
import Button from "@/app/ui/button";
import { EventDayProps } from "@/helpers/types";
import EventModal from "./event-modal";
import Image from "next/image";

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
  specialGuests,
}: EventDayWithEventName) {
  const [showModal, setShowModal] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    // Format date only on client to avoid hydration mismatch
    setFormattedDate(
      new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    );
  }, [date]);

  return (
    <>
      {/* Event Day row */}
      <div className="flex w-full items-start justify-between rounded-lg p-4 bg-orange-200 shadow-sm">
        <div className="flex flex-col items-start lg:w-1/3 text-center mt-1 ">
          <p className="font-semibold md:text-base text-sm text-left uppercase tracking-tight">
            {eventName}
          </p>
          <p className="font-semibold md:text-base text-xs mt-1.5 lg:tracking-normal tracking-tighter">
            {formattedDate}
          </p>
          <p className="text-gray-600 md:text-base text-xs mt-3">{location}</p>
          <p className="text-gray-600 md:text-base text-xs lg:tracking-normal tracking-tighter mt-1 mb-3">
            {city}, {country}
          </p>
          <Button label="Tickets" onClick={() => setShowModal(true)} />
        </div>
        <div className="w-28 h-36 relative pl-4">
          <Image
            src={image || ""}
            alt={eventName}
            className="w-1/4 h-auto rounded-lg object-cover"
            fill={true}
          />
        </div>
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
          specialGuests={specialGuests}
        />
      )}
    </>
  );
}
