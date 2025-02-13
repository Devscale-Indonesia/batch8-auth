import { cookies } from "next/headers";
import { google } from "@/utils/arctic";

export default async function Page({ searchParams }) {
  const query = await searchParams;
  const state = query.state;
  const code = query.code;

  const cookieStore = await cookies();
  const codeVerifier = cookieStore.get("codeVerifier")?.value;

  // code validation
  const tokens = await google.validateAuthorizationCode(code, codeVerifier);
  const accessToken = tokens.accessToken();

  const res = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await res.json();
  console.log({ data });

  // Sesssion ? Token ?
}
