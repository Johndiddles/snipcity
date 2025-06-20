export function initializeTheme() {
  const root = document.documentElement;
  const storedTheme = localStorage.getItem("theme");

  if (storedTheme === "dark" || storedTheme === "light") {
    root.classList.remove("dark", "light");
    root.classList.add(storedTheme);
  } else {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const defaultTheme = prefersDark ? "dark" : "light";

    root.classList.add(defaultTheme);
    localStorage.setItem("theme", defaultTheme);
  }
}
