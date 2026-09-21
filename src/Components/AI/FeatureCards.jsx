import { Smile, LibraryBig, Sparkles } from "lucide-react";

export default function FeatureCards({ setMode }) {
  return (
    <section className="mt-14 px-6">
      <div
        className="
          max-w-6xl
          mx-auto
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          gap-6
          sm:gap-8
        "
      >
        {/* Mood */}

        <button
          onClick={() => setMode("mood")}
          className="
            group
            cursor-pointer
            rounded-3xl
            bg-(--surface)
            opacity-90
            backdrop-blur-xl
            border
            border-(--border)
            shadow-xl
            p-8
            text-left
            hover:scale-105
            hover:-translate-y-1
            transition-all
            duration-300
          "
        >
          <Smile
            size={42}
            className="
              text-(--primary)
              mb-5
              group-hover:rotate-12
              transition
            "
          />

          <h2
            className="
              text-2xl
              font-bold
              text-(--heading)
            "
          >
            Describe Your Mood
          </h2>

          <p
            className="
              mt-3
              text-(--text)
              leading-7
            "
          >
            Tell AI how you're feeling and get manga recommendations based on
            your mood.
          </p>
        </button>

        {/* Library */}

        <button
          onClick={() => setMode("library")}
          className="
            group
            cursor-pointer
            rounded-3xl
            bg-(--surface)
            opacity-90
            backdrop-blur-xl
            border
            border-(--border)
            shadow-xl
            p-8
            text-left
            hover:scale-105
            hover:-translate-y-1
            transition-all
            duration-300
          "
        >
          <LibraryBig
            size={42}
            className="
              text-(--heading)
              mb-5
              group-hover:rotate-6
              transition
            "
          />

          <h2
            className="
              text-2xl
              font-bold
              text-(--heading)
            "
          >
            Discover My Library
          </h2>

          <p
            className="
              mt-3
              text-(--text)
              leading-7
            "
          >
            Let AI analyze your reading history and recommend your next manga.
          </p>
        </button>

        {/* Surprise */}

        <button
          onClick={() => setMode("random")}
          className="
            group
            cursor-pointer
            rounded-3xl
            bg-(--surface)
            opacity-90
            backdrop-blur-xl
            border
            border-(--border)
            shadow-xl
            p-8
            text-left
            hover:scale-105
            hover:-translate-y-1
            transition-all
            duration-300
          "
        >
          <Sparkles
            size={42}
            className="
              text-(--accent)
              mb-5
              group-hover:rotate-12
              transition
            "
          />

          <h2
            className="
              text-2xl
              font-bold
              text-(--heading)
            "
          >
            Surprise Me
          </h2>

          <p
            className="
              mt-3
              text-(--text)
              leading-7
            "
          >
            Don't know what to read? Let AI surprise you with a hidden
            masterpiece.
          </p>
        </button>
      </div>
    </section>
  );
}