"use client";

import { useActionState } from "react";
import { registerAction } from "./action";
import { Button, Input } from "@heroui/react";
import Link from "next/link";

export default function Page() {
  const [state, formAction, pending] = useActionState(registerAction, null);

  return (
    <form action={formAction} className="space-y-5">
      <section className="text-center">
        <h3 className="font-semibold text-lg">Register</h3>
        <p>Create an account to continue</p>
      </section>
      <section className="space-y-2">
        <Input name="name" placeholder="Fullname" />
        <Input name="email" type="email" placeholder="Email" />
        <Input name="password" type="password" placeholder="Password" />
        <Button type="submit" color="primary" fullWidth isLoading={pending}>
          Register
        </Button>
      </section>
      <section>
        <p>
          Have an account ? <Link href="/login">Login</Link>
        </p>
      </section>
      {state?.success == false && (
        <div className="text-center text-rose-500 text-sm bg-rose-50 p-2 rounded-lg font-semibold tracking-tight">{state?.errorMessage}</div>
      )}
      {state?.success && <div className="text-center text-emerald-500 text-sm bg-emerald-50 p-2 rounded-lg font-semibold tracking-tight">{state?.message}</div>}
    </form>
  );
}
