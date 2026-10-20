
"use client";

import { useState, type SubmitEvent } from "react";
import { Link } from "react-router";
import Input from "@/components/ui/Input"

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(username)
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    // TODO: Send registration data to Express backend.
    setMessage("Registration API not connected yet.");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm flex-col gap-5 rounded-xl bg-pink-900/90 p-8 text-white"
    >
      <h1 className="text-center text-2xl font-bold">
        Create an account
      </h1>

      <Input
          id="username"
          label="Username"
          type="text"
          value={username}
          onChange={setUsername}
          placeholder="Choose a username"
          autoComplete="username"
          minLength={3}
          maxLength={30}
          required
        />

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
          placeholder="Create a password"
          autoComplete="new-password"
          minLength={12}
          required
        />


      <Input
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          placeholder="Confirm your password"
          autoComplete="new-password"
          required
        />

      <button
        type="submit"
        className="rounded-lg bg-pink-600 p-3 font-semibold hover:bg-pink-700"
      >
        Register
      </button>

      {message && (
        <p role="status" className="text-center text-sm text-slate-300">
          {message}
        </p>
      )}

      <p className="text-center text-sm text-pink-400">
        Already have an account?{" "}
        <Link to="/login" className="text-pink-500 hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
