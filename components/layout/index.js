import Head from "next/head";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
//custom
const Navbar = dynamic(() => import("./navbar"));
const Banner = dynamic(() => import("./banner"));
const BottomNav = dynamic(() => import("./bottomNav"));
const ContactsModal = dynamic(() => import("../modals/contactsModal"));
const WorkModal = dynamic(() => import("../modals/workModal"));
const DiaryEntryModal = dynamic(() => import("../modals/DiaryEntryModal"));
const ReminderEntryModal = dynamic(() => import("../modals/ReminderEntryModal"));

const variants = {
  hide: { opacity: 1 },
  enter: { opacity: 1 },
};

export default function Layout({ children, path }) {
  //console.log(router.route)
  useEffect(() => {
    Loaded();
  }, []);

  function Loaded() {
    var element = document.getElementById("loader");
    if (element) {
      element.classList.add("hidden");
    }
  }

  return (
    <>
      <Head>
        <title>Recess. School made easy.</title>
      </Head>
      <Banner />
      <Navbar />
      <ContactsModal />
      <WorkModal />
      <DiaryEntryModal />
      <ReminderEntryModal />
      <AnimatePresence
        exitBeforeEnter
        initial="hide"
        //onExitComplete={() => console.log("done")}
      >
        <motion.main
          key={path}
          initial="hide"
          animate="enter"
          exit="hide"
          variants={variants}
          transition={{ type: "easeInOut", duration: 0.25 }}
          className="page-content"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <BottomNav />
    </>
  );
}
