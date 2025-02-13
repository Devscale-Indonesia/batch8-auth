"use server";

import { prisma } from "@/utils/prisma";
import bcrypt from "bcrypt";

export async function loginAction(_, formData) {
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

  return {
    success: true,
    message: "Login success",
  };
}
