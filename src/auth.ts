import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";
import { isMockAuthEnabled } from "@/lib/mock-data";
import { getAdminEmail, roleForEmail } from "@/lib/admin";
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

/** Demo guest only — never grants ADMIN (admin is email-gated). */
const demoGuest = {
  id: "demo-guest",
  email: "guest@lumenaimusic.com",
  name: "Guest",
};

async function resolveDemoGuest() {
  const role = roleForEmail(demoGuest.email); // always CUSTOMER
  try {
    const user = await prisma.user.upsert({
      where: { email: demoGuest.email },
      update: { name: demoGuest.name, role },
      create: {
        email: demoGuest.email,
        name: demoGuest.name,
        role,
      },
    });
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: roleForEmail(user.email),
    };
  } catch (error) {
    console.warn(
      "[auth] Demo guest DB upsert failed — using offline demo session",
      error,
    );
    return {
      id: demoGuest.id,
      email: demoGuest.email,
      name: demoGuest.name,
      role,
    };
  }
}

async function syncUserRole(userId: string, email: string | null | undefined) {
  const role = roleForEmail(email);
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { role },
    });
  } catch (error) {
    console.warn("[auth] Could not sync user role", error);
  }
  return role;
}

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
        // Only guest demo remains — admin is email-only
        if (credentials?.account !== "customer") return null;
        return resolveDemoGuest();
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user?.id) {
        token.id = user.id;
        if (user.email) token.email = user.email;
        if (user.name) token.name = user.name;
      }

      const email = (token.email as string | undefined) || user?.email;
      // Re-assert on every token issue/refresh so DB can't keep a stolen ADMIN role
      token.role = roleForEmail(email);

      if (user?.id && email) {
        await syncUserRole(user.id, email);
      } else if (trigger === "update" && token.id && email) {
        await syncUserRole(String(token.id), email);
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = String(token.id);
        session.user.role = roleForEmail(
          (token.email as string | undefined) || session.user.email,
        );
        if (token.email) session.user.email = String(token.email);
        if (token.name) session.user.name = String(token.name);
      }
      return session;
    },
    async signIn({ user }) {
      if (user.id && user.email) {
        await syncUserRole(user.id, user.email);
      }
      return true;
    },
  },
  events: {
    async createUser({ user }) {
      if (user.id) {
        await syncUserRole(user.id, user.email);
        if (roleForEmail(user.email) === "ADMIN") {
          console.log(
            `[auth] Admin granted to ${getAdminEmail()} on account create`,
          );
        }
      }
    },
  },
});
