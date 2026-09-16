import logo from "../assets/download.png";
import anime from "../assets/images.png";
import { Link } from "react-router-dom";
import { Compass, BookOpen, UserRound } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <>
      <header
        className="
          sticky
          top-0
          z-50
          min-h-20
          md:h-24
          px-3
          sm:px-5
          md:px-8
          flex
          items-center
          justify-between
          backdrop-blur-xl
          border-b
          transition-all
          duration-300
        "

        style={{
          background: "var(--navbar)",
          borderColor: "var(--border)",
          boxShadow: "0 10px 25px var(--shadow)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
        }}
      >
        {/* Logo */}
        <Link
          to="/"

          className="
            flex
            items-center

            gap-2
            md:gap-3

            group
          "
        >
          <img
            src={logo}
            alt="logo"

            className="
              w-9
              h-9

              sm:w-10
              sm:h-10

              md:w-14
              md:h-14

              transition-all
              duration-300

              group-hover:scale-110
              group-hover:rotate-6
            "
          />

          <h1
            className="
              text-lg
              sm:text-xl
              md:text-3xl

              font-bold
              font-manga
              bg-gradient-to-r

              bg-clip-text
              text-transparent

              transition-all
              duration-300
            "

            style={{
              backgroundImage: `linear-gradient(
                  90deg,
                  var(--gradient-start),
                  var(--gradient-middle),
                  var(--gradient-end)
                )`,
            }}
          >
            MangaVerse
          </h1>
        </Link>
        {/* Banner */}
        <div
          className="
            hidden
            lg:flex

            flex-1

            justify-center

            px-10
          "
        >
          <img
            src={anime}
            alt="banner"

            className="
              w-72
              h-16

              rounded-2xl

              object-cover

              border

              shadow-md

              transition-all
              duration-300
            "

            style={{
              borderColor: "var(--border)",
              boxShadow: "0 8px 20px var(--shadow)",
            }}
          />
        </div>
        <ThemeToggle /> {/* Navigation */}
        <nav
          className="
            flex

            items-center

            gap-1
            sm:gap-2
            md:gap-3
          "
        >
          {/* Discover */}

          <Link
            to="/"

            className="
              flex
              items-center

              gap-1
              md:gap-2

              px-2
              sm:px-3
              md:px-4

              py-2

              rounded-xl

              transition-all
              duration-300
            "

            style={{
              color: "var(--primary)",
            }}

            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "var(--surface-hover)")
            }

            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <Compass size={20} />

            <span
              className="
                hidden
                md:inline

                font-semibold
              "
            >
              Discover
            </span>
          </Link>

          {/* Library */}

          <Link
            to="/library"

            className="
              flex
              items-center

              gap-1
              md:gap-2

              px-2
              sm:px-3
              md:px-4

              py-2

              rounded-xl

              transition-all
              duration-300
            "

            style={{
              color: "var(--primary)",
            }}

            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "var(--surface-hover)")
            }

            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <BookOpen size={20} />

            <span
              className="
                hidden
                md:inline

                font-semibold
              "
            >
              My Library
            </span>
          </Link>

          {/* Login */}

          <Link
            to="/login"

            className="
              ml-1
              md:ml-2

              flex
              items-center

              gap-1
              md:gap-2

              rounded-full

              px-2
              sm:px-3
              md:px-5

              py-2

              text-white

              font-semibold

              shadow-lg

              hover:scale-105

              transition-all
              duration-300
            "

            style={{
              background: "var(--button-bg)",
              boxShadow: "0 10px 25px var(--shadow)",
            }}
          >
            <div
              className="
                rounded-full

                bg-white/20

                p-1.5
              "
            >
              <UserRound size={18} />
            </div>

            <span
              className="
                hidden
                sm:inline
              "
            >
              Sign In
            </span>
          </Link>
        </nav>
      </header>

      {/* Gradient line */}

      <div
        className="
          h-1
        "

        style={{
          background: `linear-gradient(
            90deg,
            var(--gradient-start),
            var(--gradient-middle),
            var(--gradient-end)
          )`,
        }}
      />
    </>
  );
}
