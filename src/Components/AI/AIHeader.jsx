export default function AIHeader() {
  return (
    <section
      className="
        flex
        flex-col
        items-center
        justify-center
        text-center

        pt-16
        px-6
      "
    >
      {/* Title */}

      <h1
        className="
          text-4xl
          md:text-6xl

          font-bold

          bg-linear-to-r
          from-(--gradient-start)
          via-(--gradient-middle)
          to-(--gradient-end)

          bg-clip-text
          text-transparent
        "
      >
        ✨ MangaVerse AI
      </h1>

      {/* Description */}

      <p
        className="
          mt-5

          max-w-xl

          text-(--text-muted)

          text-lg

          leading-8
        "
      >
        Your personal manga assistant.
        <br />
        Discover stories that match your mood and taste.
      </p>

      {/* AI Badge */}

      <div
        className="
          mt-5

          px-5
          py-2

          rounded-full

          bg-(--surface)

          backdrop-blur-md

          border
          border-(--border)

          text-sm
          font-semibold

          text-(--heading)

          shadow-[0_4px_14px_var(--shadow)]

          transition-all
          duration-300

          hover:-translate-y-1
        "
      >
        ✨ Let AI find your next adventure
      </div>
    </section>
  );
}
