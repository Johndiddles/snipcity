"use client";
import { login } from "@/lib/auth";
import React from "react";

const SignInButton = () => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={() => login("github")}
    >
      Login with GitHub
    </button>
  );
};

export default SignInButton;
