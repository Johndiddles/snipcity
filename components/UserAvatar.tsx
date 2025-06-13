"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
const UserAvatar = () => {
  const { data: session } = useSession();
  return (
    <Avatar className="h-8 w-8">
      <AvatarImage src={session?.user?.image as string} alt="@user" />
      <AvatarFallback>{session?.user?.name?.[0]}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
