import { Client } from "@microsoft/microsoft-graph-client";

export async function getMicrosoftEmailDetails(accessToken) {
  const client = Client.init({
    authProvider: (done) => {
      done(null, accessToken);
    },
  });

  const response = await client
    .api("/me/mailFolders/inbox/messages")
    .select("subject,from,bodyPreview")
    .top(5)
    .filter("isRead eq false")
    .get();

  return response.value.map((email) => ({
    id: email.id,
    subject: email.subject,
    from: email.from.emailAddress.address,
    snippet: email.bodyPreview,
  }));
}
