"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import ConfirmationCard from "./_ui/confirmation-card";
import { createRSVPTicket } from "@/helpers/functions";
import { fulfilTicket, verifyTransaction } from "@/helpers/api-controller";
import { useMutation } from "@tanstack/react-query";

type ConfirmationStatus = "idle" | "processing" | "success" | "error";

function ConfirmationPage() {
  const searchParams = useSearchParams();
  const hasRun = useRef(false);

  const mode = searchParams.get("mode") || "free";
  const reference = searchParams.get("reference") || "";

  const router = useRouter();

  const quantity = searchParams.get("quantity") || "";
  const name = searchParams.get("name") || "";
  const phoneNumber = searchParams.get("phoneNumber") || "";
  const email = searchParams.get("email") || "";
  const description = searchParams.get("description") || "";

  const fulfilTicketMutation = useMutation({
    mutationFn: (ticketData: any) => {
      console.log("Fulfilling ticket with data:", ticketData);
      return fulfilTicket(ticketData);
    },
    onSuccess: async (data: any) => {
      if (data?.data?.message === "Ticket already fulfilled") {
        router.replace("/");
        return;
      }

      try {
        await fetch("/api/outside/send-ticket-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            txref: reference,
            eventId: localStorage.getItem("eventId"),
            dateId: localStorage.getItem("dateId"),
            name,
            email,
            ticketType: localStorage.getItem("ticketType"),
            quantity,
          }),
        });
      } catch (error) {
        console.error("Email sending failed:", error);
      }

      setStatus("success");
      setMessage("Payment confirmed and ticket fulfilled successfully");
    },
  });

  const [status, setStatus] = useState<ConfirmationStatus>("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const storedEventId = localStorage.getItem("eventId");
    const storedDateId = localStorage.getItem("dateId");

    console.log("running confirmation logic with params:");
    const handleConfirmation = async () => {
      try {
        if (mode === "free") {
          createRSVPTicket(
            name,
            email,
            localStorage.getItem("ticketType") || "",
            description,
            quantity,
          );
          setStatus("success");
          setMessage("RSVP confirmed successfully");
          return;
        }

        if (mode === "paid") {
          if (!reference) {
            setStatus("error");
            setMessage("Missing payment reference");
            return;
          }

          setStatus("processing");
          setMessage("Verifying payment...");

          const verifyData = await verifyTransaction(reference);

          if (!verifyData?.status) {
            setStatus("error");
            setMessage(verifyData?.message || "Payment verification failed");
            return;
          }
          console.log("Payment verified, fulfilling ticket...", verifyData);
          setMessage("Payment verified. Fulfilling ticket...");

          fulfilTicketMutation.mutate({
            txref: reference,
            eventId: storedEventId,
            dateId: storedDateId,
            name,
            email,
            phoneNumber,
            ticketType: localStorage.getItem("ticketType") || "",
            quantity,
          });
          return;
        }

        setStatus("error");
        setMessage("Invalid confirmation mode");
      } catch (error) {
        console.error("Confirmation error:", error);
        setStatus("error");
        setMessage("Something went wrong");
      }
    };

    handleConfirmation();
  }, [mode, reference, name, email, quantity, description]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <ConfirmationCard
        name={name}
        description={description}
        ticketType={localStorage.getItem("ticketType") || ""}
        quantity={quantity}
        email={email}
        // status={status}
        // message={message}
      />
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
