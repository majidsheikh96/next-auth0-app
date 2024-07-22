import { NextResponse } from "next/server";
import { getManagementToken, getUserInfo } from "@/lib/auth";
import { getMicrosoftEmailDetails } from "@/lib/microsoft";

export async function POST(request) {
  try {
    const res = await request.json();
    const userId = res.microsoftAccount;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const managementToken = await getManagementToken();
    const userInfo = await getUserInfo(userId, managementToken);
    const accessToken = userInfo.identities[0].access_token;

    const emailDetails = await getMicrosoftEmailDetails(accessToken);

    return NextResponse.json({ userInfo, emailDetails });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
