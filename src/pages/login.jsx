import bg from "../assets/wallhaven-nkvw97.jpg";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* پس‌زمینه */}
      <img
        src={bg}
        className="absolute inset-0 w-full h-full object-cover blur-[2px] scale-105"
        alt="login background"
      />


      {/* فرم لاگین */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="bg-white/80 rounded-3xl shadow-2xl px-8 py-10 max-w-md w-full text-center">
          <h2 className="text-pink-600 text-3xl font-semibold mb-6">
            Welcome Back! 💗
          </h2>

          <form className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Enter your Email"
              className="p-3 rounded-xl border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <input
              type="password"
              placeholder="Enter your Password"
              className="p-3 rounded-xl border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />

            <button
              type="submit"
              className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-xl transition-all"
            >
              Sign in
            </button>
          </form>

          <p className="text-gray-600 text-sm mt-4">
            Dont have an account?{" "}
            <Link to="/Register" className="text-pink-600 font-medium">
            Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}