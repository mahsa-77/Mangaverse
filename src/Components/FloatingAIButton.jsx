import { Sparkles } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function FloatingAIButton() {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === "/ai") {
    return null;
  }

  return (
    <button
      onClick={() => navigate("/ai")}
      className="
        fixed
        bottom-8
        left-8
        z-[999]
        group
        flex
        items-center
        h-16
        w-16
        hover:w-52
        rounded-full
        overflow-hidden
        bg-white/30
        backdrop-blur-xl
        border
        border-white/50
        shadow-xl
        transition-all
        duration-500
        cursor-pointer
        active:scale-95
      "
    >
      {/* Icon */}
      <div
        className="
          flex
          items-center
          justify-center
          min-w-16
          h-16
        "
      >
        <Sparkles
          size={28}
          className="
            text-(--ai-title)
            transition-all
            duration-300
            group-hover:rotate-12
            group-hover:scale-110
          "
        />
      </div>

      {/* Text */}
      <div
        className="
          whitespace-nowrap
          opacity-0
          max-w-0
          group-hover:max-w-40
          group-hover:opacity-100
          transition-all
          duration-300
          overflow-hidden
        "
      >
        <p
          className="
            text-sm
            font-extrabold
            tracking-wide
            text-(--ai-title)
            drop-shadow-[0_1px_4px_rgba(0,0,0,.12)]
          "
        >
          AI Picks
        </p>

        <p
          className="
            text-xs
            font-bold
            tracking-wide
            text-(--ai-subtitle)
            mt-0.5
            drop-shadow-[0_1px_3px_rgba(0,0,0,.1)]
          "
        >
          Find your favorite
        </p>
      </div>
    </button>
  );
}
