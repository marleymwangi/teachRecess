import { getSession, useSession } from "next-auth/react";
import Router from "next/router";
import { useEffect } from "react";

export function AuthGuard({ children }) {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () => {
      Router.push("/auth/signin");
    },
  });

  /* show loading indicator while the auth provider is still initializing */
  if (status === "loading") {
    return (
      <h1 className="text-center mt-20 font-semibold text-xl text-white">
        ... Loading
      </h1>
    );
  }

  // if auth initialized with a valid user show protected page
  if (status !== "loading" && session) {
    return <>{children}</>;
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return null;
}
