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

      <h1
        className="
          text-4xl
          md:text-6xl

          font-bold

          bg-linear-to-r
          from-pink-500
          via-purple-500
          to-blue-500

          bg-clip-text
          text-transparent
        "
      >
        ✨ MangaVerse AI
      </h1>


      <p
        className="
          mt-5

          max-w-xl

          text-gray-700

          text-lg

          leading-8
        "
      >
        Your personal manga assistant.
        <br />
        Discover stories that match your mood and taste.
      </p>

      <div
        className="
          mt-5

          px-5
          py-2

          rounded-full

          bg-white/30

          backdrop-blur-md

          border
          border-white/40

          text-sm
          text-purple-700
        "
      >
        ✨ Let AI find your next adventure
      </div>

    </section>
  );
}