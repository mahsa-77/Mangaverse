import {
  Smile,
  LibraryBig,
  Sparkles
} from "lucide-react";

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

            bg-white/25

            backdrop-blur-xl

            border
            border-white/40

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
              text-pink-500
              mb-5

              group-hover:rotate-12

              transition
            "
          />

          <h2
            className="
              text-2xl

              font-bold

              text-purple-700
            "
          >
            Describe Your Mood
          </h2>

          <p
            className="
              mt-3

              text-gray-700

              leading-7
            "
          >
            Tell AI how you're feeling
            and get manga recommendations
            based on your mood.
          </p>

        </button>

        {/* Library */}

        <button
          onClick={() => setMode("library")}
          className="
            group

            cursor-pointer

            rounded-3xl

            bg-white/25

            backdrop-blur-xl

            border
            border-white/40

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
              text-violet-500

              mb-5

              group-hover:rotate-6

              transition
            "
          />

          <h2
            className="
              text-2xl

              font-bold

              text-purple-700
            "
          >
            Discover My Library
          </h2>

          <p
            className="
              mt-3

              text-gray-700

              leading-7
            "
          >
            Let AI analyze your
            reading history and
            recommend your next manga.
          </p>

        </button>

        {/* Surprise */}

        <button
          onClick={() => setMode("random")}
          className="
            group

            cursor-pointer

            rounded-3xl

            bg-white/25

            backdrop-blur-xl

            border
            border-white/40

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
              text-fuchsia-500

              mb-5

              group-hover:rotate-12

              transition
            "
          />

          <h2
            className="
              text-2xl

              font-bold

              text-purple-700
            "
          >
            Surprise Me
          </h2>

          <p
            className="
              mt-3

              text-gray-700

              leading-7
            "
          >
            Don't know what to read?
            Let AI surprise you with
            a hidden masterpiece.
          </p>

        </button>

      </div>

    </section>

  );

}