import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, Star } from "lucide-react";


export default function SearchBox() {

  const navigate = useNavigate();


  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);



  async function handleSearch(text) {

    try {

      if (!text.trim()) {
        setResults([]);
        return;
      }


      const res = await axios.get(
        "https://api.jikan.moe/v4/manga",
        {
          params: {
            q: text,
            limit: 5,
          },
        }
      );


      setResults(
        res.data.data.slice(0, 5)
      );


    } catch (err) {

      console.log(err);

      setResults([]);

    }

  }





  const clearSearch = () => {

    setQuery("");

    setResults([]);

    setShowSuggestions(false);

  };





  const handleSubmit = (e) => {

    e.preventDefault();


    if (!query.trim()) return;


    navigate(
      `/search?q=${encodeURIComponent(query)}`
    );


    setShowSuggestions(false);

  };





  return (

    <section
      className="
        mx-4
        sm:mx-6
        md:mx-8

        mt-8
        md:mt-10

        rounded-3xl

        bg-gradient-to-br
        from-pink-50
        via-white
        to-purple-50

        border
        border-pink-100

        shadow-lg
        shadow-pink-100/40

        p-5
        sm:p-8
        md:p-10

        relative
      "
    >


      {/* Overlay */}

      {
        showSuggestions && (

          <div
            className="
              fixed
              inset-0

              z-20
            "

            onClick={() =>
              setShowSuggestions(false)
            }
          />

        )
      }





      <div
        className="
          flex
          flex-col

          items-center

          text-center
        "
      >



        <h1
          className="
            text-3xl
            sm:text-4xl
            md:text-6xl

            font-bold

            leading-tight

            text-purple-900
          "
        >

          Discover Your Next

          <br />

          <span
            className="
              bg-gradient-to-r
              from-pink-500
              via-fuchsia-500
              to-violet-500

              bg-clip-text

              text-transparent
            "
          >
            Manga Story ✨
          </span>

        </h1>





        <p
          className="
            mt-5

            text-sm
            sm:text-base
            md:text-lg

            text-purple-500

            max-w-2xl

            leading-7
            md:leading-8
          "
        >
          Explore thousands of beautiful manga,
          discover new stories and keep track
          of your reading journey.
        </p>






        {/* SEARCH */}

        <form
          onSubmit={handleSubmit}

          className="
            relative

            mt-8

            w-full

            max-w-2xl

            z-30
          "
        >


          <div
            className="
              flex

              items-center

              gap-3

              rounded-2xl

              border

              border-pink-200

              bg-white/80

              backdrop-blur-xl

              px-4
              sm:px-5

              py-3
              sm:py-4

              shadow-lg

              focus-within:ring-2

              focus-within:ring-pink-300
            "
          >


            <Search
              className="text-pink-400 shrink-0"
              size={22}
            />



            <input

              type="text"

              value={query}


              onFocus={() =>
                setShowSuggestions(true)
              }


              onChange={(e)=>{

                setQuery(e.target.value);

                handleSearch(
                  e.target.value
                );

              }}


              placeholder="Search your favorite manga..."


              className="
                flex-1

                min-w-0

                bg-transparent

                outline-none

                text-purple-800

                placeholder:text-purple-300
              "

            />




            {
              query && (

                <button

                  type="button"

                  onClick={clearSearch}

                >

                  <X

                    size={20}

                    className="
                      text-gray-400

                      hover:text-pink-500

                      transition
                    "

                  />

                </button>

              )
            }


          </div>








          {/* Suggestions */}


          {
            showSuggestions &&
            results.length > 0 && (

              <div

                className="
                  absolute

                  left-0

                  right-0

                  top-full

                  mt-3

                  rounded-2xl

                  border

                  border-pink-200

                  bg-white/95

                  backdrop-blur-xl

                  shadow-xl

                  overflow-hidden

                  z-50
                "

              >


                {
                  results.map((item)=>(


                    <div

                      key={item.mal_id}


                      onClick={()=>{

                        setShowSuggestions(false);

                        navigate(
                          `/manga/${item.mal_id}`
                        );

                      }}


                      className="
                        flex

                        items-center

                        gap-3
                        sm:gap-4

                        p-3
                        sm:p-4

                        hover:bg-pink-50

                        transition

                        cursor-pointer
                      "

                    >



                      <img

                        src={
                          item.images.jpg.image_url
                        }

                        alt={item.title}


                        className="
                          w-12
                          h-16

                          sm:w-14
                          sm:h-20

                          rounded-xl

                          object-cover

                          shadow

                          shrink-0
                        "

                      />




                      <div
                        className="
                          flex-1

                          text-left

                          min-w-0
                        "
                      >

                        <h3

                          className="
                            font-semibold

                            text-purple-900

                            truncate
                          "

                        >

                          {item.title}

                        </h3>



                        <div

                          className="
                            mt-1

                            flex

                            items-center

                            gap-1

                            text-pink-500
                          "

                        >

                          <Star
                            size={15}
                            fill="currentColor"
                          />


                          <span
                            className="
                              text-sm
                              font-medium
                            "
                          >

                            {
                              item.score ?? "N/A"
                            }

                          </span>


                        </div>


                      </div>


                    </div>


                  ))
                }


              </div>

            )
          }



        </form>



      </div>



    </section>

  );

}