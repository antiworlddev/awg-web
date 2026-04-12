import Button from "@/app/ui/button";
import Incrementer from "@/app/ui/incrementer";
import { makePayment, rsvpTicketsFree } from "@/helpers/api-controller";
import { validateEmail } from "@/helpers/functions";
import { EventDayProps, TicketOption } from "@/helpers/types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

type TableForm = {
  name: string;
  email: string;
  phoneNumber: string;
};
interface TablesProps {
  tables: { [type: string]: TicketOption };
  description: string;
  eventId: string;
  dateId: string;
}
export default function Tables({
  tables,
  description,
  eventId,
  dateId,
}: TablesProps) {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [formData, setFormData] = useState<Record<string, TableForm>>({});

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
          `&description=${encodeURIComponent(description)}`,
      );
    },
  });

  const handlePayment = async (type: string, price: number) => {
    localStorage.setItem("eventId", eventId);
    localStorage.setItem("dateId", dateId);
    localStorage.setItem("ticketType", type);

    if (!validateEmail(formData[type]?.email)) {
      return;
    }
    const response = await makePayment({
      email: formData[type]?.email,
      price: price * (quantities[type] || 0),
      callbackUrl: `${process.env.NEXT_PUBLIC_LIVE_URL}/outside/confirmation/?mode=paid&email=${
        formData[type]?.email
      }&quantity=${quantities[type]}&price=${price}&name=${formData[type]?.name}&phoneNumber=${formData[type]?.phoneNumber}&description=${description}`,
      currency: "NGN",
    });
    if (response["status"]) {
      router.push(response["data"]["authorization_url"]);
    }
  };

  const handleRSVPFree: any = (type: string) => {
    rsvpFreeMutation.mutate({
      ticketType: type,
      quantity: quantities[type] || 0,
      ...formData[type],
      eventId,
      dateId,
    });
  };

  const toggleAccordion = (type: string) => {
    setOpenAccordion(openAccordion === type ? null : type);
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

  const handleIncrement = (type: string) => {
    setQuantities((prev) => ({
      ...prev,
      [type]: prev[type] === 2 ? prev[type] : (prev[type] || 0) + 1,
    }));
  };

  const handleDecrement = (type: string) => {
    setQuantities((prev) => ({
      ...prev,
      [type]: Math.max((prev[type] || 0) - 1, 0),
    }));
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-3">Tickets</h3>
      <div className="space-y-3">
        {Object.entries(tables)
          .sort(([, a], [, b]) => a.price - b.price)
          .map(([type, { price, desc }]) => (
            <div key={type} className="border border-cyan-900 p-3 rounded">
              {/* Row */}
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-medium uppercase mr-2">{type}</span>
                  <span className="text-gray-700">
                    ₦{price.toLocaleString()}
                  </span>
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
                  <p className="text-xs font-bold tracking-wide">{desc}</p>
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
                      if (!validateEmail(formData[type]?.email)) {
                        return;
                      }

                      if (quantities[type] > 0) {
                        price === 0
                          ? handleRSVPFree(type)
                          : handlePayment(type, price);
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
