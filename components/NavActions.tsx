"use client";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { useState } from "react";
import { Menu, Moon, Sun, User } from "lucide-react";
import NewSnippet from "./NewSnippet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BiLogoGithub } from "react-icons/bi";
import SignInButton from "./SignInButton";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import SnippetSearch from "./SnippetSearch";
import { logout } from "@/lib/auth";
import UserAvatar from "./UserAvatar";

const NavActions = () => {
  const { data: session } = useSession();
  const [isDark, setIsDark] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };
  return (
    <>
      {/* Desktop Actions */}
      <div className="hidden md:flex items-center gap-4">
        <Button onClick={toggleTheme} variant="ghost" size="icon">
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        <NewSnippet />

        {!!session ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <UserAvatar />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BiLogoGithub className="mr-2 h-4 w-4" />
                My Snippets
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button variant={"ghost"} onClick={() => logout()}>
                  Sign out
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex gap-2">
            <SignInButton />
          </div>
        )}
      </div>

      {/* Mobile Actions */}
      <div className="flex md:hidden items-center gap-2">
        <NewSnippet />

        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <div className="flex flex-col gap-4 mt-4">
              {/* Mobile Search */}
              <SnippetSearch />

              {/* Theme Toggle */}
              <Button
                onClick={toggleTheme}
                variant="outline"
                className="justify-start gap-2"
              >
                {isDark ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
                {isDark ? "Light Mode" : "Dark Mode"}
              </Button>

              {/* User Actions */}
              {!!session ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 p-2 border rounded-lg">
                    <UserAvatar />
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {session?.user?.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {session?.user?.email}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" className="justify-start gap-2">
                    <User className="h-4 w-4" />
                    Profile
                  </Button>
                  <Button variant="outline" className="justify-start gap-2">
                    <BiLogoGithub className="h-4 w-4" />
                    My Snippets
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start gap-2 text-destructive"
                    onClick={() => logout()}
                  >
                    Log out
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <SignInButton />
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default NavActions;
