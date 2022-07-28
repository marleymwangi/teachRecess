import { useEffect } from "react";
import Image from "next/image";
import Router from "next/router";
//custom packages
import {
  getProviders,
  signIn as SignInProvider,
  useSession,
} from "next-auth/react";
import { motion } from "framer-motion";

const contVar = {
  open: {
    opacity: 1,
    transition: {
      delay: 1,
      staggerChildren: 0.35,
      when: "beforeChildren",
    },
  },
};

const childVar = {
  closed: {
    y: -10,
    scale: 0.95,
    opacity: 0,
  },
  open: {
    y: 0,
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.45,
    },
  },
};


export default function SignIn({ providers }) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "loading") {
      //auth is initialized and there is no user
      if (session) {
        // redirect
        Router.replace("/");
      }
    }
  }, [status, session]);

  return (
    <div className="signIn-page">
      <motion.div variants={contVar} initial="closed" animate="open" className="flex flex-col w-full h-full justify-start items-center">
        <motion.div variants={childVar} className="h-52 w-52 ring-4 ring-sky-600 rounded-full mt-10 overflow-hidden relative">
          <Image
            alt="logo"
            layout="fill"
            placeholder="blur"
            src="/assets/logo.webp"
            blurDataURL="/assets/logosm.webp"
          />
        </motion.div>
        {providers &&
          Object.values(providers).map((provider) => (
            <motion.div variants={childVar} key={provider.name}>
              <button
                onClick={() =>
                  SignInProvider(provider.id, { callbackUrl: "/" })
                }
              >
                Sign in with {provider.name}
              </button>
            </motion.div>
          ))}
      </motion.div>
    </div>
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