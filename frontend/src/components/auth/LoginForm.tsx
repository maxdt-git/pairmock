
"use client";

import { useState, type SubmitEvent } from "react";
import { Link } from "react-router";
import Input from "@/components/ui/AuthInput"
import { authClient } from "@/lib/auth-client";
import { useNavigate } from "react-router";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    async function handleGoogleLogin() {
        const { error } = await authClient.signIn.social({
          provider: "google",
          callbackURL: "http://localhost:3000/dashboard",
        });
    
        if (error) {
          console.error("Google login failed:", error);
        }
    }

    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            const { data, error } = await authClient.signIn.email({
                email,
                password,
            });

            if (error) {
              setMessage(error.message ?? "Login failed.");
              return;
            }

            console.log("Logged in user:", data?.user);
            setMessage("Login successful!");

            navigate("/dashboard");
        } catch (error) {
          console.error("Login error:", error);
          setMessage("Unable to connect to the server.");
        }
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

      <button
        type="button"
        className="rounded-lg bg-pink-600 p-3 font-semibold hover:bg-pink-700"
        onClick={handleGoogleLogin}
      >
        Continue with Google
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
