import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/auth/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">

      <form
        onSubmit={handleLogin}
        className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-[350px] text-white animate-fadeIn"
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          Welcome Back 👋
        </h2>

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full p-3 mb-4 rounded-lg bg-white/20 placeholder-white outline-none focus:ring-2 focus:ring-white transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="w-full p-3 mb-6 rounded-lg bg-white/20 placeholder-white outline-none focus:ring-2 focus:ring-white transition"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-white text-purple-600 font-bold py-3 rounded-lg hover:scale-105 transition duration-300">
          Login
        </button>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <a href="/register" className="underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}