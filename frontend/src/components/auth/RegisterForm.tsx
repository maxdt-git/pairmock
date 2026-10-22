
"use client";

import { useState, type SubmitEvent } from "react";
import { Link } from "react-router";
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client";
import { useNavigate } from "react-router";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";

export default function RegisterForm() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    
    const navigate = useNavigate()

    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log(username)
        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        } 
        try {
            const { data, error } = await authClient.signUp.email({
                name: username,
                email: email,
                password: password,
            });   
            if (error) {
                setMessage(error.message ?? "Registration Failed");
                return;
            } 
            console.log("Registered user:", data?.user);
            setMessage("Account created successfully!");  
            const session = await authClient.getSession();
            console.log("Current session:", session.data)
            navigate("/dashboard")
        } catch (error) {
            console.error("Registration request failed", error);
            setMessage("Unable to connect to the backend")
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-sm flex-col gap-5 rounded-xl bg-pink-900/90 p-8 text-white"
        >
        <h1 className="text-center text-2xl font-bold">
            Create an account
        </h1>
        <FieldGroup className="gap-5">
            <Field>
                <FieldLabel htmlFor="email" className="text-white">
                    Username
                </FieldLabel>
                <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="Choose a username"
                    autoComplete="username"
                    required
                />
            </Field>
        </FieldGroup>

        <FieldGroup className="gap-5">
            <Field>
                <FieldLabel htmlFor="email" className="text-white">
                    Email
                </FieldLabel>
                <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                />
            </Field>
        </FieldGroup>

        <FieldGroup className="gap-5">
            <Field>
                <FieldLabel htmlFor="email" className="text-white">
                    Password
                </FieldLabel>
                <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    required
                />
            </Field>
        </FieldGroup>

        <FieldGroup className="gap-5">
            <Field>
                <FieldLabel htmlFor="email" className="text-white">
                    Confirm Password
                </FieldLabel>
                <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    required
                />
            </Field>
        </FieldGroup>

      <Button
        type="submit"
        className="rounded-lg bg-pink-600 p-3 font-semibold hover:bg-pink-700"
      >
        Register
      </Button>

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
