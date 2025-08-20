// app/api/artist/route.js

import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

async function getSpotifyAccessToken() {
  const tokenResponse = await axios.post(
    "https://accounts.spotify.com/api/token",
    new URLSearchParams({
      grant_type: "client_credentials",
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(
            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
          ).toString("base64"),
      },
    }
  );

  return tokenResponse.data.access_token;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const artistId = searchParams.get("artistId");

  if (!artistId) {
    return NextResponse.json(
      { error: "Artist ID is required" },
      { status: 400 }
    );
  }

  try {
    const accessToken = await getSpotifyAccessToken();

    const artistResponse = await axios.get(
      `https://api.spotify.com/v1/artists/${artistId}/albums`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return NextResponse.json(artistResponse.data, { status: 200 });
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      // Token might have expired, try fetching a new token and retrying the request
      try {
        const accessToken = await getSpotifyAccessToken();

        const artistResponse = await axios.get(
          `https://api.spotify.com/v1/artists/${artistId}/albums`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        return NextResponse.json(artistResponse.data, { status: 200 });
      } catch (retryError) {
        console.error("Error fetching artist data on retry:", retryError);
        return NextResponse.json(
          { error: "Failed to fetch artist data after retrying" },
          { status: 500 }
        );
      }
    } else {
      console.error("Error fetching artist data:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }
}
