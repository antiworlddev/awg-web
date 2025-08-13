export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/helpers/utils/db";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const eventId = searchParams.get("eventId");
    const dateId = searchParams.get("dateId");

    if (!eventId || !dateId) {
      return NextResponse.json(
        { success: false, message: "Missing eventId or dateId" },
        { status: 400 }
      );
    }

    // Fetch event document from "calendar" collection
    const eventRef = db.collection("calendar").doc(eventId);
    const eventSnap = await eventRef.get();

    if (!eventSnap.exists) {
      return NextResponse.json(
        { success: false, message: "Event not found" },
        { status: 404 }
      );
    }

    const eventData = eventSnap.data();
    const dateObj = eventData?.dates?.find((d: any) => d.id === dateId);

    if (!dateObj) {
      return NextResponse.json(
        { success: false, message: "Date not found in event" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        eventName: eventData?.eventName || null,
        dateName: dateObj?.description || null,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error fetching event/date name:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
