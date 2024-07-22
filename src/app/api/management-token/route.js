import { NextResponse } from "next/server";

export async function GET() {
  const url = "https://next-auth0-app-demo.us.auth0.com/oauth/token";
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };
  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: process.env.AUTH0_CLIENT_ID,
    client_secret: process.env.AUTH0_CLIENT_SECRET,
    audience: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/`,
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    // console.error("Error fetching Management API token:", error);
    return NextResponse.json(
      { error: "Error fetching Management API token" },
      { status: 500 }
    );
  }
}
