import {
  addGuestAdmin,
  rsvpTicketsFree,
  useTicket,
} from "@/helpers/api-controller";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { HiCheckCircle } from "react-icons/hi";
import jsPDF from "jspdf";

interface GuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
  guests: any[];
  eventId: string;
  dateId: string;
  description: string;
}

export function GuestModal({
  isOpen,
  onClose,
  guests,
  description,
  eventId,
  dateId,
  refetch,
}: GuestModalProps) {
  const [showForm, setShowForm] = useState(false);

  // form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    ticketType: "",
    quantity: 1,
  });

  const useTicketMutation = useMutation({
    mutationFn: (data: any) => useTicket(data),
    onSuccess: () => {
      refetch();
      onClose();
    },
  });

  const addGuestMutation = useMutation({
    mutationFn: () => addGuestAdmin({ ...form, eventId, dateId }),
    onSuccess: () => {
      setForm({
        name: "",
        email: "",
        phoneNumber: "",
        ticketType: "",
        quantity: 1,
      });
      setShowForm(false);

      //auto download ticket
      const doc = new jsPDF();
      doc.rect(0, 0, 210, 30, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(18);
      doc.text(description, 105, 18, { align: "center" });

      // Success Icon Emoji (simple)
      doc.setTextColor(0, 150, 0);
      doc.setFontSize(22);
      doc.text("RSVP Confirmed", 105, 45, { align: "center" });

      // Event Info
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(14);
      doc.text(`Name: ${form?.name}`, 20, 65);
      doc.text(`Email: ${form?.email}`, 20, 75);
      doc.text(`Event: ${description}`, 20, 95);
      doc.text(`Ticket Type: ${form?.ticketType}`, 20, 105);
      doc.text(`Quantity: ${form?.quantity}`, 20, 115);

      // Footer
      doc.setFontSize(10);
      doc.setTextColor(120, 120, 120);
      doc.text(
        "Thank you for your RSVP. Please keep this confirmation for entry.",
        105,
        280,
        { align: "center" },
      );

      doc.save(`RSVP_${form?.name}.pdf`);
      doc.save(`RSVP-${form?.name.replace(/\s+/g, "_")}.pdf`);

      refetch();
      onClose();
    },
  });

  if (!isOpen) return null;

  // Normalizer helper
  const normalizeGuests = (guests: any[]) => {
    const rows: any[] = [];
    guests?.forEach((guest, index) => {
      Object.keys(guest).forEach((key) => {
        if (
          !["name", "email", "phoneNumber", "used"].includes(key) &&
          guest[key] > 0
        ) {
          rows.push({
            id: index + key, // give unique key
            name: guest.name,
            email: guest.email,
            phoneNumber: guest.phoneNumber,
            used: guest.used,
            ticketType: key,
            quantity: guest[key],
          });
        }
      });
    });
    return rows;
  };

  const handleAddGuest = () => {
    if (!form.name || !form.email || !form.ticketType) return; // basic validation

    addGuestMutation.mutate();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">
            Guest List - ({normalizeGuests(guests)?.length})
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
          <table className="w-full border-collapse mb-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Name</th>
                <th className="border p-2 text-left">Email</th>
                <th className="border p-2 text-left">Phone</th>
                <th className="border p-2 text-left">Ticket</th>
                <th className="border p-2 text-center">Qty</th>
                <th className="border p-2 text-center">Status</th>
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
                  <td className="border p-2 text-center">
                    <button
                      onClick={
                        guest?.used
                          ? () => {}
                          : () =>
                              useTicketMutation.mutate({
                                eventId,
                                dateId,
                                email: guest.email,
                              })
                      }
                    >
                      {guest?.used ? "Already Used" : "Use Ticket"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Add Guest Button */}
          {/* <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 mb-4"
          >
            {showForm ? "Cancel" : "Add Guest"}
          </button> */}

          {/* Form */}
          {/* {showForm && (
            <div className="border p-4 rounded bg-gray-50">
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="border p-2 rounded"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={form.phoneNumber}
                  onChange={(e) =>
                    setForm({ ...form, phoneNumber: e.target.value })
                  }
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Ticket Type"
                  value={form.ticketType}
                  onChange={(e) =>
                    setForm({ ...form, ticketType: e.target.value })
                  }
                  className="border p-2 rounded"
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  value={form.quantity}
                  onChange={(e) =>
                    setForm({ ...form, quantity: Number(e.target.value) })
                  }
                  className="border p-2 rounded"
                  min={1}
                />
              </div>
              <button
                onClick={handleAddGuest}
                className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
              >
                Add
              </button>
            </div>
          )} */}
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
