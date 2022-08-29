import { useEffect, useState } from "react";
//custom packages
import { db } from "../firebase";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { getSession, useSession } from "next-auth/react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
//custom
import ImageLoader from "../components/elements/imageLoader";
import Diaries from "../components/diaries";
import Reminders from "../components/reminders";

import { AuthGuard } from "../components/elements/authGuard";
import Classes from "../components/classes";

const contVar = {
  hide: {
    opacity: 1,
  },
  show: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
};

const riseVar = {
  hide: {
    opacity: 0,
    y: 10,
    scale: 0.9,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.25,
    },
  },
};

export default function Profile() {
  const { data: session } = useSession();
  const pageControl = useAnimation();
  const [pageRef, pageInView] = useInView();

  //start animation when in view
  useEffect(() => {
    if (pageInView) {
      pageControl.start("show");
    }
  }, [pageControl, pageInView]);


  return (
    <AuthGuard>
      <motion.div
        className="index__page"
        variants={contVar}
        initial="hide"
        ref={pageRef}
        animate={pageControl}
      >
        <motion.div variants={riseVar} className="welcome__tag">
          {session?.user && (
            <div className="user">
              <ImageLoader src={session.user.image} alt="pp" />
            </div>
          )}
          <div>
            <h1 className="wel">Welcome</h1>
            <h1 className="name">{session?.user.name}</h1>
          </div>
        </motion.div>
        <Classes/>
        <Diaries  />
        <Reminders />
      </motion.div>
    </AuthGuard>
  );
}


