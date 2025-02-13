import { prisma } from "@/utils/prisma";
import { cookies } from "next/headers";
import React from "react";

export default async function Page() {
  return <div>Protected Route</div>;
}
