"use client";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 1000 * 60 * 5,
    },
  },
});
const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const { initializeTheme } = useTheme();
  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SessionProvider>{children}</SessionProvider>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default AppProvider;
