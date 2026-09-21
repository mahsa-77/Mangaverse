import { useSearchParams } from "react-router-dom";

export default function FilterBox() {

  const [searchParams, setSearchParams] = useSearchParams();

  const active = searchParams.get("filter") || "completed";

  const handleClick = (filter) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      params.set("filter", filter);

      return params;
    });
  };

  const base = `
    px-4
    sm:px-5

    py-2.5

    rounded-full

    text-xs
    sm:text-sm

    font-medium

    border

    transition-all
    duration-300

    cursor-pointer

    select-none
  `;

  const normal = `
    hover:-translate-y-[1px]
  `;

  const activeBtn = `
    shadow-sm

    hover:-translate-y-[1px]
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

        p-2

        rounded-full

        transition-all
        duration-300
      "

      style={{
        background: "rgba(255,255,255,.55)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",

        border: "1px solid var(--border)",

        boxShadow: "0 2px 8px rgba(15,23,42,.04)",
      }}
    >
      <button
        onClick={() => handleClick("completed")}

        className={`
          ${base}

          ${active === "completed" ? activeBtn : normal}
        `}

        style={
          active === "completed"
            ? {
                background: "var(--primary-hover)",
                color: "#fff",
                borderColor: "transparent",
                boxShadow: "0 2px 8px rgba(15,23,42,.08)",
              }
            : {
                background: "transparent",
                color: "var(--primary)",
                borderColor: "transparent",
              }
        }
      >
        Completed
      </button>

      <button
        onClick={() => handleClick("popular")}

        className={`
          ${base}

          ${active === "popular" ? activeBtn : normal}
        `}

        style={
          active === "popular"
            ? {
                background: "var(--primary-hover)",
                color: "#fff",
                borderColor: "transparent",
                boxShadow: "0 2px 8px rgba(15,23,42,.08)",
              }
            : {
                background: "transparent",
                color: "var(--primary)",
                borderColor: "transparent",
              }
        }
      >
        Popular
      </button>

      <button
        onClick={() => handleClick("oneshot")}

        className={`
          ${base}

          ${active === "oneshot" ? activeBtn : normal}
        `}

        style={
          active === "oneshot"
            ? {
                background: "var(--primary-hover)",
                color: "#fff",
                borderColor: "transparent",
                boxShadow: "0 2px 8px rgba(15,23,42,.08)",
              }
            : {
                background: "transparent",
                color: "var(--primary)",
                borderColor: "transparent",
              }
        }
      >
        One-shot
      </button>
    </div>
  );
}
