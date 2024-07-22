"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

const MailList = ({ emails }) => {
  const [selectedMail, setSelectedMail] = useState(null);
  console.log(emails);
  return (
    <div className="flex flex-col gap-4">
      {emails.map((item) => (
        <button
          key={item.id}
          className={cn(
            "flex flex-col items-start gap-2 p-4 bg-white rounded-lg shadow-md border transition-all hover:bg-gray-100",
            selectedMail === item.id && "bg-blue-50"
          )}
          onClick={() => setSelectedMail(item.id)}
        >
          <div className="flex w-full justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="font-semibold">{item.from}</div>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span
                className={cn(
                  "px-2 py-1 rounded-full text-white",
                  item.mailbox === "Google" ? "bg-red-500" : "bg-blue-500"
                )}
              >
                {item.mailbox}
              </span>
            </div>
          </div>
          <div className="text-sm font-medium">{item.subject}</div>
          <div className="line-clamp-2 text-sm text-gray-600">
            {item.snippet}
          </div>
        </button>
      ))}
    </div>
  );
};

export default MailList;
