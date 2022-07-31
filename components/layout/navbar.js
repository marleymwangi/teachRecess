import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";

import ImageLoader from "../elements/imageLoader";
import { useData } from "../../context/dataContext";
import Title from "../elements/title";
//custom
const BiLeftArrow = dynamic(
  async () => (await import("react-icons/bi")).BiLeftArrow
);
const FaRegUserCircle = dynamic(
  async () => (await import("react-icons/bi")).FaRegUserCircle
);

const contVar = {
  open: {
    transition: {
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

export default function Navbar() {
  const { data: session, status } = useSession();
  const { selChatPart } = useData();
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.back();
  };

  if (router.pathname.indexOf("/auth/") === 0) {
    return (
      <motion.nav
        variants={contVar}
        initial="closed"
        animate="open"
        className="text-gray-900 min-w-full h-20 pt-6"
      >
        <div className="flex flex-col items-center">
          <motion.h1
            variants={childVar}
            className="flex-shrink-0 flex items-center font-extrabold text-4xl
              transition-all duration-200 ease-in-out mb-0.5"
          >
            RECESS
          </motion.h1>
          <motion.span
            variants={childVar}
            className="flex-shrink-0 text-primary flex items-center font-semibold text-lg
              transition-all duration-200 ease-in-out mb-0.5"
          >
            School made easy
          </motion.span>
        </div>
      </motion.nav>
    );
  } else if (router.pathname.indexOf("/chats/") === 0) {
    return (
      <motion.nav
        variants={contVar}
        initial="closed"
        animate="open"
        className="flex justify-around items-center text-gray-900 min-w-full h-20 pt-6"
      >
        <motion.button
          variants={childVar}
          className="btn btn-ghost btn-circle"
          onClick={handleClick}
        >
          <BiLeftArrow size="1.5em" />
        </motion.button>
        <motion.div variants={childVar} className="flex items-center">
          <motion.span variants={childVar} className="uppercase font-medium">
            <Title title={router.pathname.slice(7)} light />
          </motion.span>
        </motion.div>
        <motion.div variants={childVar} className="dropdown dropdown-end">
          <label tabIndex="0" className="btn btn-circle btn-ghost">
            {session?.user ? (
              <div className="avatar relative">
                <div className="w-9 rounded-full">
                  <ImageLoader
                    src={session.user.image}
                    fallbackSrc="/assets/person.webp"
                  />
                </div>
              </div>
            ) : (
              <button
                className="btn btn-ghost btn-circle"
                onClick={handleClick}
              >
                <FaRegUserCircle size="2em" />
              </button>
            )}
          </label>

          <ul
            tabIndex="0"
            className="dropdown-content menu p-2 shadow text-white font-semibold bg-sky-600 rounded-box w-52"
            onClick={signOut}
          >
            <li>
              <a>Sign Out</a>
            </li>
          </ul>
        </motion.div>
      </motion.nav>
    );
  } else if (router.pathname.indexOf("/attendance/") === 0) {
    return (
      <motion.nav
        variants={contVar}
        initial="closed"
        animate="open"
        className="flex justify-around items-center text-gray-900 min-w-full h-20 pt-6"
      >
        <motion.button
          variants={childVar}
          className="btn btn-ghost btn-circle"
          onClick={handleClick}
        >
          <BiLeftArrow size="1.5em" />
        </motion.button>
        <motion.div variants={childVar} className="flex items-center">
          <motion.span variants={childVar} className="uppercase font-medium">
            <Title title={router.pathname.slice(12)} light />
          </motion.span>
        </motion.div>
        <motion.div variants={childVar} className="dropdown dropdown-end">
          <label tabIndex="0" className="btn btn-circle btn-ghost">
            {session?.user ? (
              <div className="avatar relative">
                <div className="w-9 rounded-full">
                  <ImageLoader
                    src={session.user.image}
                    fallbackSrc="/assets/person.webp"
                  />
                </div>
              </div>
            ) : (
              <button
                className="btn btn-ghost btn-circle"
                onClick={handleClick}
              >
                <FaRegUserCircle size="2em" />
              </button>
            )}
          </label>
          <ul
            tabIndex="0"
            className="dropdown-content menu p-2 shadow text-white font-semibold bg-sky-600 rounded-box w-52"
            onClick={signOut}
          >
            <li>
              <a>Sign Out</a>
            </li>
          </ul>
        </motion.div>
      </motion.nav>
    );
  } else {
    return (
      <motion.nav
        variants={contVar}
        initial="closed"
        animate="open"
        className="flex justify-around items-center text-gray-900 min-w-full h-20 pt-6"
      >
        <motion.button
          variants={childVar}
          className="btn btn-ghost btn-circle"
          onClick={handleClick}
        >
          <BiLeftArrow size="1.5em" />
        </motion.button>
        <motion.span variants={childVar} className="uppercase font-medium">
          {router.pathname === "/" ? (
            <Title title="home" />
          ) : (
            <Title title={router.pathname.slice(1)} />
          )}
        </motion.span>
        <motion.div variants={childVar} className="dropdown dropdown-end">
          <label tabIndex="0" className="btn btn-circle btn-ghost">
            {session?.user ? (
              <div className="avatar relative">
                <div className="w-9 rounded-full">
                  <ImageLoader
                    src={session.user.image}
                    fallbackSrc="/assets/person.webp"
                  />
                </div>
              </div>
            ) : (
              <button
                className="btn btn-ghost btn-circle"
                onClick={handleClick}
              >
                <FaRegUserCircle size="2em" />
              </button>
            )}
          </label>

          <ul
            tabIndex="0"
            className="dropdown-content menu p-2 shadow font-semibold text-white bg-sky-600 rounded-box w-52"
            onClick={signOut}
          >
            <li>
              <a>Sign Out</a>
            </li>
          </ul>
        </motion.div>
      </motion.nav>
    );
  }
}
