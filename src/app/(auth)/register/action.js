"use server";

import { prisma } from "@/utils/prisma";
import bcrypt from "bcrypt";

export async function registerAction(_, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  // Validation
  if (!name || !email || !password) {
    return {
      success: false,
      errorMessage: "All fields are required",
    };
  }

  // Collision Check
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    return {
      success: false,
      errorMessage: "User already registered!",
    };
  }

  // Create User
  const hashedPassword = await bcrypt.hash(password, 12);
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return {
    success: true,
    message: "Register success",
  };
}
