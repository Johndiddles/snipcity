"use client";
import { Download } from "lucide-react";
import { Button } from "../ui/button";

const downloadFromMarketPlace = () => {
  window.open(
    "https://marketplace.visualstudio.com/items?itemName=johndiddles-snipcity.snipcity",
    "_blank"
  );
};
export const DownloadExtensionButton = () => {
  return (
    <Button size="lg" className="gap-2" onClick={downloadFromMarketPlace}>
      <Download className="h-4 w-4" />
      Download Now - It&apos;s Free!
    </Button>
  );
};

export const InstallExtensionFromMarketplace = () => {
  return (
    <Button size="lg" className="gap-2" onClick={downloadFromMarketPlace}>
      <Download className="h-4 w-4" />
      Install from Marketplace
    </Button>
  );
};
