import { NextResponse } from "next/server";
import axios from "axios";

const API_KEY = process.env.NASA_API_KEY || "DEMO_KEY";
const NASA_API_BASE_URL = "https://api.nasa.gov";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const rover = searchParams.get("rover") || "curiosity";
  const sol = searchParams.get("sol") || "1000";

  try {
    const url = `${NASA_API_BASE_URL}/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&api_key=${API_KEY}`;
    const response = await axios.get(url);
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error fetching Mars photos:", error.message);
    return NextResponse.json(
      { msg: "Error fetching Mars photos." },
      { status: 500 }
    );
  }
}
