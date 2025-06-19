import { login } from "@/lib/auth";
import { useSession } from "next-auth/react";

export function useAuthWithCallback() {
  const { data: session } = useSession();

  async function withAuth(callback: () => void) {
    if (!session) {
      login("github");
    } else {
      return callback();
    }
  }

  return { withAuth };
}
