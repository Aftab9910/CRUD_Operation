import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/auth/register",
        { name, email, password }
      );

      setMessage("✅ Registration successful!");
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setMessage("❌ Error: " + (err.response?.data?.msg || "Something went wrong"));
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-700">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-96 text-white">
        
        <h2 className="text-3xl font-bold text-center mb-6">Register</h2>

        {message && (
          <p className="text-center mb-4 text-sm">{message}</p>
        )}

        <input
          type="text"
          placeholder="Name"
          className="w-full mb-3 p-2 rounded bg-white/20 outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 rounded bg-white/20 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 rounded bg-white/20 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-white text-indigo-600 font-semibold py-2 rounded hover:bg-gray-200 transition"
        >
          Sign Up
        </button>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/" className="underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}