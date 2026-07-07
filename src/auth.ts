import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";
import { isMockAuthEnabled } from "@/lib/mock-data";
import type { Role } from "@/generated/prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: Role;
    };
  }
}

declare module "@auth/core/types" {
  interface User {
    role?: Role;
  }
}

const demoUsers = {
  admin: {
    id: "mock-admin-id",
    email: "admin@lumenaimusic.com",
    name: "Demo Admin",
    role: "ADMIN" as Role,
  },
  customer: {
    id: "mock-customer-id",
    email: "guest@lumenaimusic.com",
    name: "Demo Guest",
    role: "CUSTOMER" as Role,
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Credentials({
      id: "demo",
      name: "Demo",
      credentials: {
        account: { label: "Account", type: "text" },
      },
      async authorize(credentials) {
        if (!isMockAuthEnabled()) return null;
        const account = credentials?.account as keyof typeof demoUsers;
        if (account === "admin") return demoUsers.admin;
        if (account === "customer") return demoUsers.customer;
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) {
        if (user.id.startsWith("mock-")) {
          token.id = user.id;
          token.role = user.role ?? "CUSTOMER";
          token.email = user.email;
          token.name = user.name;
        } else {
          const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
          token.id = user.id;
          token.role = dbUser?.role ?? "CUSTOMER";
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = String(token.id);
        session.user.role = (token.role as Role) ?? "CUSTOMER";
        if (token.email) session.user.email = String(token.email);
        if (token.name) session.user.name = String(token.name);
      }
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
      if (adminEmail && user.email?.toLowerCase() === adminEmail) {
        await prisma.user.update({
          where: { id: user.id },
          data: { role: "ADMIN" },
        });
      }
    },
  },
});
