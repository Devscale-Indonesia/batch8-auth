import { prisma } from "@/utils/prisma";
import { Button } from "@heroui/react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

export default async function Layout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  let username = "";

  try {
    const payload = jwt.verify(token, "secretKey");
    username = payload.name;
  } catch (error) {
    console.error(error);
    redirect("/login");
  }

  async function logoutAction() {
    "use server";

    const cookieStore = await cookies();
    cookieStore.delete("token");
  }

  return (
    <main className="p-12 space-y-12">
      <header className="flex justify-between p-4 rounded-lg bg-slate-50">
        <div>devscale.</div>

        <div>
          <div>{username}</div>
          <form action={logoutAction}>
            <Button type="submit">Logout</Button>
          </form>
        </div>
      </header>
      <div>{children}</div>
    </main>
  );
}
