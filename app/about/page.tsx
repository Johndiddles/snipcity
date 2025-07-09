import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code, Share, Users, Zap, ExternalLink } from "lucide-react";
import Link from "next/link";

const About = () => {
  const features = [
    {
      icon: Code,
      title: "Multi-Language Support",
      description:
        "Share code snippets in JavaScript, Python, CSS, and many more programming languages with syntax highlighting.",
    },
    {
      icon: Share,
      title: "Easy Sharing",
      description:
        "Quickly share your code snippets with others through simple links and social features.",
    },
    {
      icon: Users,
      title: "Community Driven",
      description:
        "Discover snippets from other developers, upvote useful code, and build your reputation.",
    },
    {
      icon: Zap,
      title: "Fast & Responsive",
      description:
        "Built with modern technologies for lightning-fast performance on all devices.",
    },
  ];

  const technologies = ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn/ui"];

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="h-16 w-16 mx-auto mb-6 rounded-2xl bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-2xl">
            {"</>"}
          </span>
        </div>
        <h1 className="text-4xl font-bold mb-4">About SnipCity</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A modern platform for developers to share, discover, and manage code
          snippets with ease.
        </p>
      </div>

      {/* Mission Section */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="text-2xl">Our Mission</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg leading-relaxed">
            SnipCity was created to solve a simple problem: developers often
            write useful code snippets that get lost in the depths of their file
            systems. We believe that great code should be shared, discovered,
            and reused by the community. Our platform makes it easy to store,
            organize, and share your most valuable code snippets while
            discovering solutions from other talented developers.
          </p>
        </CardContent>
      </Card>

      {/* Features Grid */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Technology Stack */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="text-2xl">
            Built With Modern Technologies
          </CardTitle>
          <CardDescription>
            SnipCity is built using cutting-edge web technologies for the best
            user experience.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-sm py-1 px-3"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Start Sharing?</h2>
        <p className="text-muted-foreground mb-6">
          Join our community of developers and start building your snippet
          collection today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/">Browse Snippets</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/extension">
              <ExternalLink className="h-4 w-4 mr-2" />
              Get VS Code Extension
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default About;
