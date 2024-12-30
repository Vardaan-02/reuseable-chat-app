"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Background from "@/components/ui/backgorund";
import { useHandleLogin } from "@/hooks/use-login";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutateAsync: handleLogin, isPending: logging } = useHandleLogin();

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin({ email, password });
    router.replace("/chat");
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <Background />
      <Card className="md:w-[500px] w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="vardaanpahwa02@gamil.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="********"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            {logging ? (
              <Button disabled className="w-full">
                <ReloadIcon className="mr-2 animate-spin w-4 h-4 flex justify-center items-center" />
                Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                variant={"success"}
                className="w-full group/btn"
              >
                Log in
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
