import axios from "axios";
import { Link, useLoaderData, useSearchParams } from "react-router-dom";
import { Star } from "lucide-react";
import ApiError from "./Common/ApiError.jsx"


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

    const res = await axios.get(
      "https://api.jikan.moe/v4/manga",
      {
        params: {
          q: query,
        },
      }
    );


    return {

      results: res.data.data,

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


  const {
    results,
    query,
    error
  } = useLoaderData();


  const [searchParams] = useSearchParams();



  return (

    <section
      className="
        m-4
        sm:m-6
        md:m-8

        p-4
        sm:p-6

        bg-slate-100

        rounded-md
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
            text-purple-700
          "
        >
          Search Results
        </h2>



        <p
          className="
            text-sm
            text-gray-600
            mt-1
          "
        >

          Results for:{" "}


          <span
            className="
              font-semibold
              text-purple-600
            "
          >
            {query || searchParams.get("q")}
          </span>


        </p>


      </div>






      {/* API ERROR */}


      {
        error && (

          <ApiError

            title="Manga service unavailable"

            message="Unable to load search results."

            description="
              Jikan API is currently unavailable.
              Please try again later.
            "

          />

        )
      }







      {/* RESULTS */}


      {
        !error && results.length === 0 ? (


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


              {
                results.map((item)=>{


                  const author =
                    item.authors?.length > 0

                    ? item.authors[0].name

                    : "Unknown";



                  return (


                    <Link

                      to={`/manga/${item.mal_id}`}

                      key={item.mal_id}

                    >


                      <div

                        className="
                          bg-white

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

                          src={
                            item.images.jpg.image_url
                          }

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

                            text-purple-800
                          "

                        >

                          {item.title}

                        </h4>



                        <p

                          className="
                            text-xs

                            text-gray-600

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

                              text-gray-700
                            "

                          >

                            {item.score || "N/A"}

                          </span>


                        </div>


                      </div>


                    </Link>


                  );


                })
              }


            </div>

          )

        )

      }


    </section>

  );

}