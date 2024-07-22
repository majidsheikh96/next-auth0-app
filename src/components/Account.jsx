"use client";
import React, { useState, useEffect } from "react";
import MailList from "./MailList";
import { Alert } from "./ui/alert";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Loader } from "lucide-react";

const Account = () => {
  const { user, error, isLoading } = useUser();
  const provider = user?.sub?.split("|")[0];

  const [googleData, setGoogleData] = useState(null);
  const [outlookData, setOutlookData] = useState(null);
  const [googleEmails, setGoogleEmails] = useState([]);
  const [outlookEmails, setOutlookEmails] = useState([]);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingOutlook, setLoadingOutlook] = useState(false);
  const [needsFetch, setNeedsFetch] = useState(true); // State to trigger data fetch

  // Handle localStorage updates for user accounts
  useEffect(() => {
    if (user && provider) {
      if (provider === "google-oauth2") {
        localStorage.setItem("google_account", user.sub);
      } else if (provider === "windowslive") {
        localStorage.setItem("microsoft_account", user.sub);
      }
      setNeedsFetch(true); // Trigger data fetch after login
    }
  }, [user, provider]);

  // Fetch Google Data
  useEffect(() => {
    const fetchGoogleData = async () => {
      const googleAccount = localStorage.getItem("google_account");
      if (googleAccount) {
        setLoadingGoogle(true);
        try {
          const response = await fetch("/api/gmail", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ googleAccount }),
          });
          const data = await response.json();
          const { userInfo, emailDetails } = data;
          setGoogleData(userInfo);
          if (Array.isArray(emailDetails)) {
            const googleEmails = emailDetails.map((email) => ({
              ...email,
              mailbox: "Google",
            }));
            setGoogleEmails(googleEmails);
          }
        } catch (error) {
          console.error("Error fetching Google data:", error);
        } finally {
          setLoadingGoogle(false);
        }
      }
    };

    if (needsFetch) {
      fetchGoogleData();
    }
  }, [needsFetch]);

  // Fetch Outlook Data
  useEffect(() => {
    const fetchOutlookData = async () => {
      const microsoftAccount = localStorage.getItem("microsoft_account");
      if (microsoftAccount) {
        setLoadingOutlook(true);
        try {
          const response = await fetch("/api/outlook", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ microsoftAccount }),
          });
          const data = await response.json();
          const { userInfo, emailDetails } = data;
          setOutlookData(userInfo);
          if (Array.isArray(emailDetails)) {
            const outlookEmails = emailDetails.map((email) => ({
              ...email,
              mailbox: "Outlook",
            }));
            setOutlookEmails(outlookEmails);
          }
        } catch (error) {
          console.error("Error fetching Outlook data:", error);
        } finally {
          setLoadingOutlook(false);
        }
      }
    };

    if (needsFetch) {
      fetchOutlookData();
      setNeedsFetch(false); // Reset the fetch trigger
    }
  }, [needsFetch]);

  if (isLoading) return <span>Loading...</span>;
  if (error) return <Alert severity="error">{error.message}</Alert>;

  const emails = [...googleEmails, ...outlookEmails];

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {!googleData && (
          <a
            href="/api/auth/login?connection=google-oauth2"
            className="px-4 py-2 rounded-lg text-white font-semibold bg-blue-500 hover:bg-blue-600 transition-colors duration-200 text-center"
          >
            Connect Google
          </a>
        )}
        {googleData && (
          <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md border">
            <img
              src={googleData.picture}
              alt={`${googleData.name}'s profile`}
              className="h-16 w-16 rounded-full"
            />
            <div>
              <div className="text-lg font-semibold">{googleData.name}</div>
              <div className="text-sm text-gray-600">{googleData.email}</div>
            </div>
          </div>
        )}
        {loadingGoogle && (
          <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md border">
            <Loader className="animate-spin h-8 w-8 text-gray-500" />
          </div>
        )}
        {!outlookData && (
          <a
            href="/api/auth/login?connection=windowslive"
            className="px-4 py-2 rounded-lg text-white font-semibold bg-blue-500 hover:bg-blue-600 transition-colors duration-200 text-center"
          >
            Connect Outlook
          </a>
        )}
        {outlookData && (
          <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md border">
            <img
              src={outlookData.picture}
              alt={`${outlookData.name}'s profile`}
              className="h-16 w-16 rounded-full"
            />
            <div>
              <div className="text-lg font-semibold">{outlookData.name}</div>
              <div className="text-sm text-gray-600">{outlookData.email}</div>
            </div>
          </div>
        )}
        {loadingOutlook && (
          <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md border">
            <Loader className="animate-spin h-8 w-8 text-gray-500" />
          </div>
        )}
      </div>
      <h2 className="text-2xl font-semibold mt-8 mb-4">Emails</h2>
      <MailList emails={emails} />
    </div>
  );
};

export default Account;
