"use server";

import * as arctic from "arctic";
import { google } from "@/utils/arctic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function continueWithGoogleAction(_, formData) {
  const cookieStore = await cookies();
  const state = arctic.generateState(); // token
  const codeVerifier = arctic.generateCodeVerifier(); // token
  const scopes = ["openid", "profile"];

  cookieStore.set("codeVerifier", codeVerifier, {
    httpOnly: true,
  });

  const url = google.createAuthorizationURL(state, codeVerifier, scopes);
  redirect(url.href);
}
