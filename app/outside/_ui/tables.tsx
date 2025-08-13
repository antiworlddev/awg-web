import Button from "@/app/ui/button";
import Incrementer from "@/app/ui/incrementer";
import { EventDayProps, TicketOption } from "@/helpers/types";
import { useState } from "react";

type TableForm = {
  name: string;
  email: string;
  phoneNumber: string;
};
interface TablesProps {
  tables: { [type: string]: TicketOption };
}
export default function Tables({ tables }: TablesProps) {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [formData, setFormData] = useState<Record<string, TableForm>>({});

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

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-3">Tables</h3>
      <div className="space-y-3">
        {Object.entries(tables).map(([type, { price }]) => (
          <div key={type} className="border p-3 rounded">
            {/* Row */}
            <div className="flex justify-between items-center">
              <div>
                <span className="font-medium uppercase mr-2">{type}</span>
                <span className="text-gray-700">₦{price.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-4">
                <Button label="RSVP" onClick={() => toggleAccordion(type)} />
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
                  label="SEND MESSAGE"
                  onClick={() => {
                    const data = formData[type];
                    if (!data?.name || !data?.email || !data?.phoneNumber) {
                      alert("Please fill in all details before proceeding.");
                      return;
                    }

                    const message = `
              Hello, I’d like to RSVP for a ${type} table.
              Name: ${data.name}
              Email: ${data.email}
              Phone Number: ${data.phoneNumber}
              Price: ₦${price.toLocaleString()}
                  `;

                    const url = `https://wa.me/2349033464348?text=${encodeURIComponent(
                      message
                    )}`;
                    window?.open(url, "_blank");
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
