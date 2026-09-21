import { useLoaderData, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Sparkles } from "lucide-react";
import ApiError from "../Components/Common/ApiError";
import { getMangaById } from "../Context/apiOfProgram";

/* ================= SYNC LIBRARY ================= */

const syncLibrary = (data) => {
  localStorage.setItem("library", JSON.stringify(data));
  window.dispatchEvent(new Event("library-updated"));
};

/* ================= LOADER ================= */

export async function mangaLoader({ params }) {
  try {
    const manga = await getMangaById(params.id);

    return {
      manga,
      error: false,
    };
  } catch (error) {
    console.error(error);

    return {
      manga: null,
      error: true,
    };
  }
}

/* ================= COMPONENT ================= */

export default function MangaDetail() {
  const { manga, error } = useLoaderData();

  const navigate = useNavigate();

  const id = manga?.id;

  /* ================= STATES ================= */

  const [rating, setRating] = useState(0);

  const [note, setNote] = useState("");

  const [noteSaved, setNoteSaved] = useState(false);

  const [saved, setSaved] = useState(false);

  const [completed, setCompleted] = useState(false);

  const [translatedSynopsis, setTranslatedSynopsis] = useState("");

  const [translating, setTranslating] = useState(false);

  const [showTranslation, setShowTranslation] = useState(false);

  /* ================= LOAD LIBRARY ================= */

  useEffect(() => {
    if (!id) return;

    const library = JSON.parse(localStorage.getItem("library")) || [];

    const item = library.find((item) => item.id === id);

    if (item) {
      setSaved(true);
      setRating(item.rating || 0);
      setNote(item.note || "");
      setCompleted(item.completed || false);
    }
  }, [id]);

  /* ================= ERROR ================= */

  if (error) {
    return <ApiError />;
  }

  if (!manga) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  /* ================= SAVE ================= */

  const saveToLibrary = () => {
    const library = JSON.parse(localStorage.getItem("library")) || [];

    const exists = library.find((item) => item.id === id);

    if (exists) {
      const updated = library.filter((item) => item.id !== id);

      syncLibrary(updated);

      setSaved(false);

      return;
    }

    library.push({
      id,
      title: manga.title,
      image: manga.thumbnail,
      rating,
      note,
      notes: [],
      progress: 0,
      completed: false,
    });

    syncLibrary(library);

    setSaved(true);
  };

  /* ================= COMPLETE ================= */

  const toggleCompleted = () => {
    const library = JSON.parse(localStorage.getItem("library")) || [];

    const item = library.find((item) => item.id === id);

    if (item) {
      item.completed = !item.completed;

      item.progress = item.completed ? 100 : 0;

      syncLibrary(library);

      setCompleted(item.completed);
    }
  };

  /* ================= RATING ================= */

  const handleRating = (star) => {
    setRating(star);

    const library = JSON.parse(localStorage.getItem("library")) || [];

    const item = library.find((item) => item.id === id);

    if (item) {
      item.rating = star;

      syncLibrary(library);
    }
  }; /* ================= NOTES ================= */

  const saveNote = () => {
    const library = JSON.parse(localStorage.getItem("library")) || [];

    const item = library.find((item) => item.id === id);

    if (item) {
      if (!item.notes) {
        item.notes = [];
      }

      if (note.trim()) {
        item.notes.push({
          text: note,
          createdAt: Date.now(),
        });
      }

      syncLibrary(library);

      setNote("");

      setNoteSaved(true);
    }
  };

  /* ================= TRANSLATE ================= */

  const translateSynopsis = async () => {
    if (translatedSynopsis) {
      setShowTranslation(!showTranslation);

      return;
    }

    try {
      setTranslating(true);

      const res = await axios.post("http://localhost:3001/api/translate", {
        text: manga.synopsis,
      });

      setTranslatedSynopsis(res.data.translated);

      setShowTranslation(true);
    } catch (error) {
      console.error(error);

      alert("Translation failed.");
    } finally {
      setTranslating(false);
    }
  };

  /* ================= UI ================= */

  return (
    <section
      className="
        min-h-screen
        bg-(--bg)
        text-(--text)
        max-w-6xl
        mx-auto
        p-4
        sm:p-6
      "
    >
      {/* BACK */}

      <button
        onClick={() => navigate(-1)}
        className="
          mb-6
          font-semibold
          text-(--primary)
          hover:text-(--primary-hover)
        "
      >
        ← Back
      </button>

      {/* MAIN CARD */}

      <div
        className="
          rounded-3xl
          border
          border-(--border)
          bg-(--card)
          shadow-2xl
          p-4
          sm:p-6
        "
      >
        <div
          className="
            flex
            flex-col
            md:flex-row
            gap-8
          "
        >
          {/* IMAGE + BUTTONS */}

          <div
            className="
              flex
              flex-col
              items-center
              w-full
              md:w-auto
            "
          >
            <img
              src={manga.image}
              alt={manga.title}
              className="
                w-48
                sm:w-64
                h-72
                sm:h-96
                object-cover
                rounded-2xl
                shadow-lg
              "
            />

            <div
              className="
                flex
                flex-wrap
                justify-center
                gap-3
                mt-4
              "
            >
              <button
                onClick={saveToLibrary}
                className="
                  px-4
                  py-2
                  rounded-xl
                  bg-(--accent)
                  text-(--text)
                  border
                  border-(--border)
                  hover:scale-105
                "
              >
                {saved ? "Remove" : "Save Library"}
              </button>

              <button
                className="
                  px-5
                  py-2
                  rounded-xl
                  bg-(--sage)
                  text-white
                  font-bold
                  hover:scale-105
                "
              >
                Start Reading
              </button>

              <button
                onClick={toggleCompleted}
                className="
                  px-4
                  py-2
                  rounded-xl
                  text-white
                  hover:scale-105
                "
                style={{
                  background: completed
                    ? "var(--primary-hover)"
                    : "var(--primary)",
                }}
              >
                {completed ? "Completed ✓" : "Complete"}
              </button>
            </div>
          </div>

          {/* INFORMATION */}

          <div className="flex-1">
            <h1
              className="
                text-3xl
                sm:text-4xl
                font-bold
                bg-gradient-to-r
                from-(--gradient-start)
                via-(--gradient-middle)
                to-(--gradient-end)
                bg-clip-text
                text-transparent
              "
            >
              {manga.title}
            </h1>

            <div
              className="
                flex
                flex-wrap
                gap-2
                mt-4
              "
            >
              {manga.genres?.map((genre) => (
                <span
                  key={genre.mal_id}
                  className="
                    px-3
                    py-1
                    rounded-full
                    bg-(--accent)
                    border
                    border-(--border)
                    text-sm
                  "
                >
                  {genre.name}
                </span>
              ))}
            </div>{" "}
            {/* INFO BOXES */}
            <div
              className="
                flex
                flex-col
                md:flex-row
                gap-4
                mt-6
              "
            >
              <div
                className="
                  bg-(--surface)
                  p-3
                  rounded-xl
                  border
                  border-(--border)
                  flex-1
                "
              >
                <div className="text-(--primary) font-semibold">Status</div>

                <div>{manga.status}</div>
              </div>

              <div
                className="
                  bg-(--surface)
                  p-3
                  rounded-xl
                  border
                  border-(--border)
                  flex-1
                "
              >
                <div className="text-(--primary) font-semibold">Score</div>

                <div className="text-(--primary)">⭐ {manga.score}</div>
              </div>

              <div
                className="
                  bg-(--surface)
                  p-3
                  rounded-xl
                  border
                  border-(--border)
                  flex-1
                "
              >
                <div className="text-(--primary) font-semibold">Authors</div>

                <div>
                  {manga.authors?.map((author) => author.name).join(", ")}
                </div>
              </div>
            </div>
            {/* SYNOPSIS */}
            <div
              className="
                mt-6
                p-5
                bg-(--surface)
                rounded-2xl
                border
                border-(--border)
              "
            >
              {showTranslation && (
                <div className="mb-4">
                  <span
                    className="
                      inline-flex
                      items-center
                      gap-2
                      px-3
                      py-1
                      rounded-full
                      bg-(--accent)
                      text-(--heading)
                      text-xs
                      font-semibold
                    "
                  >
                    <Sparkles size={14} />
                    AI Translation
                  </span>
                </div>
              )}

              <p
                className="
                  leading-7
                  whitespace-pre-line
                "
              >
                {showTranslation
                  ? translatedSynopsis
                  : manga.synopsis || "No synopsis available."}
              </p>

              <div className="flex justify-center mt-6">
                <button
                  onClick={translateSynopsis}
                  disabled={translating}
                  className="
                    px-5
                    py-2.5
                    rounded-full
                    bg-(--accent)
                    border
                    border-(--border)
                    hover:scale-105
                  "
                >
                  {translating
                    ? "Translating..."
                    : showTranslation
                      ? "Back to English"
                      : "Translate to Persian"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RATING */}

      <div className="mt-10 text-center">
        <h2
          className="
            text-2xl
            font-bold
            text-(--heading)
            mb-2
          "
        >
          Your Rating
        </h2>

        <div className="text-3xl">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => handleRating(star)}
              className="
                cursor-pointer
                hover:scale-125
              "
              style={{
                color: rating >= star ? "var(--primary)" : "var(--text-muted)",
              }}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      {/* NOTES */}

      <div className="mt-10">
        <textarea
          value={note}
          onChange={(e) => {
            setNote(e.target.value);
            setNoteSaved(false);
          }}
          placeholder="Write your note..."
          className="
            w-full
            h-40
            p-4
            rounded-xl
            border
            border-(--border)
            bg-(--surface)
            text-(--text)
          "
        />

        <button
          onClick={saveNote}
          className="
            mt-3
            px-4
            py-2
            rounded-lg
            bg-(--accent)
            border
            border-(--border)
            hover:scale-105
          "
        >
          {noteSaved ? "Saved ✓" : "Save Note"}
        </button>
      </div>

      {/* CHAPTERS */}

      <div className="mt-10">
        <h2
          className="
            text-2xl
            font-bold
            text-(--heading)
            mb-4
          "
        >
          Chapters
        </h2>

        <div
          className="
            p-6
            bg-(--surface)
            border
            border-(--border)
            rounded-2xl
            text-center
            text-(--heading)
          "
        >
          Coming Soon...
        </div>
      </div>
    </section>
  );
}
