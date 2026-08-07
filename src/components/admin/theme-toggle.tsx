"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("admin-theme");
    if (stored === "light") {
      setLight(true);
      document.documentElement.classList.add("light");
    }

    // Remove light class when leaving admin (component unmounts)
    return () => {
      document.documentElement.classList.remove("light");
    };
  }, []);

  function toggle() {
    const next = !light;
    setLight(next);
    if (next) {
      document.documentElement.classList.add("light");
      localStorage.setItem("admin-theme", "light");
    } else {
      document.documentElement.classList.remove("light");
      localStorage.setItem("admin-theme", "dark");
    }
  }

  return (
    <button
      onClick={toggle}
      className="rounded-md border border-border p-2 text-muted transition-colors hover:bg-background hover:text-foreground"
      aria-label={light ? "Switch to dark mode" : "Switch to light mode"}
    >
      {light ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </button>
  );
}
