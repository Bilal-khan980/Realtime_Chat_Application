import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
    navigate("/Dashboard");
  };

  return (
    <div className="bg-slate-900 h-[500px] w-[500px] flex flex-col justify-center items-center rounded-2xl shadow-2xl space-y-3 p-6">
      {/* Title */}
      <div className="text-3xl font-bold text-white mb-2">WELCOME BACK!!!</div>
      <div className="mb-4 text-slate-300">SIGN IN TO YOUR ACCOUNT</div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-3/4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded-lg border border-slate-600 bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400"
          required
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded-lg border border-slate-600 bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400"
          required
        />

        <button
          type="submit"
          className="border border-white text-white px-4 py-2 rounded-lg hover:bg-white hover:text-black transition-colors"
        >
          Sign In
        </button>
      </form>

      {/* Link */}
      <div className="p-4 text-slate-300">
        Don't have an account?{" "}
        <Link to="/register" className="text-white hover:underline">
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Register;
