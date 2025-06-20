"use client";

import { useCallback, useEffect, useState } from "react";

export function useTheme() {
  const [isDark, setIsDark] = useState(false);

  const applyTheme = (theme: "light" | "dark") => {
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
    setIsDark(theme === "dark");
  };

  const initializeTheme = useCallback(() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme === "dark" || storedTheme === "light") {
      applyTheme(storedTheme);
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const defaultTheme = prefersDark ? "dark" : "light";
      applyTheme(defaultTheme);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const currentTheme = localStorage.getItem("theme") || "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(newTheme);
  }, []);

  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  return { initializeTheme, toggleTheme, isDark };
}
