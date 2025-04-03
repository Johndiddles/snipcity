import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";

const protectedRoutes = ["/snippets/create", "/profile"];

export default async function middleware(request: NextRequest) {
  const session = await auth();

  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const loginUrl = new URL("/api/auth/signin", request.url);

  loginUrl.searchParams.set("from", request.nextUrl.pathname);

  if (isProtected && !session) {
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  unstable_allowDynamic: ["./db/connectToDb.ts", "./db/schema/User.ts"],
};
