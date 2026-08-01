import { Link } from "react-router-dom";


export default function Footer() {

  return (

    <footer
      className="
        relative
        mt-20
        overflow-hidden

        bg-gradient-to-br
        from-pink-100
        via-purple-100
        to-fuchsia-100

        border-t
        border-pink-200
      "
    >

      {/* Background */}
      <div
        className="
          absolute
          inset-0

          bg-[url('/src/assets/cloud-2.jpg')]
          bg-cover
          bg-center

          opacity-20
        "
      />


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
                from-pink-500
                via-fuchsia-500
                to-violet-500

                bg-clip-text
                text-transparent
              "
            >
              MangaVerse
            </h2>


            <p
              className="
                mt-4

                text-gray-600

                text-sm

                leading-7
              "
            >
              Discover manga stories,<br />
              explore new worlds and <br />
              keep track of your reading
              journey.
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

                text-purple-800

                mb-4
              "
            >
              MangaVerse AI
            </h3>


            <p
              className="
                text-sm

                text-gray-600

                leading-7
              "
            >
              Let AI help you discover
              manga based on your mood
              and reading taste.
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

                bg-gradient-to-r
                from-pink-400
                via-fuchsia-400
                to-violet-400

                text-white

                font-semibold

                shadow-lg

                hover:scale-105

                transition
              "
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

                text-purple-800

                mb-4
              "
            >
              Explore
            </h3>


            <ul
              className="
                space-y-3

                text-gray-600

                text-sm
              "
            >

              <li>

                <Link
                  to="/"

                  className="
                    hover:text-pink-600
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
                    hover:text-pink-600
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
                    hover:text-pink-600
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
                    hover:text-pink-600
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

            border-pink-200


            flex

            flex-col
            md:flex-row


            justify-between

            items-center


            gap-4


            text-sm

            text-gray-500
          "
        >


          <p>
            © 2026 MangaVerse.
            All rights reserved.
          </p>



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