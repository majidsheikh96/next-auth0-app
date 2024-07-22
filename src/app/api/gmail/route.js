import { NextResponse } from "next/server";
import { getManagementToken, getUserInfo } from "@/lib/auth";
import { getMicrosoftEmailDetails } from "@/lib/microsoft";
import { getGmailMessages, getEmailDetails } from "@/lib/gmail";

export async function POST(request) {
  try {
    const res = await request.json();
    const userId = res.googleAccount;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const managementToken = await getManagementToken();
    const userInfo = await getUserInfo(userId, managementToken);
    const accessToken = userInfo.identities[0].access_token;
    // Use either Microsoft or Gmail based on the account type
    let emailDetails;
    if (userId) {
      const messages = await getGmailMessages(accessToken);
      emailDetails = await getEmailDetails(messages, accessToken);
    } else {
      return NextResponse.json(
        { error: "Invalid account type" },
        { status: 400 }
      );
    }

    return NextResponse.json({ userInfo, emailDetails });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
