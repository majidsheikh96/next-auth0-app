"use client";
import React, { useState, useEffect } from "react";

const AuthButtons = () => {
  const [googleStatus, setGoogleStatus] = useState("Connect Gmail");
  const [outlookStatus, setOutlookStatus] = useState("Connect Outlook");

  useEffect(() => {
    const googleAccount = localStorage.getItem("google_account");
    const microsoftAccount = localStorage.getItem("microsoft_account");

    if (googleAccount) {
      setGoogleStatus("Connected");
    }

    if (microsoftAccount) {
      setOutlookStatus("Connected");
    }
  }, []);

  return (
    <div className="flex space-x-4 mt-4">
      <a
        href="/api/auth/login?connection=google-oauth2"
        className={`px-4 py-2 rounded-lg text-white font-semibold ${
          googleStatus === "Connected"
            ? "bg-green-600"
            : "bg-blue-500 hover:bg-blue-600"
        } transition-colors duration-200`}
      >
        {googleStatus}
      </a>
      <a
        href="/api/auth/login?connection=windowslive"
        className={`px-4 py-2 rounded-lg text-white font-semibold ${
          outlookStatus === "Connected"
            ? "bg-green-600"
            : "bg-blue-500 hover:bg-blue-600"
        } transition-colors duration-200`}
      >
        {outlookStatus}
      </a>
    </div>
  );
};

export default AuthButtons;
