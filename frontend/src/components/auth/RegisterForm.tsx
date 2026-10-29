
"use client";

import { useState, type SubmitEvent } from "react";
import { Link } from "react-router";
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { toast } from "../ui/toast";

export default function RegisterForm() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log(username)
        if (password !== confirmPassword) {
            toast.add({
                type: "error",
                description: "Passwords do not match.",
                priority: "high",
            });
            return;
        }
        try {
            const { error } = await authClient.signUp.email({
                name: username,
                email: email,
                password: password,
            });
            if (error) {
                toast.add({
                    type: "error",
                    description: (error.message ?? "Registration Failed."),
                    priority: "high",
                });
                return;
            }
        } catch (error) {
            console.error("Registration request failed", error);
            toast.add({
                type: "error",
                description: "Unable to connect to the backend",
                priority: "high",
            });
        }
    }

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                    Enter your information below to create your account
                </CardDescription>
                <CardAction>
                    <Button variant="link">
                        <Link to={"/login"}>
                            Sign in
                        </Link>
                    </Button>
                </CardAction>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                placeholder="Choose a username"
                                autoComplete="username"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                placeholder="you@example.com"
                                autoComplete="email"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                placeholder="Enter your password"
                                autoComplete="new-password"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                                placeholder="Confirm your password"
                                autoComplete="new-password"
                                required
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex-col gap-2 mt-6">
                    <Button type="submit" className="w-full">
                        Register
                    </Button>
                </CardFooter>
            </form>
        </Card>


    );
}
