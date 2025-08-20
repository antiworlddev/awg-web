import { NextRequest, NextResponse } from "next/server";
import { db } from "@/helpers/utils/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { eventId, dateId, name, email, phoneNumber, ticketType, quantity } =
      body;

    if (!eventId || !dateId || !name || !email || !ticketType || !quantity) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const eventRef = db.collection("calendar").doc(eventId);

    await db.runTransaction(async (transaction) => {
      const eventSnap = await transaction.get(eventRef);

      if (!eventSnap.exists) {
        throw new Error("Event not found");
      }

      const eventData = eventSnap.data();
      const dates = eventData?.dates || [];

      const dateIndex = dates.findIndex((d: any) => d.id === dateId);
      if (dateIndex === -1) {
        throw new Error("Event date not found");
      }

      const dateData = dates[dateIndex];
      const guestlist = dateData.guestlist || [];

      const ticketInfo = dateData.tickets?.[ticketType];
      if (!ticketInfo) {
        throw new Error("Ticket type not found");
      }

      if (ticketInfo.count < quantity) {
        throw new Error("Not enough tickets available");
      }

      const guestIndex = guestlist.findIndex(
        (g: any) => g.email.trim().toLowerCase() === normalizedEmail
      );

      if (guestIndex > -1) {
        guestlist[guestIndex][ticketType] =
          (guestlist[guestIndex][ticketType] || 0) + quantity;
      } else {
        guestlist.push({
          name,
          email: normalizedEmail,
          phoneNumber,
          [ticketType]: quantity,
        });
      }

      // Reduce ticket count
      dateData.tickets[ticketType].count -= quantity;

      // Update date entry
      dates[dateIndex] = { ...dateData, guestlist };

      transaction.update(eventRef, { dates });
    });

    return NextResponse.json(
      { success: true, message: "RSVP successfully recorded" },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Error in RSVP Transaction API:", err);

    return NextResponse.json(
      { success: false, message: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
