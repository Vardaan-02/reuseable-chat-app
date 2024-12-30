"use client";

import Logout from "@/components/logout";
import { Button } from "@/components/ui/button";
import ThemeChanger from "@/components/ui/theme-changer";
import { useTheme } from "@/hooks/use-theme";
import { RootState } from "@/store/store";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Home() {
  useTheme();
  const user = useSelector((state: RootState) => state.user);

  

  return (
    <div className="flex flex-col gap-12 items-center justify-center h-screen">
      <ThemeChanger />
      {!user.name && (
        <div className="flex gap-8">
          <Link href={"/sign-up"}>
            <Button>Signup</Button>
          </Link>
          <Link href={"/login"}>
            <Button>Login</Button>
          </Link>
        </div>
      )}
      {user.name && <Logout />}
    </div>
  );
}
