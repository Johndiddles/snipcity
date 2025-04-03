import { auth } from "@/auth";
import Container from "./Container";
import SignInButton from "./SignInButton";
import Image from "next/image";
import Link from "next/link";

const Header = async () => {
  const session = await auth();
  console.log({ session });
  return (
    <div className="bg-slate-900 text-gray-200 w-full">
      <Container>
        <div className="flex justify-between items-center py-4">
          <Link href="/">
            <div className="text-3xl font-bold">Snippit</div>
          </Link>

          <div className="flex gap-10 items-center">
            <Link
              href={"/discover"}
              className="underline underline-offset-8 cursor-pointer duration-300 ease-in-out hover:text-green-500"
            >
              Explore
            </Link>

            {session && (
              <Link
                href="/snippets/create"
                className="underline underline-offset-8 cursor-pointer duration-300 ease-in-out hover:text-green-500"
              >
                New Snippet
              </Link>
            )}
          </div>
          <div>
            {session ? (
              <div className="flex items-center gap-4">
                <Link href={"/profile"} passHref>
                  <button className="rounded-full overflow-hidden w-12 h-12 cursor-pointer">
                    <Image
                      src={session.user?.image || ""}
                      alt="avatar"
                      width={48}
                      height={48}
                    />
                  </button>
                </Link>
              </div>
            ) : (
              <SignInButton />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
