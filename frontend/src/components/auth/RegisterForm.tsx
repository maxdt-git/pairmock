"use client";

import { useState, type SubmitEvent } from "react";
import { Link } from "react-router";
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { toast } from "../ui/toast";
import { Trans, useTranslation } from "react-i18next";

export default function RegisterForm() {
    const { t } = useTranslation();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        if (password !== confirmPassword) {
            toast.add({
                type: "error",
                description: t("auth.register.mismatch"),
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
                    description: (error.message ?? t("auth.register.failed")),
                    priority: "high",
                });
                return;
            }
        } catch (error) {
            toast.add({
                type: "error",
                description: t("auth.serverUnreachable"),
                priority: "high",
            });
        }
    }

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>{t("auth.register.title")}</CardTitle>
                <CardDescription>
                    {t("auth.register.description")}
                </CardDescription>
                <CardAction>
                    <Button variant="link" nativeButton={false} render={<Link to={"/login"} />}>
                        {t("auth.register.signIn")}
                    </Button>
                </CardAction>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="username">{t("auth.register.username")}</Label>
                            <Input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                placeholder={t("auth.register.usernamePlaceholder")}
                                autoComplete="username"
                                required
                                maxLength={25}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">{t("auth.email")}</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                placeholder={t("auth.emailPlaceholder")}
                                autoComplete="email"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">{t("auth.password")}</Label>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                placeholder={t("auth.passwordPlaceholder")}
                                autoComplete="new-password"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="confirmPassword">{t("auth.register.confirmPassword")}</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                                placeholder={t("auth.register.confirmPasswordPlaceholder")}
                                autoComplete="new-password"
                                required
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex-col gap-2 mt-6">
                    <Button type="submit" className="w-full">
                        {t("auth.register.submit")}
                    </Button>
                    <p className="text-center text-xs text-muted-foreground">
                        <Trans
                            i18nKey="auth.register.consent"
                            components={{
                                terms: <Link to="/service" className="underline underline-offset-4 hover:text-foreground" />,
                                privacy: <Link to="/policy" className="underline underline-offset-4 hover:text-foreground" />,
                            }}
                        />
                    </p>
                </CardFooter>
            </form>
        </Card>


    );
}