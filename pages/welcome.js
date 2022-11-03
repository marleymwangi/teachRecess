import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
//custom
import CarouselWelcome from "../components/carousel/Welcome";

export default function Welcome() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(()=>{
    if(session) router.push("/")
  },[session])
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-100 via-sky-100 to-sky-100 pt-20">
      <CarouselWelcome/>
    </main>
  );
}
