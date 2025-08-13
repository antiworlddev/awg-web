import React, { useState } from "react";
import Image from "next/image";
import Button from "@/app/ui/button";
import { EventDayProps } from "@/helpers/types";
import Incrementer from "@/app/ui/incrementer";
import Tickets from "./tickets";
import Tables from "./tables";

interface EventModalProps extends EventDayProps {
  onClose: () => void;
  eventName: string;
  eventId: string;
}

export default function EventModal({
  eventName,
  eventId,
  image,
  id,
  date,
  description,
  city,
  country,
  tickets,
  tables,
  onClose,
}: EventModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full p-6 shadow-lg overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{eventName}</h2>
            <p>
              {city}, {country}
            </p>
            <p>{date}</p>
          </div>
          <div className=" w-full sm:w-48">
            <div className="relative w-full h-40 sm:h-60 rounded overflow-hidden ">
              <Image
                src={image ?? ""}
                alt={eventName}
                fill
                className="object-contain" // handles portrait, square, landscape
              />
            </div>
          </div>
        </div>
        {/* Tickets Section */}
        {Object.keys(tickets).length > 0 ? (
          <Tickets tickets={tickets} description={description} />
        ) : (
          <></>
        )}
        {/* Tables Section */}
        {Object.keys(tables).length > 0 ? (
          <Tables tables={tables} description={description} />
        ) : (
          <></>
        )}

        {/* Close Button */}
        <div className="text-right">
          <Button label="Close" onClick={onClose} />
        </div>
      </div>
    </div>
  );
}
