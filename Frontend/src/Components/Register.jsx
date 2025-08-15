import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ fullname, email, password });
  };

  return (
    <div className="bg-slate-900 h-[500px] w-[500px] flex flex-col justify-center items-center rounded-2xl shadow-2xl space-y-3 p-6">
      {/* Title */}
      <div className="text-3xl font-bold text-white mb-2">WELCOME !!!</div>
      <div className="mb-4 text-slate-300">SIGN UP TO CREATE A NEW ACCOUNT</div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-3/4">
        <input
          type="text"
          placeholder="Enter your full name"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          className="p-2 rounded-lg border border-slate-600 bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400"
          required
        />

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
          Sign Up
        </button>
      </form>

      {/* Link */}
      <div className="p-4 text-slate-300">
        Already have an account?{" "}
        <Link to="/login" className="text-white hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  );
}

export default Register;
