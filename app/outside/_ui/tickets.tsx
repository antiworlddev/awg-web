"use client";

import Button from "@/app/ui/button";
import Incrementer from "@/app/ui/incrementer";
import { rsvpTicketsFree } from "@/helpers/api-controller";
import { EventDayProps, TicketOption } from "@/helpers/types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Blocks } from "react-loader-spinner";

type TicketForm = {
  name: string;
  email: string;
  phoneNumber: string;
};
interface TicketsProps {
  tickets: { [type: string]: TicketOption };
  description: string;
}
export default function Tickets({ tickets, description }: TicketsProps) {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [formData, setFormData] = useState<Record<string, TicketForm>>({});
  const router = useRouter();

  const rsvpFreeMutation = useMutation({
    mutationFn: (data: any) => rsvpTicketsFree(data),
    onSuccess: (data, variables) => {
      // `variables` is what we passed to mutate()
      const { ticketType, quantity, name, email } = variables;

      router.push(
        `/outside/confirmation?` +
          `ticketType=${encodeURIComponent(ticketType)}` +
          `&quantity=${encodeURIComponent(quantity)}` +
          `&name=${encodeURIComponent(name)}` +
          `&email=${encodeURIComponent(email)}` +
          `&description=${encodeURIComponent(description)}`
      );
    },
  });

  const toggleAccordion = (type: string) => {
    setOpenAccordion(openAccordion === type ? null : type);
  };

  const handleIncrement = (type: string) => {
    setQuantities((prev) => ({
      ...prev,
      [type]: (prev[type] || 0) + 1,
    }));
  };

  const handleDecrement = (type: string) => {
    setQuantities((prev) => ({
      ...prev,
      [type]: Math.max((prev[type] || 0) - 1, 0),
    }));
  };

  const handleFormChange = (type: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value,
      },
    }));
  };

  if (rsvpFreeMutation.isPending)
    return (
      <div className="flex flex-col w-screen h-screen items-center justify-center bg-black bg-opacity-45 absolute top-0 right-0">
        <Blocks />
        <p>Processing Your Reservation. Do Not Close This Page.</p>
      </div>
    );

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-3">Tickets</h3>
      <div className="space-y-3">
        {Object.entries(tickets).map(([type, { price }]) => (
          <div key={type} className="border p-3 rounded">
            {/* Row */}
            <div className="flex justify-between items-center">
              <div>
                <span className="font-medium uppercase mr-2">{type}</span>
                <span className="text-gray-700">₦{price.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-4">
                <Incrementer
                  value={quantities[type] || 0}
                  leftClick={() => handleDecrement(type)}
                  rightClick={() => handleIncrement(type)}
                />
                <Button
                  label={price === 0 ? "RSVP" : "GET"}
                  onClick={() => toggleAccordion(type)}
                />
              </div>
            </div>

            {/* Accordion */}
            {openAccordion === type && (
              <div className="mt-4 border-t pt-4 space-y-3 animate-slideDown">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={formData[type]?.name || ""}
                  onChange={(e) =>
                    handleFormChange(type, "name", e.target.value)
                  }
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={formData[type]?.email || ""}
                  onChange={(e) =>
                    handleFormChange(type, "email", e.target.value)
                  }
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={formData[type]?.phoneNumber || ""}
                  onChange={(e) =>
                    handleFormChange(type, "phoneNumber", e.target.value)
                  }
                />
                <Button
                  label={price === 0 ? "REGISTER" : "MAKE PAYMENT"}
                  onClick={() => {
                    if (quantities[type] > 0) {
                      price === 0
                        ? rsvpFreeMutation.mutate({
                            ticketType: type,
                            quantity: quantities[type] || 0,
                            ...formData[type],
                          })
                        : console.log("Payment flow here");
                    } else {
                      alert("Add at least 1 ticket to proceed.");
                    }
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
