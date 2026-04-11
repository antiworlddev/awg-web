import { NextResponse } from "next/server";
import { db } from "@/helpers/utils/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { eventName, artistes, dates } = body;

    if (!eventName || !artistes || !dates) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 },
      );
    }

    if (!Array.isArray(artistes) || artistes.length === 0) {
      return NextResponse.json(
        { success: false, message: "Artistes must be a non-empty array" },
        { status: 400 },
      );
    }

    if (!Array.isArray(dates) || dates.length === 0) {
      return NextResponse.json(
        { success: false, message: "Dates must be a non-empty array" },
        { status: 400 },
      );
    }

    const eventRef = db.collection("calendar").doc();

    const cleanedDates = dates.map((date: any) => ({
      id: date.id || "",
      city: date.city || "",
      country: date.country || "",
      location: date.location || "",
      description: date.description || "",
      image: date.image || "",
      date: date.date || "",
      tickets: date.tickets || {},
      tables: date.tables || {},
      guestlist: date.guestlist || [],
    }));

    await eventRef.set({
      eventName: eventName.trim(),
      artistes: artistes.map((artist: string) => artist.trim()).filter(Boolean),
      dates: cleanedDates,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Event added successfully",
      },
      { status: 201 },
    );
  } catch (err: any) {
    console.error("Error adding event:", err);

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
