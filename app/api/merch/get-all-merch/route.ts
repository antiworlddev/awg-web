import { NextRequest, NextResponse } from "next/server";
import { db } from "@/helpers/utils/db";

export const revalidate = 60;

export async function GET(req: NextRequest) {
  try {
    const merchDb = db.collection("merch");
    let result: any = [];
    let snapshot = await merchDb.get();

    if (snapshot.empty) {
      return NextResponse.json(
        {
          success: true,
          message: "No merch Found",
        },
        { headers: { "Cache-Control": "no-store, max-age=0" } }
      );
    }

    snapshot.forEach((doc) => {
      const product = doc.data();

      result.push({ id: doc.id, ...product });
    });

    return NextResponse.json(
      {
        success: true,
        merch: result,
      },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch (err) {
    console.error("Error fetching merch:", err);
    return NextResponse.json(
      { error: "Failed to fetch merch" },
      { status: 500 }
    );
  }
}
