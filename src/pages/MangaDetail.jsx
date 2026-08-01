import { useLoaderData, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ApiError from "../Components/Common/ApiError";
import { Sparkles, Languages } from "lucide-react";


/* ================= SYNC ================= */

const syncLibrary = (data) => {
  localStorage.setItem("library", JSON.stringify(data));
  window.dispatchEvent(new Event("library-updated"));
};



/* ================= LOADER ================= */

export async function mangaLoader({ params }) {

  try {

    const res = await axios.get(
      `https://api.jikan.moe/v4/manga/${params.id}`
    );


    return {
      manga: res.data.data,
      error: false,
    };


  } catch (error) {

    console.error(
      "Manga Loader Error:",
      error
    );


    return {
      manga: null,
      error: true,
    };

  }

}





/* ================= COMPONENT ================= */

export default function MangaDetail() {


  const {
    manga,
    error
  } = useLoaderData();


  const navigate = useNavigate();



  const id = manga?.mal_id;



  const [rating, setRating] = useState(0);
  const [note, setNote] = useState("");
  const [noteSaved, setNoteSaved] = useState(false);
  const [saved, setSaved] = useState(false);
  const [completed, setCompleted] = useState(false);


  const [translatedSynopsis, setTranslatedSynopsis] = useState("");
  const [translating, setTranslating] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);





  /* ================= LOAD FROM LIBRARY ================= */

  useEffect(() => {


    if (!id) return;


    const library =
      JSON.parse(
        localStorage.getItem("library")
      ) || [];



    const item =
      library.find(
        (i) => i.id === id
      );



    if (item) {

      setSaved(true);

      setRating(
        item.rating || 0
      );

      setNote(
        item.note || ""
      );

      setCompleted(
        item.completed || false
      );

    }


  }, [id]);





  if (error) {

    return <ApiError />;

  }



  if (!manga) {

    return (
      <p className="text-center mt-10">
        Loading...
      </p>
    );

  }







  /* ================= SAVE / REMOVE ================= */

  const saveToLibrary = () => {


    const library =
      JSON.parse(
        localStorage.getItem("library")
      ) || [];



    const exists =
      library.find(
        (i) => i.id === id
      );



    if (exists) {


      const updated =
        library.filter(
          (i) => i.id !== id
        );


      syncLibrary(updated);


      setSaved(false);


      return;

    }





    library.push({

      id,

      title:
        manga.title,


      image:
        manga.images.jpg.image_url,


      rating,


      note,


      notes: [],


      progress: 0,


      completed: false,

    });



    syncLibrary(library);


    setSaved(true);

  };







  /* ================= COMPLETED ================= */

  const toggleCompleted = () => {


    const library =
      JSON.parse(
        localStorage.getItem("library")
      ) || [];



    const item =
      library.find(
        (i) => i.id === id
      );



    if (item) {


      item.completed =
        !item.completed;



      item.progress =
        item.completed
          ? 100
          : 0;



      syncLibrary(library);


      setCompleted(
        item.completed
      );

    }


  };







  /* ================= RATING ================= */

  const handleRating = (star) => {


    setRating(star);



    const library =
      JSON.parse(
        localStorage.getItem("library")
      ) || [];



    const item =
      library.find(
        (i) => i.id === id
      );



    if (item) {

      item.rating = star;

      syncLibrary(library);

    }

  };







  /* ================= NOTES ================= */

  const saveNote = () => {


    const library =
      JSON.parse(
        localStorage.getItem("library")
      ) || [];



    const item =
      library.find(
        (i) => i.id === id
      );



    if (item) {


      if (!item.notes) {

        item.notes = [];

      }



      if (note.trim()) {


        item.notes.push({

          text: note,

          createdAt:
            Date.now(),

        });

      }



      syncLibrary(library);


      setNote("");

      setNoteSaved(true);

    }

  };







  /* ================= TRANSLATE ================= */

  const translateSynopsis = async () => {


    if (translatedSynopsis) {

      setShowTranslation(
        !showTranslation
      );

      return;

    }



    try {


      setTranslating(true);



      const res =
        await axios.post(
          "http://localhost:3001/api/translate",
          {
            text: manga.synopsis,
          }
        );



      setTranslatedSynopsis(
        res.data.translated
      );



      setShowTranslation(true);



    } catch (err) {


      console.error(err);


      alert(
        "Translation failed."
      );


    } finally {


      setTranslating(false);

    }

  };








  return (

    <section
      className="
        max-w-6xl
        mx-auto

        p-4
        sm:p-6
      "
    >



      <button

        onClick={() => navigate(-1)}

        className="
          mb-6

          text-pink-600

          font-semibold
        "

      >

        ← Back

      </button>








      <div
        className="
          rounded-3xl

          border
          border-pink-200

          bg-gradient-to-br

          from-pink-50

          via-white

          to-violet-50

          shadow-2xl

          p-4
          sm:p-6
        "
      >



        <div
          className="
            flex

            flex-col

            md:flex-row

            gap-8
          "
        >





          {/* IMAGE */}

          <div
            className="
              flex

              flex-col

              items-center

              w-full
              md:w-auto
            "
          >


            <img

              src={
                manga.images.jpg.large_image_url
              }

              alt={manga.title}

              className="
                w-48
                sm:w-64

                h-72
                sm:h-96

                object-cover

                rounded-2xl
              "

            />




            <div
              className="
                flex

                flex-wrap

                justify-center

                gap-3

                mt-4
              "
            >


              <button
                onClick={saveToLibrary}

                className={`px-4 py-2 rounded-xl transition hover:scale-105 ${
                  saved
                    ? "bg-red-300 text-white hover:bg-red-400"
                    : "bg-pink-200 text-pink-800 hover:bg-pink-300"
                }`}
              >

                {saved
                  ? "Remove"
                  : "Save Library"}

              </button>




              <button
                className="
                  px-5
                  py-2

                  rounded-xl

                  bg-emerald-300

                  text-white

                  font-bold

                  hover:scale-105

                  transition
                "
              >

                Start Reading

              </button>





              <button

                onClick={toggleCompleted}

                className={`px-4 py-2 rounded-xl text-white transition hover:scale-105 ${
                  completed
                    ? "bg-emerald-700"
                    : "bg-green-300"
                }`}

              >

                {completed
                  ? "Completed ✓"
                  : "Complete"}

              </button>



            </div>


          </div>







          {/* INFO */}

          <div
            className="
              flex-1
            "
          >


            <h1
              className="
                text-3xl
                sm:text-4xl

                font-bold

                bg-gradient-to-r

                from-pink-600

                via-fuchsia-600

                to-violet-600

                bg-clip-text

                text-transparent
              "
            >

              {manga.title}

            </h1>





            <div
              className="
                flex

                flex-wrap

                gap-2

                mt-4
              "
            >

              {manga.genres?.map((g)=>(
                
                <span
                  key={g.mal_id}

                  className="
                    px-3
                    py-1

                    bg-pink-100

                    rounded-full
                  "
                >

                  {g.name}

                </span>

              ))}


            </div>







            <div
              className="
                flex

                flex-col

                md:flex-row

                gap-4

                mt-6
              "
            >


              <div className="bg-white/70 p-3 rounded-xl border border-pink-200 flex-1">
                <div className="text-pink-500 font-semibold">
                  Status
                </div>

                <div className="text-gray-700">
                  {manga.status}
                </div>

              </div>




              <div className="bg-white/70 p-3 rounded-xl border border-pink-200 flex-1">
                <div className="text-pink-500 font-semibold">
                  Score
                </div>

                <div className="text-yellow-500">
                  ⭐ {manga.score}
                </div>

              </div>




              <div className="bg-white/70 p-3 rounded-xl border border-pink-200 flex-1">

                <div className="text-pink-500 font-semibold">
                  Authors
                </div>

                <div className="text-gray-700">
                  {manga.authors?.map(a => a.name).join(", ")}
                </div>

              </div>


            </div>







            <div
              className="
                mt-6

                p-5

                bg-white/80

                rounded-2xl

                border

                border-pink-200
              "
            >


              {showTranslation && (

                <div className="mb-4">

                  <span
                    className="
                      inline-flex

                      items-center

                      gap-2

                      px-3

                      py-1

                      rounded-full

                      bg-violet-100

                      text-violet-700

                      text-xs

                      font-semibold
                    "
                  >

                    <Sparkles size={14}/>

                    AI Translation

                  </span>

                </div>

              )}




              <p
                className="
                  leading-7

                  text-gray-700

                  whitespace-pre-line
                "
              >

                {showTranslation
                  ? translatedSynopsis
                  : manga.synopsis}

              </p>





              <div className="flex justify-center mt-6">


                <button

                  onClick={translateSynopsis}

                  disabled={translating}

                  className="
                    px-5
                    py-2.5

                    rounded-full

                    bg-purple-200

                    text-slate-700

                    font-medium

                    shadow-md

                    hover:bg-white

                    transition

                    disabled:opacity-50
                  "

                >

                  {translating
                    ? "Translating..."
                    : showTranslation
                    ? "Back to English"
                    : "Translate to Persian"}

                </button>


              </div>


            </div>


          </div>


        </div>


      </div>






      {/* RATING */}

      <div className="mt-10 text-center">


        <h2 className="text-2xl font-bold text-pink-700 mb-2">

          Your Rating

        </h2>



        <div className="text-3xl">


          {[1,2,3,4,5].map(s=>(

            <span

              key={s}

              onClick={()=>handleRating(s)}

              className={`cursor-pointer transition hover:scale-125 ${
                rating >= s
                  ? "text-pink-500"
                  : "text-gray-300"
              }`}

            >

              ★

            </span>

          ))}


        </div>


      </div>







      {/* NOTES */}

      <div className="mt-10">


        <textarea

          value={note}

          onChange={(e)=>{

            setNote(e.target.value);

            setNoteSaved(false);

          }}


          className="
            w-full

            h-40

            p-4

            rounded-xl

            border

            border-pink-200

            focus:outline-none

            focus:ring-2

            focus:ring-purple-400
          "

        />



        <button

          onClick={saveNote}

          className="
            mt-3

            px-4

            py-2

            bg-purple-200

            rounded-lg

            hover:bg-purple-300

            transition
          "

        >

          {noteSaved
            ? "Saved ✓"
            : "Save Note"}

        </button>


      </div>







      {/* CHAPTERS */}

      <div className="mt-10">


        <h2 className="text-2xl font-bold text-pink-700 mb-4">

          Chapters

        </h2>



        <div
          className="
            p-6

            bg-white/80

            border

            border-pink-200

            rounded-2xl

            text-center

            text-purple-700
          "
        >

          Coming Soon...

        </div>


      </div>



    </section>

  );

}