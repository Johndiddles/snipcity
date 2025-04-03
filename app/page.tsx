"use server";
import SignInButton from "@/components/SignInButton";
import { auth } from "../auth";

export default async function Home() {
  const session = await auth();
  return (
    <div className="flex flex-col justify-center items-center gap-10 min-h-screen">
      <h1 className="text-3xl font-bold">snipCity</h1>
      {!session && <SignInButton />}
    </div>
  );
}
