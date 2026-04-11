import { NextRequest, NextResponse } from "next/server";
import { db } from "@/helpers/utils/db";
import { postmarkClient } from "@/helpers/utils/postmark";
import QRCode from "qrcode";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { txref, eventId, dateId, name, email, ticketType, quantity } = body;

    if (
      !txref ||
      !eventId ||
      !dateId ||
      !name ||
      !email ||
      !ticketType ||
      !quantity
    ) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 },
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    const eventRef = db.collection("calendar").doc(eventId);
    const eventSnap = await eventRef.get();

    if (!eventSnap.exists) {
      return NextResponse.json(
        { success: false, message: "Event not found" },
        { status: 404 },
      );
    }

    const eventData = eventSnap.data();
    const dates = eventData?.dates || [];
    const dateData = dates.find((d: any) => d.id === dateId);

    if (!dateData) {
      return NextResponse.json(
        { success: false, message: "Event date not found" },
        { status: 404 },
      );
    }

    const eventName = eventData?.eventName || "Event";
    const eventDate = dateData?.date || "";
    const eventLocation = dateData?.location || "";
    const eventCity = dateData?.city || "";
    const eventCountry = dateData?.country || "";

    const qrPayload = JSON.stringify({
      email: normalizedEmail,
    });

    const qrDataUrl = await QRCode.toDataURL(qrPayload, {
      width: 300,
      margin: 1,
    });

    const qrBase64 = qrDataUrl.replace(/^data:image\/png;base64,/, "");

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; color: #111827;">
        <div style="padding: 24px; border: 1px solid #e5e7eb; border-radius: 16px;">
          <h1 style="margin: 0 0 8px; font-size: 24px;">Your Ticket is Confirmed</h1>
          <p style="margin: 0 0 24px; color: #4b5563;">
            Payment received successfully. Please present this QR code at entry.
          </p>

          <div style="margin-bottom: 20px;">
            <p style="margin: 0 0 8px;"><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p style="margin: 0 0 8px;"><strong>Email:</strong> ${escapeHtml(normalizedEmail)}</p>
            <p style="margin: 0 0 8px;"><strong>Event:</strong> ${escapeHtml(eventName)}</p>
            <p style="margin: 0 0 8px;"><strong>Date:</strong> ${escapeHtml(eventDate)}</p>
            <p style="margin: 0 0 8px;"><strong>Venue:</strong> ${escapeHtml(eventLocation)}</p>
            <p style="margin: 0 0 8px;"><strong>City:</strong> ${escapeHtml(eventCity)}, ${escapeHtml(eventCountry)}</p>
            <p style="margin: 0 0 8px;"><strong>Ticket Type:</strong> ${escapeHtml(ticketType)}</p>
            <p style="margin: 0 0 8px;"><strong>Quantity:</strong> ${escapeHtml(String(quantity))}</p>
            <p style="margin: 0 0 8px;"><strong>Reference:</strong> ${escapeHtml(txref)}</p>
          </div>

          <div style="text-align: center; margin: 24px 0;">
            <img src="cid:ticket-qrcode" alt="Ticket QR Code" style="width: 220px; height: 220px;" />
          </div>

          <p style="font-size: 13px; color: #6b7280; margin-top: 24px;">
            Keep this email safe. If the QR code does not load, your ticket reference is:
            <strong>${escapeHtml(txref)}</strong>
          </p>
        </div>
      </div>
    `;

    const response = await postmarkClient.sendEmail({
      From: process.env.POSTMARK_FROM_EMAIL || "",
      To: normalizedEmail,
      Subject: `${eventName} Ticket Confirmation`,
      HtmlBody: htmlBody,
      TextBody: `
Your Ticket is Confirmed

Name: ${name}
Email: ${normalizedEmail}
Event: ${eventName}
Date: ${eventDate}
Venue: ${eventLocation}
City: ${eventCity}, ${eventCountry}
Ticket Type: ${ticketType}
Quantity: ${quantity}
Reference: ${txref}

Present your QR code at entry.
      `,
      MessageStream: "outbound",
      Attachments: [
        {
          Name: "ticket-qrcode.png",
          Content: qrBase64,
          ContentType: "image/png",
          ContentID: "cid:ticket-qrcode",
        },
      ],
    });

    return NextResponse.json(
      {
        success: true,
        message: "Ticket email sent successfully",
        data: response,
      },
      { status: 200 },
    );
  } catch (err: any) {
    console.error("Error sending ticket email:", err);

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
