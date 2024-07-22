// app/api/auth/[auth0]/route.js
import {
  getSession,
  handleAuth,
  handleCallback,
  handleLogin,
} from "@auth0/nextjs-auth0";
import { jwtDecode } from "jwt-decode";

export const GET = handleAuth({
  login: handleLogin({
    authorizationParams: {
      prompt: "login",
      //   connection: "google-oauth2" || "windowslive",
    },
  }),

  //   callback: handleCallback(async () => {
  //     const session = await getSession();
  //     const user_data = jwtDecode(session.idToken);
  //     console.log(user_data);
  //     return (session.user_id = user_data.sub);
  //   }),
});
