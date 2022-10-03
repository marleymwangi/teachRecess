import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
//custom
import CarouselWelcome from "../components/carousel/welcome";

export default function Welcome() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(()=>{
    if(session) router.push("/")
  },[session])
  
  return (
    <main className="bg-cyan-100 pt-20 px-6">
      <CarouselWelcome/>
    </main>
  );
}
