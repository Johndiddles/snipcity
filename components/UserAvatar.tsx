"use client";
import { useSession } from "next-auth/react";
import ProfileAvatar from "./Avatar";
const UserAvatar = () => {
  const { data: session } = useSession();
  return (
    <ProfileAvatar
      name={session?.user?.name as string}
      image={session?.user?.image as string}
    />
  );
};

export default UserAvatar;
