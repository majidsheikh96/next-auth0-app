import { google } from "googleapis";

export async function getGmailMessages(accessToken) {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });

  const gmail = google.gmail({ version: "v1", auth });

  const response = await gmail.users.messages.list({
    userId: "me",
    q: "is:unread",
    maxResults: 5,
  });

  return response.data.messages;
}

export async function getEmailDetails(messages, accessToken) {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });

  const gmail = google.gmail({ version: "v1", auth });

  return await Promise.all(
    messages.map(async (message) => {
      const messageResponse = await gmail.users.messages.get({
        userId: "me",
        id: message.id,
        metadataHeaders: ["From", "To", "Subject"],
      });

      const email = messageResponse.data;
      const headers = email.payload.headers;

      const subject = headers.find(
        (header) => header.name === "Subject"
      )?.value;
      const from = headers.find((header) => header.name === "From")?.value;
      const to = headers.find((header) => header.name === "To")?.value;

      const body = email.payload.parts
        ? email.payload.parts.find((part) => part.mimeType === "text/plain")
            ?.body.data
        : email.payload.body.data;

      const decodedBody = body
        ? Buffer.from(body, "base64").toString("utf-8")
        : "";

      return {
        id: email.id,
        threadId: email.threadId,
        subject,
        from,
        to,
        body: decodedBody,
      };
    })
  );
}
