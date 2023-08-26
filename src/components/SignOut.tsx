"use client";
import { signOut } from "next-auth/react";
import React from "react";

const SignOut = () => {
  return (
    <div>
      <button
        onClick={() =>
          signOut({
            callbackUrl: "/login",
            redirect: true,
          })
        }
        className="bg-orange-300 rounded-md p-3"
      >
        Sign Out
      </button>
    </div>
  );
};

export default SignOut;
