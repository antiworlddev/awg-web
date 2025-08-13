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

    // Normalize email for case and space
    const normalizedEmail = email.trim().toLowerCase();

    const eventRef = db.collection("calendar").doc(eventId);
    const eventSnap = await eventRef.get();

    if (!eventSnap.exists) {
      return NextResponse.json(
        { success: false, message: "Event not found" },
        { status: 404 }
      );
    }

    const eventData = eventSnap.data();
    const dates = eventData?.dates || [];

    const dateIndex = dates.findIndex((d: any) => d.id === dateId);
    if (dateIndex === -1) {
      return NextResponse.json(
        { success: false, message: "Event date not found" },
        { status: 404 }
      );
    }

    const guestlist = dates[dateIndex].guestlist || [];

    // Look for an existing guest by normalized email
    const guestIndex = guestlist.findIndex(
      (g: any) => g.email.trim().toLowerCase() === normalizedEmail
    );

    if (guestIndex > -1) {
      // Update existing guest's ticket quantity for that ticket type
      guestlist[guestIndex][ticketType] =
        (guestlist[guestIndex][ticketType] || 0) + quantity;
    } else {
      // Add new guest entry
      guestlist.push({
        name,
        email: normalizedEmail,
        phoneNumber,
        [ticketType]: quantity,
      });
    }

    // Update the date's guestlist
    dates[dateIndex].guestlist = guestlist;

    await eventRef.update({ dates });

    return NextResponse.json(
      { success: true, message: "RSVP successfully recorded" },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error in RSVP Tickets Free API:", err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
