"use server";

import { prisma } from "@/utils/prisma";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

export async function loginAction(_, formData) {
  const cookieStore = await cookies();
  const email = formData.get("email");
  const password = formData.get("password");

  // Validation
  if (!email || !password) {
    return {
      success: false,
      errorMessage: "All fields are required",
    };
  }

  // Validate User
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return {
      success: false,
      errorMessage: "User not found",
    };
  }

  // Validate Password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return {
      success: false,
      errorMessage: "Invalid Password",
    };
  }

  // Generate Token
  const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET);

  cookieStore.set("token", token, {
    httpOnly: true,
    sameSite: "lax",
  });

  redirect("/dashboard");
}
