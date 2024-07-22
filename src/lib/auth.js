export async function getManagementToken() {
  const response = await fetch(
    "https://next-auth0-app-demo.us.auth0.com/oauth/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        audience: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/`,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Error fetching Management API token");
  }

  const data = await response.json();
  return data.access_token;
}

export async function getUserInfo(userId, managementToken) {
  const response = await fetch(
    `https://next-auth0-app-demo.us.auth0.com/api/v2/users/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${managementToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error fetching user info");
  }

  return await response.json();
}
