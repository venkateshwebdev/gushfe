"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import PrivateRoute from "./PrivateRoute";

export function Providers({ children }) {
  return (
    <SessionProvider>
      <PrivateRoute>{children}</PrivateRoute>
    </SessionProvider>
  );
}
