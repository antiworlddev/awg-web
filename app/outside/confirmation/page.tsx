"use client";

import { getEventName } from "@/helpers/api-controller";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { HiCheckCircle } from "react-icons/hi";
import jsPDF from "jspdf";
import { Suspense, useEffect } from "react";
function ConfirmationPage() {
  const searchParams = useSearchParams();

  const ticketType = searchParams.get("ticketType") || "";
  const quantity = searchParams.get("quantity") || "";
  const name = searchParams.get("name") || "";
  const email = searchParams.get("email") || "";
  const description = searchParams.get("description") || "";

  // Auto-generate PDF when data is ready
  useEffect(() => {
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
    doc.text(`Name: ${name}`, 20, 65);
    doc.text(`Email: ${email}`, 20, 75);
    doc.text(`Event: ${description}`, 20, 95);
    doc.text(`Ticket Type: ${ticketType}`, 20, 105);
    doc.text(`Quantity: ${quantity}`, 20, 115);

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(120, 120, 120);
    doc.text(
      "Thank you for your RSVP. Please keep this confirmation for entry.",
      105,
      280,
      { align: "center" }
    );

    doc.save(`RSVP_${name}.pdf`);
    doc.save(`RSVP-${name.replace(/\s+/g, "_")}.pdf`);
  }, [name, email, ticketType, quantity, description]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
        <HiCheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="mt-4 text-2xl font-bold text-gray-800">
          RSVP Confirmed!
        </h1>
        <p className="mt-2 text-gray-600">
          Thank you, <span className="font-semibold">{name}</span>. Your RSVP
          has been recorded for: {description}
        </p>

        <div className="mt-6 border-t border-gray-200 pt-4 text-left space-y-2">
          <p className="capitalize">
            <span className="font-semibold">Ticket Type:</span> {ticketType}
          </p>
          <p>
            <span className="font-semibold">Quantity:</span> {quantity}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {email}
          </p>
        </div>

        <button
          onClick={() => (window.location.href = "/")}
          className="mt-8 w-full bg-black text-white py-2 rounded hover:bg-gray-900 transition"
        >
          Back to Home
        </button>
        <p className="mt-8 text-sm text-gray-500">
          Need help?{" "}
          <a href="mailto:support@antiworldfest.com" className="underline">
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense>
      <ConfirmationPage />
    </Suspense>
  );
}
