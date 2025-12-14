import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/encryption";
import type { Prisma } from "@prisma/client";

function isEmail(val: string) {
  return /\S+@\S+\.\S+/.test(val);
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Email or phone number and password",
      credentials: {
        identifier: {
          label: "Email or phone number",
          type: "text",
          placeholder: "example@ex.com lub 48012345678",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials.password) {
          throw new Error("Please enter your e-mail or phone number and password");
        }

        const { identifier, password } = credentials;

        const whereClause: Prisma.UserWhereInput = isEmail(identifier)
          ? { email: identifier }
          : { phone: identifier };

        const user = await prisma.user.findFirst({
          where: whereClause,
        });

        if (!user) {
          throw new Error("User not found");
        }

        const isValid = await verifyPassword(password, user.password);
        if (!isValid) {
          throw new Error("Incorrect password");
        }

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.firstName,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) session.user.id = token.id as string;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login?error=",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
