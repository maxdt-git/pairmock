import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";
import { useTranslation } from "react-i18next";

export default function TwoFactorPage() {
  const { t } = useTranslation();
  const [code, setCode] = useState("");
  const [useBackupCode, setUseBackupCode] = useState(false);
  const navigate = useNavigate();
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { error } = useBackupCode
      ? await authClient.twoFactor.verifyBackupCode({ code })
      : await authClient.twoFactor.verifyTotp({ code, trustDevice: true });
    if (error) {
      toast.add({
        type: "error",
        description: t("twoFactor.invalidCode"),
        priority: "high",
      });
      return;
    }
    navigate("/dashboard", { replace: true });
  }

  return (
    <main className="flex min-h-dvh items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>{t("twoFactor.title")}</CardTitle>
          <CardDescription>
            {useBackupCode
              ? t("twoFactor.page.backupDescription")
              : t("twoFactor.page.totpDescription")}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-2">
            <Label htmlFor="code">
              {useBackupCode ? t("twoFactor.page.backupCode") : t("twoFactor.page.code")}
            </Label>
            <Input
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              inputMode={useBackupCode ? "text" : "numeric"}
              maxLength={useBackupCode ? 20 : 6}
              autoComplete="one-time-code"
              autoFocus
              required
            />
          </CardContent>
          <CardFooter className="flex-col gap-2 mt-6">
            <Button type="submit" className="w-full">
              {t("twoFactor.page.verify")}
            </Button>
            <Button
              type="button"
              variant="link"
              onClick={() => {
                setUseBackupCode(!useBackupCode);
                setCode("");
              }}
            >
              {useBackupCode
                ? t("twoFactor.page.useTotp")
                : t("twoFactor.page.useBackup")}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
