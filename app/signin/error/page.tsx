"use client";
import { Suspense } from "react";
import SignInErrorScreen from "@/components/Screens/SigninErrorScreen";

const SignInErrorPage = () => {
  return (
    <Suspense>
      <SignInErrorScreen />
    </Suspense>
  );
};

export default SignInErrorPage;
