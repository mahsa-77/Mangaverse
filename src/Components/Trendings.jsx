import {
  Link,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import Ticon from "../assets/magic.png";
import ApiError from "./Common/ApiError";
import { getTrendingManga } from "../Context/apiOfProgram";

/* ================= LOADER ================= */

export async function trendingLoader({ request }) {
  const url = new URL(request.url);

  const filter = url.searchParams.get("filter") || "completed";

  const page = url.searchParams.get("page") || "1";

  try {
    const { manga, totalPages } = await getTrendingManga(filter, page);

    return {
      manga,

      page: Number(page),

      totalPages,

      filter,

      error: false,
    };
  } catch (error) {
    console.log("Jikan API Error:", error);

    return {
      manga: [],

      page: Number(page),

      totalPages: 1,

      filter,

      error: true,
    };
  }
}

/* ================= COMPONENT ================= */

export default function Trendings() {
  const navigate = useNavigate();

  const { manga, page, totalPages, filter, error } = useLoaderData();

  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const changePage = (newPage) => {
    navigate(`/?filter=${filter}&page=${newPage}`);
  };

  return (
    <section
      className="
        m-4
        sm:m-6
        md:m-8
        p-4
        sm:p-6
        bg-(--surface)
        border
        border-(--border)
        rounded-3xl
        shadow-[0_4px_18px_var(--shadow)]
      "
    >
      {/* Header */}

      <div
        className="
          flex
          items-center
          gap-3
          mb-6
        "
      >
        <img
          src={Ticon}
          alt="icon"
          className="
            w-8
            h-8
          "
        />

        <h3
          className="
            text-xl
            sm:text-2xl
            text-(--heading)
            font-bold
          "
        >
          Trending Now
        </h3>
      </div>

      {/* Error */}

      {error && (
        <ApiError
          title="Manga service unavailable"
          message="Unable to load trending manga."
          description="
            Jikan API is temporarily unavailable.
            Please try again later.
          "
        />
      )}

      {/* Empty */}

      {!error && manga.length === 0 && (
        <ApiError
          title="No manga found"
          message="There are no manga to display."
          description="
            Try changing the filter or page.
          "
        />
      )}

      {isLoading && (
        <div className="text-center py-10 text-(--heading) font-semibold">
          Loading...
        </div>
      )}

      {!isLoading && !error && manga.length > 0 && (
        <>
          {/* Grid */}

          <div
            className="
              grid
              grid-cols-2
              sm:grid-cols-3
              lg:grid-cols-5
              gap-4
              sm:gap-5
            "
          >
            {manga.map((item) => {
              const author =
                item.authors?.length > 0 ? item.authors[0].name : "Unknown";

              const readers = item.members || item.favorites || 0;

              return (
                <Link to={`/manga/${item.id}`} key={item.id}>
                  <div
                    className="
                      bg-(--card)
                      p-3
                      rounded-2xl
                      border
                      border-(--border)
                      shadow-[0_3px_12px_var(--shadow)]
                      hover:shadow-[0_6px_18px_var(--shadow)]
                      hover:-translate-y-1
                      transition-all
                      duration-300
                      cursor-pointer
                      h-full
                    "
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="
                        rounded-lg
                        w-full
                        h-44
                        sm:h-48
                        object-cover
                      "
                    />

                    <h4
                      className="
                        mt-3
                        text-sm
                        font-bold
                        text-(--heading)
                        line-clamp-2
                      "
                    >
                      {item.title}
                    </h4>

                    <p
                      className="
                        text-xs
                        text-(--heading)
                        mt-2
                      "
                    >
                      ✍️ {author}
                    </p>

                    <div
                      className="
                        flex
                        items-center
                        text-(--primary)
                        text-sm
                        mt-2
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

                    <p
                      className="
                        text-xs
                        text-(--heading)
                        mt-2
                      "
                    >
                      👁️ Readers: {readers.toLocaleString()}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Pagination */}

          <div
            className="
              flex
              flex-wrap
              justify-center
              items-center
              gap-3
              mt-8
            "
          >
            <button
              onClick={() => changePage(page - 1)}
              disabled={page <= 1}
              className="
                px-4
                py-2
                bg-(--primary)
                text-white
                rounded-lg
                disabled:opacity-50
                hover:scale-105
                transition
              "
            >
              Previous
            </button>

            <div
              className="
                px-4
                py-2
                bg-(--surface)
                border
                border-(--border)
                rounded-lg
                text-(--heading)
                font-bold
                shadow
              "
            >
              Page {page} of {totalPages}
            </div>

            <button
              onClick={() => changePage(page + 1)}
              disabled={page >= totalPages}
              className="
                px-4
                py-2
                bg-(--secondary)
                text-white
                rounded-lg
                disabled:opacity-50
                hover:scale-105
                transition
              "
            >
              Next
            </button>
          </div>
        </>
      )}
    </section>
  );
}
