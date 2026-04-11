import React from "react";
import { HiCheckCircle } from "react-icons/hi";

interface ConfirmationCardProps {
  name: string;
  description: string;
  ticketType: string;
  quantity: string;
  email: string;
}
export default function ConfirmationCard({
  name,
  description,
  ticketType,
  quantity,
  email,
}: ConfirmationCardProps) {
  return (
    <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
      <HiCheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
      <h1 className="mt-4 text-2xl font-bold text-gray-800">RSVP Confirmed!</h1>
      <p className="mt-2 text-gray-600">
        Thank you, <span className="font-semibold">{name}</span>. Your RSVP has
        been recorded for: {description}
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
  );
}
