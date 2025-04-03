"use client";
import { Button } from "@/components/ui/button";
import SignInButton from "@/components/SignInButton";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import { BiSolidError } from "react-icons/bi";

const SignInErrorPage = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-12">
      <BiSolidError size={100} className="text-red-700" />
      <div className="flex flex-col gap-4 justify-center items-center">
        <h1 className="text-3xl font-bold">We couldn&apos;t sign you in</h1>
        <p className="text-gray-700">{error}</p>
      </div>
      <div className="flex justify-center items-center gap-8">
        <Link href={"/"} passHref>
          <Button>Home</Button>
        </Link>
        <SignInButton />
      </div>
    </div>
  );
};

export default SignInErrorPage;
