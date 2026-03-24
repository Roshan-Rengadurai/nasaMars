import { NextResponse } from "next/server";
import axios from "axios";

const API_KEY = process.env.NASA_API_KEY || "DEMO_KEY";
const NASA_API_BASE_URL = "https://api.nasa.gov";

export async function GET() {
  try {
    const url = `${NASA_API_BASE_URL}/insight_weather/?api_key=${API_KEY}&feedtype=json&ver=1.0`;
    const response = await axios.get(url);
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error fetching Mars weather:", error.message);
    return NextResponse.json(
      { msg: "Error fetching Mars weather data." },
      { status: 500 }
    );
  }
}
