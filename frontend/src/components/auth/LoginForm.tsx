"use client";

import { useState, type SubmitEvent } from "react";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { toast } from "../ui/toast";
import { useTranslation } from "react-i18next";

export default function LoginForm() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleGoogleLogin() {
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });

    if (error) {
      toast.add({
        type: "error",
        description: (error.message ?? t("auth.login.failed")),
        priority: "high",
      });
    }
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.add({
          type: "error",
          description: (error.message ?? t("auth.login.failed")),
          priority: "high",
        });
        return;
      }
    } catch (error) {
      toast.add({
        type: "error",
        description: t("auth.serverUnreachable"),
        priority: "high",
      })
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{t("auth.login.title")}</CardTitle>
        <CardDescription>
          {t("auth.login.description")}
        </CardDescription>
        <CardAction>
          <Button variant="link" render={<Link to={"/register"} />}>
            {t("auth.login.signUp")}
          </Button>
        </CardAction>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="flex flex-col gap-6">
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
                autoComplete="current-password"
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2 mt-6">
          <Button type="submit" className="w-full">
            {t("auth.login.submit")}
          </Button>
          <Button type="button" variant="outline" className="w-full" onClick={handleGoogleLogin}>
            {t("auth.login.google")}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}