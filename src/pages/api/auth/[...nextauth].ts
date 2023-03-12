import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthResponseData } from "../auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { username, password } = credentials;

        console.log({ credentials });

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/auth`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username,
              password,
            }),
          }
        );

        const data: AuthResponseData = await response.json();

        if (!data.auth) throw new Error(data.errorDetails);

        return data as any;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/auth/login",
    signOut: "/",
    error: "/auth/login",
  },
};
export default NextAuth(authOptions);
