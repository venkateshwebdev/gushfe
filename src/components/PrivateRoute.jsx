// components/PrivateRoute.js
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getSession, useSession } from "next-auth/react";

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "loading") return;

    if (!session?.user) {
      // Redirect to login page if not authenticated
      router.push("/auth");
    }
  }, [session, router, status]);

  // Render the children components if authenticated or the pahtname is login/ signup
  return session?.user || pathname === "/auth" ? children : null;
};

export default PrivateRoute;
