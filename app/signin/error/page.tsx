"use client";
import { Suspense } from "react";
import SignInErrorScreen from "@/components/SigninErrorPage/SigninErrorScreen";

const SignInErrorPage = () => {
  return (
    <Suspense>
      <SignInErrorScreen />
    </Suspense>
  );
};

export default SignInErrorPage;
