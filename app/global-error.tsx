"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { initializeTheme } from "@/lib/theme";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { useEffect } from "react";

// Error boundaries must be Client Components

export default function GlobalError({
  error,
  reset = () => (window.location.href = window.location.href),
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    initializeTheme();
  }, []);
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <AlertTriangle className="h-12 w-12 text-red-500" />
              </div>
              <CardTitle className="text-xl text-red-600">
                Oops! Something went wrong
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-center">
                We&apos;re sorry, but something unexpected happened. Please try
                refreshing the page or go back to the home page.
              </p>

              {error && (
                <details className="bg-gray-100 p-3 rounded-lg text-sm">
                  <summary className="cursor-pointer font-medium text-gray-700 mb-2">
                    Error Details
                  </summary>
                  <div className="space-y-2">
                    <div>
                      <strong>Error:</strong> {error.message}
                    </div>
                    {error?.stack && (
                      <div>
                        <strong>Component Stack:</strong>
                        <pre className="text-xs mt-1 overflow-auto">
                          {JSON.stringify(error?.stack)}
                        </pre>
                      </div>
                    )}
                  </div>
                </details>
              )}

              <div className="flex gap-2 pt-4">
                <Button onClick={reset} className="flex-1" variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
                <Button
                  onClick={() => {
                    window.location.href = "/";
                  }}
                  className="flex-1"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Go Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </body>
    </html>
  );
}
