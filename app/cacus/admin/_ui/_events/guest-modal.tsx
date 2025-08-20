import { useState } from "react";

interface GuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  guests: any[];
  eventName: string;
}

export function GuestModal({
  isOpen,
  onClose,
  guests,
  eventName,
}: GuestModalProps) {
  if (!isOpen) return null;

  // Normalizer helper
  const normalizeGuests = (guests: any[]) => {
    const rows: any[] = [];
    guests.forEach((guest) => {
      Object.keys(guest).forEach((key) => {
        if (!["name", "email", "phoneNumber"].includes(key) && guest[key] > 0) {
          rows.push({
            name: guest.name,
            email: guest.email,
            phoneNumber: guest.phoneNumber,
            ticketType: key,
            quantity: guest[key],
          });
        }
      });
    });
    return rows;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">
            Guest List - ({guests?.length})
          </h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-4 flex-1">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Name</th>
                <th className="border p-2 text-left">Email</th>
                <th className="border p-2 text-left">Phone</th>
                <th className="border p-2 text-left">Ticket</th>
                <th className="border p-2 text-center">Qty</th>
              </tr>
            </thead>
            <tbody>
              {normalizeGuests(guests)?.map((guest) => (
                <tr key={guest.id} className="hover:bg-gray-50">
                  <td className="border p-2">{guest.name}</td>
                  <td className="border p-2">{guest.email}</td>
                  <td className="border p-2">{guest.phoneNumber}</td>
                  <td className="border p-2">{guest.ticketType}</td>
                  <td className="border p-2 text-center">{guest.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-between">
          <p>
            Expected guests:{" "}
            {normalizeGuests(guests)?.reduce((sum, g) => sum + g.quantity, 0)}
          </p>
          <button
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
