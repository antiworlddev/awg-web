export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/helpers/utils/db";

export async function GET(req: NextRequest) {
  try {
    const calendarDb = db.collection("calendar");
    const snapshot = await calendarDb.get();

    if (snapshot.empty) {
      return NextResponse.json({
        success: true,
        message: "No event Found",
      });
    }

    const today = new Date();
    const result = snapshot.docs
      .map((doc) => {
        const data = doc.data();

        // Filter for only upcoming dates

        return { eventId: doc.id, ...data };
      })
      .filter((event) => event !== null);

    if (result.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No event Found",
      });
    }

    return NextResponse.json({
      success: true,
      calendar: result,
    });
  } catch (err) {
    console.error("Error fetching calendar:", err);
    return NextResponse.json(
      { error: "Failed to fetch calendar" },
      { status: 500 }
    );
  }
}
