import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

export function ThemeSwitcher() {
  const { themeId, setTheme, themes } = useTheme();
  const [open, setOpen] = useState(false);
  const current = themes.find((t) => t.id === themeId) || themes[0];

  useEffect(() => {
    if (!open) return;
    const onOutside = () => setOpen(false);
    const t = setTimeout(() => document.addEventListener("click", onOutside), 0);
    return () => {
      clearTimeout(t);
      document.removeEventListener("click", onOutside);
    };
  }, [open]);

  return (
    <div className="theme-switcher-wrap">
      <button
        type="button"
        className="theme-switcher"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        title={`当前：${current.label}，点击选择风格`}
        aria-label={`当前风格：${current.label}，点击选择`}
      >
        <span className="theme-switcher-icon">{current.icon}</span>
        <span className="theme-switcher-label">{current.label}</span>
      </button>
      {open && (
        <div className="theme-switcher-dropdown" onClick={(e) => e.stopPropagation()}>
          {themes.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`theme-switcher-option ${t.id === themeId ? "active" : ""}`}
              onClick={() => {
                setTheme(t.id);
                setOpen(false);
              }}
            >
              <span className="theme-switcher-option-icon">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
