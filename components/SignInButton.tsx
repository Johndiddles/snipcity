import { login } from "@/lib/auth";
import React from "react";
import { Button } from "./ui/button";

const SignInButton = () => {
  return (
    <Button variant="ghost" onClick={() => login("github")}>
      Login with GitHub
    </Button>
  );
};

export default SignInButton;
