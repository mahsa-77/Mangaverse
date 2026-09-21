import { Link, useLoaderData, useSearchParams } from "react-router-dom";
import { Star } from "lucide-react";
import ApiError from "./Common/ApiError.jsx";
import { searchManga } from "../Context/apiOfProgram.js";

/* ---------------- LOADER ---------------- */

export async function searchLoader({ request }) {
  const url = new URL(request.url);

  const query = url.searchParams.get("q");

  if (!query) {
    return {
      results: [],
      query: "",
      error: false,
    };
  }

  try {
    const results = await searchManga(query);

    return {
      results,

      query,

      error: false,
    };
  } catch (err) {
    console.log(err);

    return {
      results: [],

      query,

      error: true,
    };
  }
}

/* ---------------- PAGE ---------------- */

export default function Search() {
  const { results, query, error } = useLoaderData();

  const [searchParams] = useSearchParams();

  return (
    <section
      className="
        m-4
        sm:m-6
        md:m-8
        p-4
        sm:p-6
        bg-(--surface-hover)
        border
        border-(--border)
        rounded-3xl
        shadow-[0_4px_18px_var(--shadow)]
      "
    >
      {/* Header */}

      <div
        className="
          mb-5
        "
      >
        <h2
          className="
            text-2xl
            font-bold
            text-(--heading)
          "
        >
          Search Results
        </h2>

        <p
          className="
            text-sm
            text-(--text-muted)
            mt-1
          "
        >
          Results for:{" "}
          <span
            className="
              font-semibold
              text-(--primary)
            "
          >
            {query || searchParams.get("q")}
          </span>
        </p>
      </div>

      {/* API ERROR */}

      {error && (
        <ApiError
          title="Manga service unavailable"

          message="Unable to load search results."

          description="
              Jikan API is currently unavailable.
              Please try again later.
            "
        />
      )}

      {/* RESULTS */}

      {!error && results.length === 0 ? (
        <ApiError
          title="No manga found"

          message="We couldn't find any manga."

          description="
              Try searching with another title.
            "
        />
      ) : (
        !error && (
          <div
            className="
                grid

                grid-cols-2

                sm:grid-cols-2

                md:grid-cols-3

                lg:grid-cols-4

                xl:grid-cols-5

                gap-5
              "
          >
            {results.map((item) => {
              const author =
                item.authors?.length > 0 ? item.authors[0].name : "Unknown";

              return (
                <Link
                  to={`/manga/${item.id}`}

                  key={item.id}
                >
                  <div
                    className="
                          bg-(--card)

                          p-3

                          rounded-lg

                          shadow

                          hover:shadow-xl

                          hover:-translate-y-1

                          transition-all

                          duration-300

                          cursor-pointer
                        "
                  >
                    <img
                      src={item.image}

                      alt={item.title}

                      className="
                            rounded-md

                            w-full

                            h-48

                            object-cover
                          "
                    />

                    <h4
                      className="
                            mt-2

                            text-sm

                            font-bold

                            text-(--heading)
                          "
                    >
                      {item.title}
                    </h4>

                    <p
                      className="
                            text-xs

                            text-(--text-muted)

                            mt-1
                          "
                    >
                      ✍️ {author}
                    </p>

                    <div
                      className="
                            flex

                            items-center

                            text-yellow-500

                            text-sm

                            mt-1
                          "
                    >
                      ⭐
                      <span
                        className="
                              ml-1

                              text-(--text)
                            "
                      >
                        {item.score || "N/A"}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )
      )}
    </section>
  );
}
