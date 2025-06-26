"use server";

import { signIn, signOut } from "@/auth";
import { Providers } from "@/types/auth";

export const login = async (provider: Providers = "github", from?: string) => {
  await signIn(provider, {
    redirectTo:
      from === "vscode"
        ? `${process.env.BASE_URL}/signin/vscode/success`
        : `${process.env.BASE_URL}/`,
  });
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};
