import {
  Sparkles,
  LibraryBig,
  Smile,
  LoaderCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import RecommendationCards from "./RecommendationCards";
import {
  findMangaByTitles,
  getLibraryRecommendations,
  getMoodRecommendations,
  getRandomManga,
} from "../../services/ai.js"

export default function ResultSection({ mode }) {
  const [prompt, setPrompt] = useState("");

  const [loading, setLoading] = useState(false);

  const [results, setResults] = useState([]);

  const [message, setMessage] = useState("");

  useEffect(() => {
    setResults([]);

    setMessage("");

    setPrompt("");
  }, [mode]);


  /* ================= START REQUEST ================= */

  const startRequest = () => {
    setLoading(true);

    setResults([]);

    setMessage("");
  };


  /* ================= MOOD ================= */

  const handleMoodRecommendation = async () => {
    if (!prompt.trim()) {
      setMessage("Please describe your mood first.");

      return;
    }

    startRequest();

    try {
      const titles =
        await getMoodRecommendations(prompt);

      const manga =
        await findMangaByTitles(titles);

      setResults(manga);

      if (manga.length === 0) {
        setMessage("No manga was found.");
      }

    } catch (error) {
      console.error(
        "Mood recommendation error:",
        error
      );

      setMessage(
        "AI recommendation failed. Please check the server."
      );

    } finally {
      setLoading(false);
    }
  };


  /* ================= LIBRARY ================= */

  const handleLibraryRecommendation = async () => {
    const library =
      JSON.parse(
        localStorage.getItem("library")
      ) || [];

    if (library.length === 0) {
      setResults([]);

      setMessage(
        "Your library is empty, so there is no recommendation yet."
      );

      return;
    }

    startRequest();

    try {
      const titles =
        await getLibraryRecommendations(
          library
        );

      const manga =
        await findMangaByTitles(titles);

      const savedIds = library
        .map((item) => {
          return Number(
            item.id
          );
        })
        .filter((id) => {
          return !Number.isNaN(id);
        });

      const savedTitles = library
        .map((item) => {
          return item.title
            ?.trim()
            .toLowerCase();
        })
        .filter(Boolean);

      const newManga = manga.filter(
        (item) => {
          const itemTitle =
            item.title
              ?.trim()
              .toLowerCase();

          const alreadySavedById =
            item.id &&
            savedIds.includes(
              Number(item.id)
            );

          const alreadySavedByTitle =
            savedTitles.includes(
              itemTitle
            );

          return (
            !alreadySavedById &&
            !alreadySavedByTitle
          );
        }
      );

      setResults(newManga);

      if (newManga.length === 0) {
        setMessage(
          "No new manga recommendation was found."
        );
      }

    } catch (error) {
      console.error(
        "Library recommendation error:",
        error
      );

      setMessage(
        "AI recommendation failed. Please check the server."
      );

    } finally {
      setLoading(false);
    }
  };


  /* ================= RANDOM ================= */

  const handleRandomRecommendation =
    async () => {
      const library =
        JSON.parse(
          localStorage.getItem("library")
        ) || [];

      startRequest();

      try {
        const manga =
          await getRandomManga(library);

        if (manga) {
          setResults([manga]);

        } else {
          setMessage(
            "A manga recommendation could not be found. Please try again."
          );
        }

      } catch (error) {
        console.error(
          "Random recommendation error:",
          error
        );

        setMessage(
          "AI recommendation failed. Please check the server."
        );

      } finally {
        setLoading(false);
      }
    };


  if (!mode) {
    return null;
  }


  return (
    <motion.section
      key={mode}

      initial={{
        opacity: 0,
        y: 20,
        scale: 0.98,
      }}

      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}

      transition={{
        duration: 0.45,
        ease: "easeOut",
      }}

      className="
        max-w-5xl
        mx-auto
        mt-10
        px-4
        sm:px-6
      "
    >

      {/* ================= MAIN GLASS BOX ================= */}

      <div
        className="
          rounded-3xl
          bg-(--surface)
          backdrop-blur-xl
          border
          border-(--border)
          shadow-[0_8px_30px_var(--shadow)]
          p-5
          sm:p-8
        "
      >


        {/* ================= MOOD ================= */}

        {mode === "mood" && (
          <>

            <div
              className="
                flex
                items-center
                gap-3
                mb-6
              "
            >

              <Smile
                className="
                  text-(--primary)
                "

                size={30}
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

            </div>


            <p
              className="
                text-(--text)
                mb-5
              "
            >
              Tell AI what kind of manga
              you're looking for.
            </p>


            <textarea
              value={prompt}

              onChange={(event) => {
                setPrompt(
                  event.target.value
                );
              }}

              placeholder="
                Example: I want a dark mystery with romance and an unexpected ending...
              "

              style={{
                paddingTop: "16px",
              }}

              className="
                w-full
                h-36
                rounded-2xl
                border
                border-(--input-border)
                bg-(--input-bg)
                text-(--text)
                placeholder:text-(--text-muted)
                p-4
                resize-none
                outline-none
                focus:ring-2
                focus:ring-(--primary)
                transition-all
              "
            />


            <button
              onClick={
                handleMoodRecommendation
              }

              disabled={loading}

              className="
                mt-6
                px-8
                py-3
                rounded-full
                font-semibold
                shadow-lg
                hover:scale-105
                transition-all
                duration-300
                disabled:opacity-60
                disabled:cursor-not-allowed
              "

              style={{
                background:
                  "var(--button-bg)",

                color:
                  "var(--button-text)",
              }}
            >
              Find Manga ✨
            </button>

          </>
        )}


        {/* ================= LIBRARY ================= */}

        {mode === "library" && (
          <>

            <div
              className="
                flex
                items-center
                gap-3
                mb-6
              "
            >

              <LibraryBig
                className="
                  text-(--primary)
                "

                size={30}
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

            </div>


            <p
              className="
                text-(--text)
                mb-6
              "
            >
              AI will analyze your saved
              manga and recommend your
              next read.
            </p>


            <button
              onClick={
                handleLibraryRecommendation
              }

              disabled={loading}

              className="
                px-8
                py-3
                rounded-full
                font-semibold
                shadow-lg
                hover:scale-105
                transition-all
                duration-300
                disabled:opacity-60
                disabled:cursor-not-allowed
              "

              style={{
                background:
                  "var(--button-bg)",

                color:
                  "var(--button-text)",
              }}
            >
              Analyze My Library 📚
            </button>

          </>
        )}


        {/* ================= RANDOM ================= */}

        {mode === "random" && (
          <>

            <div
              className="
                flex
                items-center
                gap-3
                mb-6
              "
            >

              <Sparkles
                className="
                  text-(--primary)
                "

                size={30}
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

            </div>


            <p
              className="
                text-(--text)
                mb-6
              "
            >
              Let AI choose a random manga
              you'll probably enjoy.
            </p>


            <button
              onClick={
                handleRandomRecommendation
              }

              disabled={loading}

              className="
                px-8
                py-3
                rounded-full
                font-semibold
                shadow-lg
                hover:scale-105
                transition-all
                duration-300
                disabled:opacity-60
                disabled:cursor-not-allowed
              "

              style={{
                background:
                  "var(--button-bg)",

                color:
                  "var(--button-text)",
              }}
            >
              Surprise Me 🎲
            </button>

          </>
        )}


        {/* ================= LOADING ================= */}

        {loading && (
          <div
            className="
              flex
              items-center
              gap-3
              mt-8
              text-(--primary)
              font-semibold
            "
          >

            <LoaderCircle
              className="
                animate-spin
              "

              size={24}
            />

            <p>
              Finding manga...
            </p>

          </div>
        )}


        {/* ================= MESSAGE ================= */}

        {message && !loading && (
          <p
            className="
              mt-8
              text-(--heading)
              font-semibold
            "
          >
            {message}
          </p>
        )}


        {/* ================= RESULTS ================= */}

        {results.length > 0 &&
          !loading && (
            <>

              {/* JIKAN FALLBACK MESSAGE */}

              {results.some(
                (manga) =>
                  manga.isFallback
              ) && (

                <p
                  className="
                    mt-8
                    mb-4
                    rounded-xl
                    p-4
                    text-sm
                    font-medium
                    border
                  "

                  style={{
                    background:
                      "var(--surface-hover)",

                    borderColor:
                      "var(--border)",

                    color:
                      "var(--text)",
                  }}
                >
                  Jikan is currently unable
                  to connect to MyAnimeList.
                  AI titles are still shown,
                  but some images, ratings
                  and detail links are
                  unavailable.
                </p>

              )}


              <RecommendationCards
                mangas={results}
              />

            </>
          )}

      </div>

    </motion.section>
  );
}