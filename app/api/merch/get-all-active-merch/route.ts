import { NextRequest, NextResponse } from "next/server";
import { db } from "@/helpers/utils/db";

export const revalidate = 60;

export async function GET(req: NextRequest) {
  try {
    // Fetch all products (filtering by quantity in Firestore is no longer possible)
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

    // Filter active merch (where total color stock > 0)
    snapshot.forEach((doc) => {
      const product = doc.data();

      // Calculate total stock from colors
      const totalStock = product.colors?.reduce(
        (sum: number, color: { stock: number }) => sum + (color.stock || 0),
        0
      );

      if (totalStock > 0) {
        result.push({ id: doc.id, ...product });
      }
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
