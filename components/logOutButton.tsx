import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function LogOutButton({ path }: Readonly<{ path: string }>) {
  return (
    <Button
      className="bg-[#8C83C9]"
      onClick={() => {
        signOut();
        return <Link href={path} />;
      }}
    >
      Log out
    </Button>
  );
}
