"use client";
import React from "react";

const AccountCard = ({ name, email, picture }) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md border">
      <img
        src={picture}
        alt={`${name}'s profile`}
        className="h-16 w-16 rounded-full"
      />
      <div>
        <div className="text-lg font-semibold">{name}</div>
        <div className="text-sm text-gray-600">{email}</div>
      </div>
    </div>
  );
};

export default AccountCard;
