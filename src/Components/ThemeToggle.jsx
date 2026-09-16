import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}

      className="
        px-4
        py-2
        rounded-full
        font-semibold
        border
        backdrop-blur-xl
        transition-all
        duration-300
        hover:scale-105
        
      "

      style={{
        background: "rgba(255,255,255,0.35)",
        borderColor: "var(--border)",
        color: "var(--primary)",
        boxShadow: "0 3px 10px var(--shadow)",
      }}
    >
      {theme === "shoujo" ? "🌸 Shoujo" : "⚔️ Shounen"}
    </button>
  );
}
