import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../assets/wallhaven-nkvw97.jpg";

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
      const res = await fetch("YOUR_API_URL/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // 👉 بعد از ثبت نام کاربر میره لاگین
      navigate("/");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <img
        src={bg}
        className="absolute inset-0 w-full h-full object-cover blur-[2px] scale-105"
        alt="background"
      />

      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="bg-white/80 rounded-3xl shadow-2xl px-8 py-10 max-w-md w-full text-center">
          
          <h2 className="text-pink-600 text-3xl font-semibold mb-6">
            Create Account 💖
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              className="p-3 rounded-xl border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="p-3 rounded-xl border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="p-3 rounded-xl border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-50"
            >
              {loading ? "Creating account.." : "Log in"}
            </button>
          </form>

          <p className="text-gray-600 text-sm mt-4">
            Do you have an account?{" "}
            <a href="/login" className="text-pink-600 font-medium">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}