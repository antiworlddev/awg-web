import { NextRequest, NextResponse } from "next/server";
import { db } from "@/helpers/utils/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      txref,
      eventId,
      dateId,
      name,
      email,
      phoneNumber,
      ticketType,
      quantity,
    } = body;

    if (
      !txref ||
      !eventId ||
      !dateId ||
      !name ||
      !email ||
      !ticketType ||
      !quantity
    ) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 },
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const parsedQuantity = Number(quantity);

    if (Number.isNaN(parsedQuantity) || parsedQuantity <= 0) {
      return NextResponse.json(
        { success: false, message: "Invalid quantity" },
        { status: 400 },
      );
    }

    const eventRef = db.collection("calendar").doc(eventId);

    const result = await db.runTransaction(async (transaction) => {
      const eventSnap = await transaction.get(eventRef);

      if (!eventSnap.exists) {
        throw new Error("EVENT_NOT_FOUND");
      }

      const eventData = eventSnap.data();
      const dates = eventData?.dates || [];

      const dateIndex = dates.findIndex((d: any) => d.id === dateId);

      if (dateIndex === -1) {
        throw new Error("DATE_NOT_FOUND");
      }

      const dateData = dates[dateIndex];
      const guestlist = dateData.guestlist || [];
      const ticketInfo = dateData.tickets?.[ticketType];

      if (!ticketInfo) {
        throw new Error("TICKET_TYPE_NOT_FOUND");
      }

      // Check if this txref has already been fulfilled anywhere in this guestlist
      const alreadyFulfilled = guestlist.some(
        (guest: any) =>
          Array.isArray(guest.txrefs) && guest.txrefs.includes(txref),
      );

      if (alreadyFulfilled) {
        return "ALREADY_FULFILLED";
      }

      if (ticketInfo.count < parsedQuantity) {
        throw new Error("INSUFFICIENT_TICKETS");
      }

      const guestIndex = guestlist.findIndex(
        (g: any) => g.email?.trim().toLowerCase() === normalizedEmail,
      );

      if (guestIndex > -1) {
        const existingGuest = guestlist[guestIndex];
        const existingTxrefs = Array.isArray(existingGuest.txrefs)
          ? existingGuest.txrefs
          : [];

        guestlist[guestIndex] = {
          ...existingGuest,
          name: existingGuest.name || name,
          email: normalizedEmail,
          phoneNumber: existingGuest.phoneNumber || phoneNumber || "",
          [ticketType]: (existingGuest[ticketType] || 0) + parsedQuantity,
          txrefs: [...existingTxrefs, txref],
        };
      } else {
        guestlist.push({
          name,
          email: normalizedEmail,
          phoneNumber: phoneNumber || "",
          [ticketType]: parsedQuantity,
          txrefs: [txref],
        });
      }

      dateData.tickets[ticketType].count -= parsedQuantity;
      dates[dateIndex] = {
        ...dateData,
        guestlist,
      };

      transaction.update(eventRef, { dates });

      return "FULFILLED";
    });

    if (result === "ALREADY_FULFILLED") {
      return NextResponse.json(
        { success: true, message: "Ticket already fulfilled" },
        { status: 200 },
      );
    }

    return NextResponse.json(
      { success: true, message: "Ticket fulfilled successfully" },
      { status: 200 },
    );
  } catch (err: any) {
    console.error("Error in fulfill-ticket API:", err);

    let message = "Internal server error";
    let status = 500;

    if (err.message === "EVENT_NOT_FOUND") {
      message = "Event not found";
      status = 404;
    } else if (err.message === "DATE_NOT_FOUND") {
      message = "Event date not found";
      status = 404;
    } else if (err.message === "TICKET_TYPE_NOT_FOUND") {
      message = "Ticket type not found";
      status = 404;
    } else if (err.message === "INSUFFICIENT_TICKETS") {
      message = "Not enough tickets available";
      status = 400;
    }

    return NextResponse.json({ success: false, message }, { status });
  }
}
