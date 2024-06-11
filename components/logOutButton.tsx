import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function LogOutButton({ path }: Readonly<{ path: string }>) {
  return (
    <Button
      className="rounded-sm bg-[#8C83C9]"
      size={"tiny"}
      onClick={() => {
        signOut();
        return <Link href={path} />;
      }}
    >
      <h2>Log out</h2>
    </Button>
  );
}
