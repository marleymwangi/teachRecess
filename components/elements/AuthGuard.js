import Router from "next/router";
import { useEffect } from "react";
import { useAuth } from "../../context/authContext";

export function AuthGuard({ children }) {
  const { user, status } = useAuth();

  useEffect(() => {
    if (status === "unauthenticated") Router.push("/auth/signin");
  }, [status]);

  /* show loading indicator while the auth provider is still initializing */
  if (status === "loading") {
    return (
      <h1 className="text-center flex justify-center items-center min-h-[95vh] w-full text-xl font-extrabold">
        ... Loading
      </h1>
    );
  }

  // if auth initialized with a valid user show protected page
  if (status !== "loading" && user) {
    return <>{children}</>;
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return null;
}
