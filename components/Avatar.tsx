import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProfileAvatar = ({ name, image }: { image: string; name: string }) => {
  return (
    <Avatar className="h-8 w-8">
      <AvatarImage src={image as string} alt="@user" />
      <AvatarFallback>{name?.[0]}</AvatarFallback>
    </Avatar>
  );
};

export default ProfileAvatar;
