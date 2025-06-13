import Container from "./Container";
import SnippetSearch from "./SnippetSearch";
import Link from "next/link";
import NavActions from "./NavActions";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-14 md:h-16 items-center justify-between px-4">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center gap-2 md:gap-4">
            <div className="h-6 w-6 md:h-8 md:w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs md:text-sm">
                {"</>"}
              </span>
            </div>
            <h1 className="text-lg md:text-xl font-bold hidden sm:block">
              SnipCity
            </h1>
            <h1 className="text-lg md:text-xl font-bold sm:hidden">SC</h1>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <SnippetSearch />
          </div>

          <NavActions />
        </div>
      </Container>
    </header>
  );
};

export default Header;
