"use server";

import { signIn, signOut } from "@/auth";
import { Providers } from "@/types/auth";

export const login = async (provider: Providers = "github") => {
  await signIn(provider, { redirectTo: `${process.env.BASE_URL}/` });
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};
