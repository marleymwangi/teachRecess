import dynamic from "next/dynamic";
import Image from "next/image";
import {
  getProviders,
  signIn as SignInProvider,
  useSession,
} from "next-auth/react";
import { motion } from "framer-motion";
//dynamic
const FcGoogle = dynamic(async () => (await import("react-icons/fc")).FcGoogle);
const BsApple = dynamic(async () => (await import("react-icons/bs")).BsApple);

export default function SignIn({ providers }) {
  return (
    <main className="relative h-screen w-screen bg-cyan-100 py-20 px-6 grid place-content-end grid-cols-1">
      <section className="mb-5">
        <div className="relative h-40 w-4/5 mx-auto">
          <Image
            src="/images/recess.png"
            layout="fill"
            objectFit="contain"
            objectPosition="center"
          />
        </div>
      </section>
      <p className="font-poppins font-semibold text-4xl text-center">
        Welcome to
      </p>
      <p className="font-poppins font-semibold text-6xl text-center mb-20">
        Recess
      </p>
      <p className="font-poppins font-semibold text-lg"></p>
      <section className="w-full max-w-xs mx-auto grid gap-6">
        {providers &&
          Object.values(providers).map((provider) => (
            <button
              key={provider.name}
              onClick={() => SignInProvider(provider.id, { callbackUrl: "/" })}
              className="btn btn-lg gap-3 rounded-full bg-white border-white active:bg-gray-100 active:border-gray-50 hover:bg-gray-50 hover:border-gray-50"
            >
              <FcGoogle size="2em" />{" "}
              <span className="text-gray-400">
                Sign in with {provider.name}
              </span>
            </button>
          ))}

        <button className="btn btn-lg gap-3 rounded-full bg-white border-white active:bg-gray-100 active:border-gray-50 hover:bg-gray-50 hover:border-gray-50">
          <BsApple className="text-gray-500" size="2em" />{" "}
          <span className="text-gray-400">Sign in with Apple</span>
        </button>
      </section>
    </main>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
