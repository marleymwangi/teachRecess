import { useSession } from "next-auth/react";
import Router from "next/router";

export function AuthGuard({ children }) {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () => {
      Router.push("/welcome");
    },
  });

  /* show loading indicator while the auth provider is still initializing */
  if (status === "loading") {
    return (
      <h1 className="text-center flex justify-center items-center h-[80vh] w-full text-xl text-gray-400 font-extrabold">
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
