import { Star, BookPlus, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";



export default function RecommendationCards({ mangas }) {


  const [addedBooks, setAddedBooks] = useState([]);




  const loadLibrary = () => {

    const library =
      JSON.parse(
        localStorage.getItem("library")
      ) || [];



    const ids =
      library.map(
        (item) => item.id
      );



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


    /*
      اگر Jikan اطلاعات نداده باشد
      وارد Library نمی‌شود
    */

    if (!manga.mal_id) {

      return;

    }





    const bookId =
      manga.mal_id;





    const library =
      JSON.parse(
        localStorage.getItem("library")
      ) || [];





    const exists =
      library.some(
        (item) =>
          item.id === bookId
      );





    let updatedLibrary;





    if (exists) {


      updatedLibrary =
        library.filter(
          (item) =>
            item.id !== bookId
        );




    } else {



      const newManga = {


        id: bookId,


        title: manga.title,


        image:
          manga.images?.jpg?.large_image_url,



        rating:
          manga.score || 0,



        notes: [],


        progress: 0,


      };




      updatedLibrary = [

        ...library,

        newManga

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



      <h2

        className="
          text-2xl
          sm:text-3xl
          font-bold
          text-purple-700
          mb-8
        "

      >

        ✨ AI Recommendations

      </h2>






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
              manga.mal_id
            );



          return (          

            <div

              key={
                manga.mal_id ||
                manga.title
              }


              className="
                bg-white/20
                backdrop-blur-xl
                border
                border-white/40
                rounded-3xl
                shadow-xl
                overflow-hidden
                hover:-translate-y-1
                hover:scale-[1.02]
                transition-all
                duration-300
              "

            >





              <img

                src={
                  manga.images?.jpg?.large_image_url
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





                <h3

                  className="
                    text-lg
                    sm:text-xl
                    font-bold
                    text-purple-800
                    line-clamp-2
                  "

                >

                  {manga.title}

                </h3>








                <div

                  className="
                    flex
                    items-center
                    gap-2
                    mt-3
                  "

                >


                  <Star

                    size={18}

                    className="
                      text-yellow-400
                      fill-yellow-400
                    "

                  />



                  <span>

                    {manga.score || "N/A"}

                  </span>



                </div>









                {manga.reason && (

                  <div

                    className="
                      mt-5
                      bg-purple-100/60
                      rounded-xl
                      p-4
                    "

                  >

                    <p

                      className="
                        text-sm
                        text-gray-700
                        leading-6
                      "

                    >

                      ✨ {manga.reason}

                    </p>


                  </div>

                )}









                <div

                  className="
                    mt-6
                    flex
                    flex-col
                    gap-3
                  "

                >







                  <button


                    onClick={() =>
                      toggleLibrary(manga)
                    }

                    className={`

                      w-full

                      flex

                      justify-center

                      items-center

                      gap-2

                      py-3

                      rounded-full

                      font-semibold

                      transition-all


                      ${

                        isAdded


                        ?

                        `
                        bg-green-200
                        text-green-700
                        border
                        border-green-300
                        hover:bg-red-100
                        hover:text-red-600
                        `


                        :

                        `
                        bg-white/80
                        text-fuchsia-600
                        border
                        border-fuchsia-300
                        hover:bg-fuchsia-100
                        `

                      }

                    `}

                  >





                    <BookPlus size={18}/>





                    {

                      isAdded

                      ?

                      "Added ✓"

                      :

                      "Add to Library"

                    }



                  </button>
                  
                    <Link
                      to={
                        manga.mal_id
                        ?
                        `/manga/${manga.mal_id}`
                        :
                        "#"
                      }
                      onClick={(e) => {
                        if (!manga.mal_id) {
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
                            bg-gradient-to-r
                            from-fuchsia-400
                            to-violet-500
                            text-white
                            font-semibold
                            hover:scale-105
                            transition
                          "

                        >


                          <Eye size={18}/>


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