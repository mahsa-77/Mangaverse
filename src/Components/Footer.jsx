import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      className="
        relative
        mt-20
        overflow-hidden
        border-t
        border-(--footer-border)
      "
      style={{
        background: "var(--footer-bg)",
      }}
    >
      <div
        className="
          relative
          max-w-7xl
          mx-auto
          px-6
          md:px-10
          py-12
        "
      >
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-10
            items-start
          "
        >
          {/* Brand */}

          <div>
            <h2
              className="
                text-2xl
                font-bold
                bg-gradient-to-r
                from-(--gradient-start)
                via-(--gradient-middle)
                to-(--gradient-end)
                bg-clip-text
                text-transparent
              "
            >
              MangaVerse
            </h2>

            <p
              className="
                mt-4
                text-(--text-muted)
                text-sm
                leading-7
              "
            >
              Discover manga stories,
              <br />
              explore new worlds and <br />
              keep track of your reading journey.
            </p>
          </div>

          {/* AI */}

          <div
            className="
              md:text-center
            "
          >
            <h3
              className="
                font-bold
                text-(--heading)
                mb-4
              "
            >
              MangaVerse AI
            </h3>

            <p
              className="
                text-sm
                text-(--text-muted)
                leading-7
              "
            >
              Let AI help you discover manga based on your mood and reading
              taste.
            </p>

            <Link
              to="/ai"

              className="
                inline-flex
                items-center
                justify-center
                mt-5
                px-5
                py-2
                rounded-full
                font-semibold
                shadow-[0_8px_20px_rgba(0,0,0,.12)]
                hover:scale-110
                transition
              "
              style={{
                background: "var(--ai-button)",
                color: "var(--ai-text)",
              }}
            >
              Try AI Picks ✨
            </Link>
          </div>

          {/* Explore */}

          <div
            className="
              md:text-right
            "
          >
            <h3
              className="
                font-bold
                text-(--heading)
                mb-4
              "
            >
              Explore
            </h3>

            <ul
              className="
                space-y-3
                text-(--text-muted)
                text-sm
              "
            >
              <li>
                <Link
                  to="/"

                  className="
                    hover:text-(--primary)
                    transition
                  "
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/"

                  className="
                    hover:text-(--primary)
                    transition
                  "
                >
                  Trending
                </Link>
              </li>

              <li>
                <Link
                  to="/search"

                  className="
                    hover:text-(--primary)
                    transition
                  "
                >
                  Search
                </Link>
              </li>

              <li>
                <Link
                  to="/library"

                  className="
                    hover:text-(--primary)
                    transition
                  "
                >
                  My Library
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}

        <div
          className="
            mt-10
            pt-6
            border-t
            border-(--footer-border)
            flex
            flex-col
            md:flex-row
            justify-between
            items-center
            gap-4
            text-sm
            text-(--text-muted)
          "
        >
          <p>© 2026 MangaVerse. All rights reserved.</p>

          <div
            className="
              flex
              gap-5

              text-xl
            "
          >
            <a
              href="#"

              className="
                hover:scale-110
                transition
              "
            >
              🌐
            </a>

            <a
              href="#"

              className="
                hover:scale-110
                transition
              "
            >
              📷
            </a>

            <a
              href="#"

              className="
                hover:scale-110
                transition
              "
            >
              🐦
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
