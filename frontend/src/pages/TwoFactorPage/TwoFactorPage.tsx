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

export default function TwoFactorPage() {
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
        description: "Invalid code, try again",
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
          <CardTitle>Two-factor authentication</CardTitle>
          <CardDescription>
            {useBackupCode
              ? "Enter one of your backup codes."
              : "Enter the 6-digit code from your authenticator app."}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-2">
            <Label htmlFor="code">
              {useBackupCode ? "Backup code" : "Code"}
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
              Verify
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
                ? "Use authenticator app instead"
                : "Lost your phone? Use a backup code"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
