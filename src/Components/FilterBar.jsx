import { useSearchParams } from "react-router-dom";


export default function FilterBox() {

  const [searchParams, setSearchParams] = useSearchParams();


  const active =
    searchParams.get("filter") || "completed";



  const handleClick = (filter) => {

    setSearchParams((prev) => {

      const params = new URLSearchParams(prev);

      params.set("filter", filter);

      return params;

    });

  };




  const base =
    `
    px-3
    sm:px-5

    py-2

    rounded-full

    text-xs
    sm:text-sm

    font-semibold

    border

    transition-all

    duration-300

    ease-out
    `;



  const normal =
    `
    bg-white

    text-pink-600

    border-purple-200

    hover:bg-pink-50

    hover:scale-105

    hover:shadow-md
    `;



  const activeBtn =
    `
    bg-gradient-to-r

    from-pink-400

    via-fuchsia-400

    to-violet-400

    text-white

    border-pink-300

    shadow-md

    scale-105
    `;




  return (

    <div

      className="
        w-fit

        max-w-[95%]

        mx-auto

        flex

        flex-wrap

        items-center

        justify-center

        gap-2
        sm:gap-3

        mt-6

        mb-4

        bg-purple-50

        border-2

        border-purple-200

        p-2
        sm:p-3

        rounded-3xl

        shadow-lg
      "

    >


      <button

        onClick={() =>
          handleClick("completed")
        }

        className={`
          ${base}

          ${
            active === "completed"
              ? activeBtn
              : normal
          }
        `}

      >

        Completed

      </button>




      <button

        onClick={() =>
          handleClick("popular")
        }

        className={`
          ${base}

          ${
            active === "popular"
              ? activeBtn
              : normal
          }
        `}

      >

        Popular

      </button>





      <button

        onClick={() =>
          handleClick("oneshot")
        }

        className={`
          ${base}

          ${
            active === "oneshot"
              ? activeBtn
              : normal
          }
        `}

      >

        One-shot

      </button>



    </div>

  );

}