import { useLoaderData, Link } from "react-router-dom";
import { useEffect, useState } from "react";

/* ================= LOADER ================= */

export async function libraryLoader() {
  return JSON.parse(localStorage.getItem("library")) || [];
}

/* ================= COMPONENT ================= */

export default function Library() {
  const initial = useLoaderData();

  const [library, setLibrary] = useState(initial);

  /* ================= SYNC LISTENER ================= */

  useEffect(() => {
    const update = () => {
      const data = JSON.parse(localStorage.getItem("library")) || [];

      setLibrary(data);
    };

    window.addEventListener("library-updated", update);

    window.addEventListener("storage", update);

    return () => {
      window.removeEventListener("library-updated", update);

      window.removeEventListener("storage", update);
    };
  }, []);

  /* ================= DELETE NOTE ================= */

  const deleteNote = (mangaId, index) => {
    const updated = library.map((item) => {
      if (item.id === mangaId) {
        const newNotes = [...(item.notes || [])];

        newNotes.splice(index, 1);

        return {
          ...item,
          notes: newNotes,
        };
      }

      return item;
    });

    setLibrary(updated);

    localStorage.setItem("library", JSON.stringify(updated));
  };

  return (
    <section
      className="
        max-w-6xl
        mx-auto
        p-4
        sm:p-6
        md:p-8
      "
    >
      <h1
        className="
          text-3xl
          sm:text-4xl
          font-bold
          text-(--heading)
          mb-8
        "
      >
        My Library
      </h1>

      {/* EMPTY */}

      {library.length === 0 && (
        <div
          className="
              flex
              flex-col
              items-center
              justify-center
              py-16
              bg-(--surface-hover)
              border-(--border)
              rounded-2xl
              border
              text-center
            "
        >
          <div
            className="
                text-5xl
                mb-4
              "
          >
            📚
          </div>

          <p
            className="
                text-lg
                font-semibold
                text-purple-700
              "
          >
            Your library is empty.
          </p>

          <p
            className="
                mt-2

                text-gray-500
              "
          >
            Start adding manga to build your personal collection.
          </p>
        </div>
      )}

      {/* CARDS */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-6
          sm:gap-8
        "
      >
        {library.map((item) => (
          <Link
            to={`/manga/${item.id}`}

            key={item.id}
          >
            <div
              className="
                  bg-(--card)
                  p-4
                  sm:p-5
                  rounded-2xl
                  border
                  border-(--border)
                  shadow-md
                  hover:shadow-xl
                  hover:-translate-y-1
                  transition-all
                  duration-300
                "
            >
              <img
                src={item.image}

                alt={item.title}

                className="
                    rounded-xl
                    w-full
                    h-52
                    sm:h-56
                    object-cover
                  "
              />

              <h2
                className="
                    text-lg
                    sm:text-xl
                    font-bold
                    text-(--heading)
                    mt-4
                    line-clamp-2
                  "
              >
                {item.title}
              </h2>

              <p
                className="
                    text-sm
                    text-yellow-500
                    mt-2
                  "
              >
                ⭐ {item.rating || "No rating"}
              </p>

              {/* NOTES */}

              <div
                className="
                    mt-4
                  "
              >
                <h3
                  className="
                      text-sm
                      font-semibold
                      text-(--heading)
                    "
                >
                  Your Notes:
                </h3>

                <div
                  className="
                      text-(--text-muted)
                      text-sm
                      mt-2
                      space-y-2
                    "
                >
                  {item.notes?.length > 0 ? (
                    item.notes.map((n, i) => (
                      <div
                        key={i}

                        className="
                                flex
                                justify-between
                                items-center
                                gap-2
                              "
                      >
                        <span
                          className="
                                  wrap-break-word
                                  flex-1
                                "
                        >
                          • {n.text}
                        </span>

                        <button
                          onClick={(e) => {
                            e.preventDefault();

                            deleteNote(item.id, i);
                          }}

                          className="
                                  text-red-400

                                  text-xs

                                  hover:text-red-600

                                  transition

                                  shrink-0
                                "
                        >
                          delete
                        </button>
                      </div>
                    ))
                  ) : (
                    <p>No text yet</p>
                  )}
                </div>
              </div>

              {/* PROGRESS */}

              <div
                className="
                    mt-6
                  "
              >
                <h3
                  className="
                      text-sm

                      font-semibold

                      text-(--heading)
                    "
                >
                  Reading Progress:
                </h3>

                <div
                  className="
                      w-full
                      bg-(--progress-bg)
                      h-3
                      rounded-full
                      mt-2
                      overflow-hidden
                    "
                >
                  <div
                    className="
                        bg-(--sage)
                        h-3
                        rounded-full
                        transition-all
                      "

                    style={{
                      width: `${item.progress || 0}%`,
                    }}
                  />
                </div>

                <p
                  className="
                      text-xs
                      text-(--text-muted)
                      mt-2
                    "
                >
                  {item.progress || 0}% read
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
