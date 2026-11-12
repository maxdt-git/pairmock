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

export default function TwoFactorSettings() {
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
        title: error.message ?? "Could not enable 2FA",
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
      toast.add({ type: "error", title: "Invalid code, try again" });
      return;
    }
    toast.add({ type: "success", title: "Two-factor authentication is on" });
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
        title: error.message ?? "Could not disable 2FA",
      });
      return;
    }
    toast.add({ type: "success", title: "Two-factor authentication is off" });
    setPassword("");
    refetch();
  }
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Two-factor authentication</CardTitle>
        <CardDescription>
          {isEnabled
            ? "Enabled on your account."
            : "Add a code from an authenticator app when you sign in."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isEnabled ? (
          <form onSubmit={handleDisable} className="grid gap-3">
            <Label htmlFor="disable-password">Password</Label>
            <Input
              id="disable-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" variant="outline">
              Disable 2FA
            </Button>
          </form>
        ) : !totpURI ? (
          <form onSubmit={handleEnable} className="grid gap-3">
            <Label htmlFor="enable-password">Password</Label>
            <Input
              id="enable-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit">Enable 2FA</Button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="grid gap-3">
            <p className="text-sm">
              1. Scan this QR code with your authenticator app:
            </p>
            <div className="mx-auto bg-white p-3 rounded">
              <QRCode value={totpURI} size={160} />
            </div>
            <p className="text-sm">
              2. Save these backup codes somewhere safe:
            </p>
            <ul className="grid grid-cols-2 gap-1 font-mono text-sm">
              {backupCodes.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <Label htmlFor="totp-code">
              3. Enter the 6-digit code from the app
            </Label>
            <Input
              id="totp-code"
              inputMode="numeric"
              maxLength={6}
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <Button type="submit">Verify and turn on</Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
