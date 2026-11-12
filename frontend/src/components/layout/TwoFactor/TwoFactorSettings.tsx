import { useState, type FormEvent } from "react";
import QRCode from "react-qr-code";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";
import { useTranslation } from "react-i18next";

export default function TwoFactorSettings() {
  const { t } = useTranslation();
  const { data: session, refetch } = authClient.useSession();
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [totpURI, setTotpURI] = useState("");
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const isEnabled = Boolean(session?.user.twoFactorEnabled);
  async function handleEnable(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { data, error } = await authClient.twoFactor.enable({ password });
    if (error) {
      toast.add({
        type: "error",
        title: error.message ?? t("twoFactor.settings.enableFailed"),
      });
      return;
    }
    if (!data || data.method !== "totp") {
        toast.add({
            type: "error",
            title: "TOTP is not available",
        });
        return;
    }
    setTotpURI(data.totpURI);
    setBackupCodes(data.backupCodes);
    setPassword("");
  }
  async function handleVerify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { error } = await authClient.twoFactor.verifyTotp({ code });
    if (error) {
      toast.add({ type: "error", title: t("twoFactor.invalidCode") });
      return;
    }
    toast.add({ type: "success", title: t("twoFactor.settings.enabled") });
    setTotpURI("");
    setBackupCodes([]);
    setCode("");
    refetch();
  }
  async function handleDisable(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { error } = await authClient.twoFactor.disable({ password });
    if (error) {
      toast.add({
        type: "error",
        title: error.message ?? t("twoFactor.settings.disableFailed"),
      });
      return;
    }
    toast.add({ type: "success", title: t("twoFactor.settings.disabled") });
    setPassword("");
    refetch();
  }
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{t("twoFactor.title")}</CardTitle>
        <CardDescription>
          {isEnabled
            ? t("twoFactor.settings.enabledDescription")
            : t("twoFactor.settings.disabledDescription")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isEnabled ? (
          <form onSubmit={handleDisable} className="grid gap-3">
            <Label htmlFor="disable-password">{t("twoFactor.password")}</Label>
            <Input
              id="disable-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" variant="outline">
              {t("twoFactor.settings.disable")}
            </Button>
          </form>
        ) : !totpURI ? (
          <form onSubmit={handleEnable} className="grid gap-3">
            <Label htmlFor="enable-password">{t("twoFactor.password")}</Label>
            <Input
              id="enable-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit">{t("twoFactor.settings.enable")}</Button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="grid gap-3">
            <p className="text-sm">
              {t("twoFactor.settings.scanStep")}
            </p>
            <div className="mx-auto bg-white p-3 rounded">
              <QRCode value={totpURI} size={160} />
            </div>
            <p className="text-sm">
              {t("twoFactor.settings.backupStep")}
            </p>
            <ul className="grid grid-cols-2 gap-1 font-mono text-sm">
              {backupCodes.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <Label htmlFor="totp-code">
              {t("twoFactor.settings.codeStep")}
            </Label>
            <Input
              id="totp-code"
              inputMode="numeric"
              maxLength={6}
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <Button type="submit">{t("twoFactor.settings.verify")}</Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
