import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "maxu-theme";

export const themes = [
  { id: "default", label: "默认", icon: "◆" },
  { id: "warm", label: "暖色", icon: "◇" },
  { id: "minimal", label: "极简", icon: "○" },
  { id: "cyber", label: "赛博", icon: "▸" },
  { id: "ocean", label: "海洋", icon: "◉" },
  { id: "rose", label: "玫瑰", icon: "♥" },
  { id: "dusk", label: "暮色", icon: "◐" },
  { id: "forest", label: "森林", icon: "●" }
];

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [themeId, setThemeIdState] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || "default";
    } catch {
      return "default";
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeId);
    try {
      localStorage.setItem(STORAGE_KEY, themeId);
    } catch {}
  }, [themeId]);

  const setTheme = (id) => setThemeIdState(id);

  const cycleTheme = () => {
    const idx = themes.findIndex((t) => t.id === themeId);
    const next = themes[(idx + 1) % themes.length];
    setTheme(next.id);
  };

  return (
    <ThemeContext.Provider value={{ themeId, setTheme, cycleTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
