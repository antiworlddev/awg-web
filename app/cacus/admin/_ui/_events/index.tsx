"use client";

import { getCalendarGl } from "@/helpers/api-controller";
import { CalendarProps } from "@/helpers/types";
import { useQuery } from "@tanstack/react-query";
import { GuestModal } from "./guest-modal";
import { useState } from "react";

export default function EventsTable() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>({});
  const {
    data: calendarData,
    isError: calendarError,
    refetch: refetchCalendar,
    isLoading: isCalendarLoading,
  } = useQuery({
    queryKey: ["calendar"],
    queryFn: () => getCalendarGl(),
  });

  const events = calendarData?.calendar;

  const rows = events
    ?.map((event: any) =>
      event.dates.map((day: any) => ({
        ...day,
        eventName: event.eventName,
        artistes: event.artistes,
        eventId: event.eventId,
      }))
    )
    .flat();

  function formatNumber(num: number): string {
    if (num >= 1_000_000) {
      const value = (num / 1_000_000).toFixed(1);
      return value.replace(/\.0$/, "") + "M";
    } else if (num >= 1000) {
      const value = (num / 1000).toFixed(1);
      return value.replace(/\.0$/, "") + "K";
    }
    return num.toString();
  }

  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">Events</h2>
      <table className="min-w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-100 text-left font-bold">
            <th className="p-3">Event</th>
            <th className="p-3">Date</th>
            <th className="p-3">City</th>
            <th className="p-3">Location</th>
            <th className="p-3">Artistes</th>
            <th className="p-3">Tickets</th>
            <th className="p-3">Tables</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows?.map((row: any) => (
            <tr key={row.id} className="border-b hover:bg-gray-50 text-xs">
              <td className="p-3 font-medium">{row.eventName}</td>
              <td className="p-3">{new Date(row.date).toDateString()}</td>
              <td className="p-3">
                {row.city}, {row.country}
              </td>
              <td className="p-3">{row.location}</td>
              <td className="p-3">
                <div className="flex flex-wrap gap-1">
                  {row.artistes.map((artist: any, i: number) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-gray-200 rounded text-xs"
                    >
                      {artist}
                    </span>
                  ))}
                </div>
              </td>
              <td className="p-3">
                {Object.entries(row.tickets).map(([type, t]: any) => (
                  <div className="capitalize" key={type}>
                    🎟 {type}: ₦{formatNumber(t.price)} ({t?.count})
                  </div>
                ))}
              </td>
              <td className="p-3">
                {Object.entries(row.tables).map(([type, t]: any) => (
                  <div className="capitalize" key={type}>
                    🪑 {type}: ₦{formatNumber(t.price)} ({t.count})
                  </div>
                ))}
              </td>
              <td className="p-3 text-right">
                <button className="px-3 py-1 text-sm border rounded hover:bg-gray-100">
                  Edit
                </button>
                <button
                  onClick={() => {
                    setSelectedRow({ ...row });
                    setOpenModal(true);
                  }}
                  className="px-3 py-1 text-sm border bg-blue-600 text-white rounded hover:opacity-90 mt-2"
                >
                  Guest List
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      <GuestModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        guests={selectedRow?.guestlist}
        description={selectedRow?.description}
        eventId={selectedRow?.eventId}
        dateId={selectedRow?.id}
        refetch={refetchCalendar}
      />
    </div>
  );
}
