import { useEffect } from "react";
import Router from "next/router";
//hooks
import { useAuth } from "../context/authContext";
//custom
import CarouselWelcome from "../components/carousel/Welcome";

export default function Welcome() {
  const { user } = useAuth();

  useEffect(() => {
    if (user) Router.push("/");
  }, [user]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-100 via-sky-100 to-sky-100 pt-20">
      <CarouselWelcome />
    </main>
  );
}
