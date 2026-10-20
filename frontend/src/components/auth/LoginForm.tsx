
"use client";

import { useState, type SubmitEvent } from "react";
import { Link } from "react-router";
import Input from "@/components/ui/Input"

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    // TODO: Send credentials to the Express backend.
    setMessage("Authentication API not connected yet.");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm flex-col gap-5 rounded-xl bg-pink-900/90 p-8 text-white"
    >
      <h1 className="text-center text-2xl font-bold">
        Sign in
      </h1>
      <Input
        id="email"
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="you@example.com"
        autoComplete="email"
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={setPassword}
        placeholder="Enter your password"
        autoComplete="current-password"
        required
      />

      <button
        type="submit"
        className="rounded-lg bg-pink-600 p-3 font-semibold hover:bg-pink-700"
      >
        Login
      </button>

      {message && (
        <p role="status" className="text-center text-sm text-slate-300">
          {message}
        </p>
      )}

      <p className="text-center text-sm text-pink-400">
        Don't have an account?{" "}
        <Link to="/register" className="text-pink-500 hover:underline">
          Register
        </Link>
      </p>
    </form>
  );
}
