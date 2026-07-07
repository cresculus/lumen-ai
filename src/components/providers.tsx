"use client";

import type { SessionProviderProps } from "next-auth/react";
import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";
import { CartProvider } from "@/components/cart-provider";

const AuthProvider = SessionProvider as React.ComponentType<
  SessionProviderProps & { children?: ReactNode }
>;

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  );
}
