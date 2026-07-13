import { useEffect, useState } from "react";

const THEMES = [
  { id: "violet", label: "Violet Aurora theme", colors: ["#9251f7", "#516cf7"] },
  { id: "lime", label: "Acid Lime theme", colors: ["#cfff74", "#8fd14f"] },
  { id: "ember", label: "Ember theme", colors: ["#fc6c26", "#f7a03c"] },
];

const STORAGE_KEY = "cv-theme";

function getInitialTheme() {
  return document.documentElement.dataset.theme || "violet";
}

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    if (theme === "violet") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* private mode — theme just won't persist */
    }
  }, [theme]);

  return (
    <div className="theme-switcher" role="group" aria-label="Color theme">
      {THEMES.map((t) => (
        <button
          key={t.id}
          type="button"
          className={`theme-dot${theme === t.id ? " is-active" : ""}`}
          style={{
            "--dot-a": t.colors[0],
            "--dot-b": t.colors[1],
          }}
          aria-label={t.label}
          aria-pressed={theme === t.id}
          title={t.label}
          onClick={() => setTheme(t.id)}
        />
      ))}
    </div>
  );
}
