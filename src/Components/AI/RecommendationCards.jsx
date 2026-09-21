import { Star, BookPlus, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function RecommendationCards({ mangas }) {
  const [addedBooks, setAddedBooks] = useState([]);

  const loadLibrary = () => {
    const library =
      JSON.parse(localStorage.getItem("library")) || [];

    const ids = library.map((item) => item.id);

    setAddedBooks(ids);
  };

  useEffect(() => {
    loadLibrary();

    window.addEventListener(
      "library-updated",
      loadLibrary
    );

    return () => {
      window.removeEventListener(
        "library-updated",
        loadLibrary
      );
    };
  }, []);

  const toggleLibrary = (manga) => {
    if (!manga.id) {
      return;
    }

    const bookId = manga.id;

    const library =
      JSON.parse(localStorage.getItem("library")) || [];

    const exists = library.some(
      (item) => item.id === bookId
    );

    let updatedLibrary;

    if (exists) {
      updatedLibrary = library.filter(
        (item) => item.id !== bookId
      );
    } else {
      const newManga = {
        id: bookId,

        title: manga.title,

        image:
          manga.image,

        rating: 0,

        notes: [],

        progress: 0,
      };

      updatedLibrary = [
        ...library,
        newManga,
      ];
    }

    localStorage.setItem(
      "library",
      JSON.stringify(updatedLibrary)
    );

    window.dispatchEvent(
      new Event("library-updated")
    );
  };

  if (!mangas?.length) {
    return null;
  }

  return (
    <section className="mt-10">

      {/* ================= TITLE ================= */}

      <h2
        className="
          text-2xl
          sm:text-3xl

          font-bold

          text-(--heading)

          mb-8
        "
      >
        ✨ AI Recommendations
      </h2>


      {/* ================= CARDS ================= */}

      <div
        className="
          grid

          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3

          gap-6
        "
      >

        {mangas.map((manga) => {

          const isAdded =
            addedBooks.includes(
              manga.id
            );

          return (

            <div
              key={
                manga.id ||
                manga.title
              }

              className="
                bg-(--card)

                border
                border-(--border)

                rounded-3xl

                shadow-[0_6px_20px_var(--shadow)]

                overflow-hidden

                hover:-translate-y-1
                hover:scale-[1.02]

                transition-all
                duration-300
              "
            >

              {/* ================= IMAGE ================= */}

              <img
                src={
                  manga.image
                }

                alt={manga.title}

                className="
                  w-full

                  h-44
                  sm:h-48

                  object-cover
                "
              />


              <div className="p-4">


                {/* ================= TITLE ================= */}

                <h3
                  className="
                    text-lg
                    sm:text-xl

                    font-bold

                    text-(--heading)

                    line-clamp-2
                  "
                >
                  {manga.title}
                </h3>


                {/* ================= RATING ================= */}

                <div
                  className="
                    flex
                    items-center
                    gap-2

                    mt-3

                    text-(--text)
                  "
                >

                  <Star
                    size={18}

                    className="
                      text-(--primary)

                      fill-(--primary)
                    "
                  />

                  <span
                    className="
                      font-semibold
                    "
                  >
                    {manga.score || "N/A"}
                  </span>

                </div>


                {/* ================= AI REASON ================= */}

                {manga.reason && (

                  <div
                    className="
                      mt-5

                      bg-(--surface-hover)

                      border
                      border-(--border)

                      rounded-xl

                      p-4
                    "
                  >

                    <p
                      className="
                        text-sm

                        text-(--text)

                        leading-6
                      "
                    >
                      ✨ {manga.reason}
                    </p>

                  </div>

                )}


                {/* ================= BUTTONS ================= */}

                <div
                  className="
                    mt-6

                    flex
                    flex-col

                    gap-3
                  "
                >

                  {/* ADD TO LIBRARY */}

                  <button
                    onClick={() =>
                      toggleLibrary(manga)
                    }

                    className="
                      w-full

                      flex
                      justify-center
                      items-center

                      gap-2

                      py-3

                      rounded-full

                      font-semibold

                      border

                      transition-all

                      hover:scale-[1.03]

                      active:scale-95
                    "

                    style={
                      isAdded
                        ? {
                            background:
                              "var(--sage)",

                            color:
                              "var(--button-text)",

                            borderColor:
                              "var(--sage)",
                          }
                        : {
                            background:
                              "var(--button-bg)",

                            color:
                              "var(--button-text)",

                            borderColor:
                              "transparent",
                          }
                    }
                  >

                    <BookPlus size={18} />

                    {isAdded
                      ? "Added ✓"
                      : "Add to Library"}

                  </button>


                  {/* DETAILS */}

                  <Link
                    to={
                      manga.id
                        ? `/manga/${manga.id}`
                        : "#"
                    }

                    onClick={(e) => {

                      if (!manga.id) {
                        e.preventDefault();
                      }

                    }}
                  >

                    <button
                      className="
                        w-full

                        flex
                        justify-center
                        items-center

                        gap-2

                        py-3

                        rounded-full

                        font-semibold

                        border

                        transition-all

                        hover:scale-[1.03]

                        active:scale-95
                      "

                      style={{
                        background:
                          "var(--surface)",

                        color:
                          "var(--heading)",

                        borderColor:
                          "var(--primary)",
                      }}
                    >

                      <Eye size={18} />

                      Details

                    </button>

                  </Link>

                </div>

              </div>

            </div>

          );

        })}

      </div>

    </section>
  );
}