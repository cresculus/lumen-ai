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
    email: "admin@lumenaimusic.com",
    name: "Demo Admin",
    role: "ADMIN" as Role,
  },
  customer: {
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
        const demo =
          account === "admin" ? demoUsers.admin : account === "customer" ? demoUsers.customer : null;
        if (!demo) return null;

        const user = await prisma.user.upsert({
          where: { email: demo.email },
          update: { name: demo.name, role: demo.role },
          create: {
            email: demo.email,
            name: demo.name,
            role: demo.role,
          },
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) {
        token.id = user.id;
        token.role = user.role ?? "CUSTOMER";
        if (user.email) token.email = user.email;
        if (user.name) token.name = user.name;
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
