import logo from "../assets/download.png";
import anime from "../assets/images.png";
import { Link } from "react-router-dom";
import { Compass, BookOpen, UserRound } from "lucide-react";


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

          bg-white/80
          backdrop-blur-xl

          border-b
          border-pink-200/60

          shadow-lg
          shadow-pink-200/30
        "
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

              bg-gradient-to-r
              from-pink-500
              via-fuchsia-500
              to-violet-500

              bg-clip-text
              text-transparent
            "
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
              border-white

              shadow-md
            "
          />

        </div>







        {/* Navigation */}

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

              text-pink-700

              hover:bg-pink-100

              transition-all
              duration-300
            "
          >

            <Compass size={20}/>


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

              text-pink-700

              hover:bg-pink-100

              transition-all
              duration-300
            "
          >

            <BookOpen size={20}/>


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

              bg-gradient-to-r
              from-pink-400
              via-fuchsia-400
              to-violet-400

              px-2
              sm:px-3
              md:px-5

              py-2

              text-white

              font-semibold

              shadow-lg
              shadow-pink-300/40

              hover:scale-105

              transition-all
              duration-300
            "
          >


            <div
              className="
                rounded-full

                bg-white/20

                p-1.5
              "
            >

              <UserRound size={18}/>

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

          bg-gradient-to-r

          from-pink-300
          via-fuchsia-300
          to-sky-300
        "
      />

    </>
  );
}