import { prisma } from "@/utils/prisma";
import { Button } from "@heroui/react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({ children }) {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;

  if (!sessionId) {
    redirect("/login");
  }

  const checkSession = await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
    include: {
      user: true,
    },
  });

  if (!checkSession) {
    redirect("/login");
  }

  async function logoutAction() {
    "use server";

    const cookieStore = await cookies();
    cookieStore.delete("sessionId");

    await prisma.session.delete({
      where: {
        id: checkSession.id,
      },
    });
    redirect("/login");
  }

  return (
    <main className="p-12 space-y-12">
      <header className="flex justify-between p-4 rounded-lg bg-slate-50">
        <div>devscale.</div>

        <div>
          <div>{checkSession.user.name}</div>
          <form action={logoutAction}>
            <Button type="submit">Logout</Button>
          </form>
        </div>
      </header>
      <div>{children}</div>
    </main>
  );
}
