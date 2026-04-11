"use client";

import React, { useState } from "react";

interface TicketOption {
  price: number;
  count: number;
}

interface EventDayForm {
  id: string;
  city: string;
  country: string;
  location: string;
  description: string;
  image?: string;
  date: string;
  tickets: { [type: string]: TicketOption };
  tables: { [type: string]: TicketOption };
}

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
}

const emptyDay = (): EventDayForm => ({
  id: crypto.randomUUID(),
  city: "",
  country: "",
  location: "",
  description: "",
  image: "",
  date: "",
  tickets: {
    regular: { price: 0, count: 0 },
    vip: { price: 0, count: 0 },
  },
  tables: {
    standard: { price: 0, count: 0 },
  },
});

export default function AddEventModal({
  isOpen,
  onClose,
  refetch,
}: AddEventModalProps) {
  const [formData, setFormData] = useState({
    eventName: "",
    artistes: "",
    dates: [emptyDay()],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleEventChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDateChange = (
    index: number,
    field: keyof EventDayForm,
    value: string,
  ) => {
    setFormData((prev) => {
      const updatedDates = [...prev.dates];
      updatedDates[index] = {
        ...updatedDates[index],
        [field]: value,
      };
      return {
        ...prev,
        dates: updatedDates,
      };
    });
  };

  const handleNestedChange = (
    index: number,
    section: "tickets" | "tables",
    type: string,
    field: "price" | "count",
    value: number,
  ) => {
    setFormData((prev) => {
      const updatedDates = [...prev.dates];
      updatedDates[index] = {
        ...updatedDates[index],
        [section]: {
          ...updatedDates[index][section],
          [type]: {
            ...updatedDates[index][section][type],
            [field]: value,
          },
        },
      };

      return {
        ...prev,
        dates: updatedDates,
      };
    });
  };

  const addDateBlock = () => {
    setFormData((prev) => ({
      ...prev,
      dates: [...prev.dates, emptyDay()],
    }));
  };

  const removeDateBlock = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      dates: prev.dates.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      const payload = {
        eventName: formData.eventName.trim(),
        artistes: formData.artistes
          .split(",")
          .map((artist) => artist.trim())
          .filter(Boolean),
        dates: formData.dates,
      };

      const res = await fetch("/api/outside/add-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to add event");
        return;
      }

      alert("Event added successfully");
      onClose();
      refetch();
      setFormData({
        eventName: "",
        artistes: "",
        dates: [emptyDay()],
      });
    } catch (error) {
      console.error("Error adding event:", error);
      alert("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-lg font-semibold">Add Event</h2>
          <button
            onClick={onClose}
            className="text-sm px-3 py-1 border rounded hover:bg-gray-50"
          >
            Close
          </button>
        </div>

        <div className="p-5 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium block mb-2">
                Event Name
              </label>
              <input
                type="text"
                value={formData.eventName}
                onChange={(e) => handleEventChange("eventName", e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="AntiWorld Fest"
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">Artistes</label>
              <input
                type="text"
                value={formData.artistes}
                onChange={(e) => handleEventChange("artistes", e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="Reeplay, Odumodublvck"
              />
              <p className="text-xs text-gray-500 mt-1">
                Separate artistes with commas
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {formData.dates.map((day, index) => (
              <div key={day.id} className="border rounded-2xl p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Date Block {index + 1}</h3>
                  {formData.dates.length > 1 && (
                    <button
                      onClick={() => removeDateBlock(index)}
                      className="text-sm px-3 py-1 border rounded hover:bg-gray-50"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={day.city}
                    onChange={(e) =>
                      handleDateChange(index, "city", e.target.value)
                    }
                    className="w-full border rounded px-3 py-2 text-sm"
                    placeholder="City"
                  />

                  <input
                    type="text"
                    value={day.country}
                    onChange={(e) =>
                      handleDateChange(index, "country", e.target.value)
                    }
                    className="w-full border rounded px-3 py-2 text-sm"
                    placeholder="Country"
                  />

                  <input
                    type="text"
                    value={day.location}
                    onChange={(e) =>
                      handleDateChange(index, "location", e.target.value)
                    }
                    className="w-full border rounded px-3 py-2 text-sm"
                    placeholder="Location"
                  />

                  <input
                    type="date"
                    value={day.date}
                    onChange={(e) =>
                      handleDateChange(index, "date", e.target.value)
                    }
                    className="w-full border rounded px-3 py-2 text-sm"
                  />

                  <input
                    type="text"
                    value={day.image || ""}
                    onChange={(e) =>
                      handleDateChange(index, "image", e.target.value)
                    }
                    className="w-full border rounded px-3 py-2 text-sm md:col-span-2"
                    placeholder="Image URL"
                  />

                  <textarea
                    value={day.description}
                    onChange={(e) =>
                      handleDateChange(index, "description", e.target.value)
                    }
                    className="w-full border rounded px-3 py-2 text-sm md:col-span-2"
                    placeholder="Description"
                    rows={3}
                  />
                </div>

                <div>
                  <h4 className="font-medium mb-3">Tickets</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(day.tickets).map(([type, value]) => (
                      <div
                        key={type}
                        className="border rounded-xl p-3 space-y-2"
                      >
                        <p className="text-sm font-medium capitalize">{type}</p>
                        <input
                          type="number"
                          value={value.price}
                          onChange={(e) =>
                            handleNestedChange(
                              index,
                              "tickets",
                              type,
                              "price",
                              Number(e.target.value),
                            )
                          }
                          className="w-full border rounded px-3 py-2 text-sm"
                          placeholder="Price"
                        />
                        <input
                          type="number"
                          value={value.count}
                          onChange={(e) =>
                            handleNestedChange(
                              index,
                              "tickets",
                              type,
                              "count",
                              Number(e.target.value),
                            )
                          }
                          className="w-full border rounded px-3 py-2 text-sm"
                          placeholder="Count"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Tables</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(day.tables).map(([type, value]) => (
                      <div
                        key={type}
                        className="border rounded-xl p-3 space-y-2"
                      >
                        <p className="text-sm font-medium capitalize">{type}</p>
                        <input
                          type="number"
                          value={value.price}
                          onChange={(e) =>
                            handleNestedChange(
                              index,
                              "tables",
                              type,
                              "price",
                              Number(e.target.value),
                            )
                          }
                          className="w-full border rounded px-3 py-2 text-sm"
                          placeholder="Price"
                        />
                        <input
                          type="number"
                          value={value.count}
                          onChange={(e) =>
                            handleNestedChange(
                              index,
                              "tables",
                              type,
                              "count",
                              Number(e.target.value),
                            )
                          }
                          className="w-full border rounded px-3 py-2 text-sm"
                          placeholder="Count"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={addDateBlock}
            className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
          >
            Add Another Date
          </button>
        </div>

        <div className="flex justify-end gap-3 p-5 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-4 py-2 bg-black text-white rounded-lg text-sm disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save Event"}
          </button>
        </div>
      </div>
    </div>
  );
}
