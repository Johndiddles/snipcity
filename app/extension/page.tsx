import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Zap, Eye, Upload, CheckCircle, ArrowRight } from "lucide-react";
import {
  DownloadExtensionButton,
  InstallExtensionFromMarketplace,
} from "@/components/extension/DownloadExtension";
import { languages } from "@/mockData/languages";
import Image from "next/image";

const features = [
  {
    icon: Upload,
    title: "Seamless Integration",
    description:
      "Save code snippets directly from your editor without breaking your workflow.",
  },
  {
    icon: Eye,
    title: "Syntax Highlighting",
    description:
      "Automatic language detection and syntax highlighting for all your snippets.",
  },
  //   {
  //     icon: Code,
  //     title: "One-Click Sharing",
  //     description:
  //       "Select any code in VS Code and share it to SnipCity with a single command.",
  //   },
  //   {
  //     icon: Keyboard,
  //     title: "Keyboard Shortcuts",
  //     description:
  //       "Quick access with customizable keyboard shortcuts for maximum productivity.",
  //   },
];

const steps = [
  {
    step: 1,
    title: "Install Extension",
    description:
      "Download from VS Code Marketplace or install via command palette",
  },
  {
    step: 2,
    title: "Authenticate",
    description: "Connect your SnipCity account for seamless sharing",
  },
  {
    step: 3,
    title: "Start Saving and Sharing",
    description:
      "Open the extension and start saving snippets to share instantly",
  },
];

const Extension = () => {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="h-16 w-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <Code className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-4">VS Code Extension</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Share code snippets directly from Visual Studio Code to SnipCity
          without leaving your editor.
        </p>
        <div className="w-full py-2 my-4 flex justify-center items-center">
          <Image
            src="/snipcity.gif"
            alt="Snipcity vscode extension"
            width={1000}
            height={1000}
            className="w-full h-fit"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <InstallExtensionFromMarketplace />
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Extension Features
        </h2>
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

      {/* How it Works */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                {step.step}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <ArrowRight className="h-5 w-5 text-muted-foreground mt-1.5" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Requirements */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="text-2xl">System Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Minimum Requirements
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• VS Code</li>
                <li>• Internet connection for sharing</li>
                <li>• SnipCity account (free)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                Supported Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <Badge key={lang} variant="secondary">
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Installation Instructions */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="text-2xl">Quick Installation</CardTitle>
          {/* <CardDescription>
            Multiple ways to install the SnipCity extension
          </CardDescription> */}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">Via VS Code Marketplace</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Search for &quot;SnipCity&quot; in the Extensions view
            </p>
            <code className="text-sm bg-background px-2 py-1 rounded">
              Ctrl+Shift+X → Search &quot;SnipCity&quot;
            </code>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">
          Boost Your Productivity Today
        </h2>
        <p className="text-muted-foreground mb-6">
          Join other developers who are already using the SnipCity extension.
        </p>

        <DownloadExtensionButton />
      </div>
    </div>
  );
};

export default Extension;
