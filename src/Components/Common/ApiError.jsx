import { CloudOff, RefreshCcw, House } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ApiError({
  title = "Oops...",
  message = "The manga universe is taking a short break.",
  description = "Jikan API is temporarily unavailable. Please try again in a few moments."
}) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center py-16 px-6">

      <div
        className="
          w-full
          max-w-xl

          rounded-3xl

          border
          border-pink-200

          bg-white/40
          backdrop-blur-xl

          shadow-xl
          shadow-pink-200/30

          p-10

          text-center
        "
      >

        <div className="flex justify-center mb-6">

          <div
            className="
              w-20
              h-20

              rounded-full

              bg-pink-100

              flex
              items-center
              justify-center
            "
          >
            <CloudOff
              size={40}
              className="text-pink-500"
            />
          </div>

        </div>

        <h2 className="text-3xl font-bold text-purple-700">
          {title}
        </h2>

        <p className="mt-4 text-lg text-gray-700">
          {message}
        </p>

        <p className="mt-2 text-sm text-gray-500 leading-6">
          {description}
        </p>

        <div className="flex justify-center gap-4 mt-8">

          <button
            onClick={() => window.location.reload()}
            className="
              flex
              items-center
              gap-2

              px-5
              py-3

              rounded-2xl

              bg-white/60
              backdrop-blur-md

              border
              border-pink-200

              hover:bg-white
              hover:-translate-y-1

              transition-all
              duration-300

              shadow-md
            "
          >
            <RefreshCcw size={18} />
            Try Again
          </button>

          <button
            onClick={() => navigate("/")}
            className="
              flex
              items-center
              gap-2

              px-5
              py-3

              rounded-2xl

              bg-linear-to-r
              from-pink-400
              to-fuchsia-500

              text-white

              hover:scale-105

              transition-all
              duration-300

              shadow-lg
            "
          >
            <House size={18} />
            Back Home
          </button>

        </div>

      </div>

    </div>
  );
}