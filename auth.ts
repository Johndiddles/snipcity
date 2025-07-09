import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import { CreateUserPayload } from "./db/models/createUser";

export const { signIn, signOut, handlers, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [Github],
  callbacks: {
    async signIn({ user, profile }) {
      if (!user || !profile) {
        return false;
      }
      const userToDb: CreateUserPayload = {
        user_provider_id: profile.id!,
        username: (profile.login as string) || profile.name!,
        email: profile.email!,
        authProvider: "github",
        profileImage: (profile.avatar_url as string) || "",
      };

      const response = await fetch(`${process.env.BASE_URL}/api/user/create`, {
        method: "POST",
        body: JSON.stringify(userToDb),
      });

      const data = await response.json();
      const { user: updatedUser, error } = data;

      // const { user: updatedUser, error } = await createUser(
      //   userToDb as CreateUserPayload
      // );

      if (error) {
        console.error({ error });
        return `/signin/error?error=${error}`;
      }

      user.id = updatedUser!._id?.toString();
      user.image = updatedUser?.profileImage;
      user.name = updatedUser?.username;
      user.email = updatedUser?.email;
      return true;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.sub!,
      };
      return session;
    },
  },
});
