import { Link, useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import Ticon from "../assets/magic.png";
import ApiError from "./Common/ApiError";


/* ================= LOADER ================= */

export async function trendingLoader({ request }) {

  const url = new URL(request.url);

  const filter =
    url.searchParams.get("filter") || "completed";

  const page =
    url.searchParams.get("page") || "1";


  let apiUrl = "";


  if (filter === "completed") {

    apiUrl =
      `https://api.jikan.moe/v4/manga?status=complete&page=${page}&limit=20`;

  } else if (filter === "popular") {

    apiUrl =
      `https://api.jikan.moe/v4/manga?order_by=popularity&sort=asc&page=${page}&limit=20`;

  } else if (filter === "oneshot") {

    apiUrl =
      `https://api.jikan.moe/v4/manga?type=oneshot&page=${page}&limit=20`;

  }



  try {

    const res = await axios.get(apiUrl);


    let data = res.data.data;


    if (filter === "popular") {

      data = data.sort((a, b) => {

        const as = a.score;
        const bs = b.score;


        if (as && bs)
          return a.popularity - b.popularity;


        if (as && !bs)
          return -1;


        if (!as && bs)
          return 1;


        return 0;

      });

    }



    return {

      manga: data,

      page: Number(page),

      totalPages:
        res.data.pagination.last_visible_page,

      filter,

      error:false,

    };



  } catch (error) {


    console.log(
      "Jikan API Error:",
      error
    );


    return {

      manga: [],

      page: Number(page),

      totalPages:1,

      filter,

      error:true,

    };


  }

}





/* ================= COMPONENT ================= */


export default function Trendings() {


  const navigate = useNavigate();


  const {
    manga,
    page,
    totalPages,
    filter,
    error
  } = useLoaderData();




  const changePage = (newPage)=>{

    navigate(
      `/?filter=${filter}&page=${newPage}`
    );

  };





  return (

    <section
      className="
        m-4
        sm:m-6
        md:m-8

        p-4
        sm:p-6

        bg-slate-100

        rounded-2xl

        shadow-sm
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

            text-purple-700

            font-bold
          "
        >
          Trending Now
        </h3>


      </div>







      {/* Error */}

      {
        error && (

          <ApiError

            title="Manga service unavailable"

            message="Unable to load trending manga."

            description="
              Jikan API is temporarily unavailable.
              Please try again later.
            "

          />

        )
      }







      {/* Empty */}

      {
        !error &&
        manga.length === 0 && (

          <ApiError

            title="No manga found"

            message="There are no manga to display."

            description="
              Try changing the filter or page.
            "

          />

        )

      }







      {
        !error &&
        manga.length > 0 && (

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


              {
                manga.map((item)=>{


                  const author =
                    item.authors?.length > 0

                    ? item.authors[0].name

                    : "Unknown";



                  const readers =
                    item.members ||
                    item.favorites ||
                    0;



                  return (

                    <Link

                      to={`/manga/${item.mal_id}`}

                      key={item.mal_id}

                    >


                      <div

                        className="
                          bg-white

                          p-3

                          rounded-xl

                          shadow-md

                          hover:shadow-xl

                          hover:-translate-y-1

                          transition-all

                          duration-300

                          cursor-pointer

                          h-full
                        "

                      >


                        <img

                          src={
                            item.images.jpg.image_url
                          }

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

                            text-purple-800

                            line-clamp-2
                          "

                        >

                          {item.title}

                        </h4>



                        <p

                          className="
                            text-xs

                            text-gray-600

                            mt-2
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

                            mt-2
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



                        <p

                          className="
                            text-xs

                            text-gray-600

                            mt-2
                          "

                        >

                          👁️ Readers:
                          {" "}
                          {readers.toLocaleString()}

                        </p>


                      </div>


                    </Link>

                  );


                })
              }


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

                onClick={() =>
                  changePage(page - 1)
                }

                disabled={page <= 1}


                className="
                  px-4
                  py-2

                  bg-purple-300

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

                  bg-white

                  border

                  border-purple-300

                  rounded-lg

                  text-purple-700

                  font-bold

                  shadow
                "

              >

                Page {page} of {totalPages}

              </div>





              <button

                onClick={() =>
                  changePage(page + 1)
                }

                disabled={page >= totalPages}


                className="
                  px-4

                  py-2

                  bg-purple-500

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

        )

      }



    </section>

  );

}