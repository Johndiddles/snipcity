import { Heart, ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const currentYear = new Date().getFullYear();

const footerLinks = [
  {
    title: "Product",
    links: [
      { name: "Home", href: "/" },
      { name: "Browse Snippets", href: "/" },
      { name: "VS Code Extension", href: "/extension" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      {
        name: "GitHub",
        href: "https://github.com/Johndiddles",
        external: true,
      },
      {
        name: "Contact",
        href: "mailto:johnadepelumi@gmail.com",
        external: true,
      },
    ],
  },
  //   {
  //     title: "Resources",
  //     links: [
  //       { name: "Documentation", href: "#", external: true },
  //       { name: "API Reference", href: "#", external: true },
  //       { name: "Community", href: "#", external: true },
  //     ],
  //   },
];

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  {"</>"}
                </span>
              </div>
              <span className="text-xl font-bold">SnipCity</span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-sm">
              A modern platform for developers to share, discover, and manage
              code snippets with ease.
            </p>
            {/* <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                >
                  <Github className="h-4 w-4" />
                </a>
              </Button>
            </div> */}
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center gap-1"
                      >
                        {link.name}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>© {currentYear} SnipCity. Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>by John Adepelumi.</span>
          </div>

          {/* <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
