import { auth } from "@/auth";
import { generateExtensionToken } from "@/lib/jwt";
import { redirect } from "next/navigation";

const VscodeExtensionSigninSuccessPage = async () => {
  const authUser = await auth();

  console.log({ authUser });

  const token = generateExtensionToken({
    id: authUser?.user?.id as string,
    email: authUser?.user?.email as string,
  });
  console.log({ token });

  if (token) {
    redirect(
      `${process.env.VSCODE_EXTENSION_BASE_URL}?token=${token}&email=${authUser?.user?.email}&id=${authUser?.user?.id}&username=${authUser?.user?.name}`
    );
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <p>Redirecting to vscode...</p>
    </div>
  );
};

export default VscodeExtensionSigninSuccessPage;
