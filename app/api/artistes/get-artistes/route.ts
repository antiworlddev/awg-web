import { NextRequest, NextResponse } from "next/server";
import { db } from "@/helpers/utils/db";

export async function GET(req: NextRequest) {
  try {
    const artistesDb = db.collection("artistes");
    let result: any = [];
    let snapshot = await artistesDb.get();
    if (snapshot.empty) {
      return NextResponse.json({
        success: true,
        message: "No artistes Found",
      });
    }
    snapshot.forEach((doc) => {
      const data = doc.data();
      result.push({ id: doc.id, ...data });
    });
    return NextResponse.json({
      success: true,
      artistes: result,
    });
  } catch (err) {
    console.error("Error fetching artistes:", err);
    return NextResponse.json(
      { error: "Failed to fetch artistes" },
      { status: 500 }
    );
  }
}
