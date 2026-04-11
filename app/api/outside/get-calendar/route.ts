export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/helpers/utils/db";

export async function GET(req: NextRequest) {
  console.log(db);
  try {
    const calendarDb = db.collection("calendar");
    const snapshot = await calendarDb.get();

    if (snapshot.empty) {
      return NextResponse.json({
        success: true,
        message: "No event Found",
      });
    }

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const toLocalDateOnly = (v: any) => {
      const d = v?.toDate ? v.toDate() : new Date(v); // handles Firestore Timestamp or string/Date
      return new Date(d.getFullYear(), d.getMonth(), d.getDate()); // local midnight
    };

    const result = snapshot.docs
      .map((doc) => {
        const data = doc.data();

        const upcomingDates = data.dates
          .filter((d: any) => toLocalDateOnly(d.date) >= startOfToday) // keep today & future
          .sort(
            (a: any, b: any) =>
              new Date(a.date).getTime() - new Date(b.date).getTime(),
          )
          .map(({ guestlist, ...rest }: any) => rest);

        return upcomingDates.length > 0
          ? { eventId: doc.id, ...data, dates: upcomingDates }
          : null;
      })
      .filter(Boolean);

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
      { status: 500 },
    );
  }
}
