import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import bg from "../assets/signin.jpg";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    setLoading(true);

    try {
      const res = await fetch(
        "YOUR_API_URL/register",

        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(form),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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

        alt="background"

        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          blur-[3px]
          scale-105
        "
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

      {/* Register Card */}

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
          Create Account ✨
        </h2>

        <form
          onSubmit={handleSubmit}

          className="
            flex
            flex-col
            gap-4
          "
        >
          <input
            type="text"

            name="name"

            value={form.name}

            onChange={handleChange}

            placeholder="Name"

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
            type="email"

            name="email"

            value={form.email}

            onChange={handleChange}

            placeholder="Email"

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

            name="password"

            value={form.password}

            onChange={handleChange}

            placeholder="Password"

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

          {error && (
            <p
              className="
                  text-(--text-muted)
                  text-sm
                  text-center
                "
            >
              {error}
            </p>
          )}

          <button
            type="submit"

            disabled={loading}

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

              disabled:opacity-50
            "
          >
            {loading ? "Creating account..." : "Create Account"}
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
          Already have an account?{" "}
          <Link
            to="/login"

            className="
              font-semibold
              text-(--primary)
              hover:text-(--primary-hover)
              transition
              hover:underline
            "
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
