"use client";

import { createContext, useContext, useEffect, useState } from "react";

const themeContext = createContext({
  theme: "dark",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const saved = window.localStorage.getItem("skillbridge-theme");
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("skillbridge-theme", theme);
  }, [theme]);

  return (
    <themeContext.Provider value={{ theme, toggleTheme: () => setTheme((prev) => (prev === "dark" ? "light" : "dark")) }}>
      {children}
    </themeContext.Provider>
  );
}

export function useTheme() {
  return useContext(themeContext);
}
