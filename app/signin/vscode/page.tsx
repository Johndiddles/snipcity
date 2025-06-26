"use client";

import { login } from "@/lib/auth";
import { useEffect } from "react";

const VscodeExtensionSigninPage = () => {
  useEffect(() => {
    login("github", "vscode");
  }, []);
  return;
};

export default VscodeExtensionSigninPage;
