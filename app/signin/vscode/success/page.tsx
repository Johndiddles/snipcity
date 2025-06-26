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
    redirect(`vscode://johndiddles.snippit-vscode?token=${token}`);
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <p>Redirecting to vscode...</p>
    </div>
  );
};

export default VscodeExtensionSigninSuccessPage;
