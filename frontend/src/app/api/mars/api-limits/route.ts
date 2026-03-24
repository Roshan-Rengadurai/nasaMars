import { NextResponse } from "next/server";
import axios from "axios";

const API_KEY = process.env.NASA_API_KEY || "DEMO_KEY";

export async function GET() {
  try {
    const response = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`
    );

    const limit = 1000; // you can set based on NASA API policy
    const remaining = Math.floor(Math.random() * limit); // placeholder logic

    return NextResponse.json({ limit, remaining });
  } catch (error: any) {
    console.error("Error fetching API limits:", error.message);
    return NextResponse.json(
      { msg: "Error fetching API limits." },
      { status: 500 }
    ); 
  }
}
