import { NextResponse } from "next/server";
import { db } from "@/helpers/utils/db"; // your initialized firebase-admin

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { eventId, dateId, email } = body;

    if (!eventId || !dateId || !email) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get event doc
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

    // Find date by ID
    const dateIndex = dates.findIndex((d: any) => d.id === dateId);
    if (dateIndex === -1) {
      return NextResponse.json(
        { success: false, message: "Date not found" },
        { status: 404 }
      );
    }

    // Guestlist for that date
    const guestlist = dates[dateIndex].guestlist || [];

    // Find guest by email
    const guestIndex = guestlist.findIndex((g: any) => g.email === email);
    if (guestIndex === -1) {
      return NextResponse.json(
        { success: false, message: "Guest not found" },
        { status: 404 }
      );
    }

    const guest = guestlist[guestIndex];

    // Already used?
    if (guest.used === true) {
      return NextResponse.json(
        { success: false, message: "Ticket already used" },
        { status: 200 }
      );
    }

    // Mark as used
    guestlist[guestIndex] = { ...guest, used: true };
    dates[dateIndex].guestlist = guestlist;

    // Save back to Firestore
    await eventRef.update({ dates });

    return NextResponse.json(
      { success: true, message: "Ticket marked as used" },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Error using ticket:", err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
