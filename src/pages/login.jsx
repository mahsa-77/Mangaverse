import bg from "../assets/signin.jpg";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        flex
        items-center
        justify-center
      "
    >
      {/* Background */}

      <img
        src={bg}
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          blur-[3px]
          scale-105
        "
        alt="login background"
      />

      {/* Theme Overlay */}

      <div
        className="
          absolute
          inset-0
          bg-(--bg)
          opacity-60
        "
      />

      {/* Login Card */}

      <div
        className="
          relative
          z-10
          w-full
          max-w-md
          mx-4
          p-8
          rounded-3xl
          bg-(--surface)
          border
          border-(--border)
          shadow-2xl
        "
      >
        <h2
          className="
            text-3xl
            font-bold
            text-center
            mb-6
            text-(--heading)
          "
        >
          Welcome Back! ✨
        </h2>

        <form
          className="
            flex
            flex-col
            gap-4
          "
        >
          <input
            type="email"
            placeholder="Enter your Email"
            className="
              p-3
              rounded-xl
              bg-(--input-bg)
              border
              border-(--input-border)
              text-(--text)
              placeholder:text-(--text-muted)
              focus:outline-none
              focus:ring-2
              focus:ring-(--primary)
            "
          />

          <input
            type="password"
            placeholder="Enter your Password"
            className="
              p-3
              rounded-xl
              bg-(--input-bg)
              border
              border-(--input-border)
              text-(--text)
              placeholder:text-(--text-muted)
              focus:outline-none
              focus:ring-2
              focus:ring-(--primary)
            "
          />

          <button
            type="submit"
            className="
              mt-2
              py-3
              rounded-xl
              bg-(--primary)
              text-white
              font-semibold
              shadow-lg
              hover:bg-(--primary-hover)
              hover:scale-105
              transition-all
              duration-300
            "
          >
            Sign in
          </button>
        </form>

        <p
          className="
            mt-5
            text-sm
            text-center
            text-(--text-muted)
          "
        >
          Don't have an account?{" "}

          <Link
            to="/Register"
            className="
              font-semibold
              text-(--primary)
              hover:text-(--primary-hover)
              transition
              hover:underline
            "
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}