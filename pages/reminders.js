import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
//custom packages
import { format, isSameDay, startOfToday } from "date-fns";
import {
  doc,
  query,
  collection,
  where,
  orderBy,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
import { getSession, useSession } from "next-auth/react";
//custom
import { useData } from "../context/dataContext";
import { db } from "../firebase";
import Title from "../components/elements/title";
import ReminderComp from "../components/reminders/reminderComp";
//dynamic
const BiMessageAltAdd = dynamic(
  async () => (await import("react-icons/bi")).BiMessageAltAdd
);

const contVar = {
  show: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.5,
    },
  },
};

const riseVar = {
  hide: {
    opacity: 0,
    y: 10,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Reminders() {
  const { data: session, status } = useSession();
  const { teacher } = useData();

  const [loadingClass, setLoadingClass] = useState(false);
  const [loadingSch, setLoadingSch] = useState(false);

  const [classReminders, setClassReminders] = useState([]);
  const [schoolReminders, setSchoolReminders] = useState([]);

  useEffect(() => {
    //listen for changes and update kids information

    if (teacher?.schoolId && teacher?.classId) {
      setLoadingClass(true);
      const q = query(
        collection(
          db,
          "schools",
          teacher.schoolId,
          "classes",
          teacher.classId,
          "reminders"
        )
      );

      return onSnapshot(q, (snapshot) => {
        const tmp = [];
        snapshot.forEach((doc) => {
          tmp.push({
            ...doc.data(),
            id: doc.id,
            timestamp: doc.data().timestamp.toDate(),
          });
        });
        setClassReminders(tmp);
        setLoadingClass(false);
      });
    }
  }, [teacher]);

  useEffect(() => {
    //listen for changes and update kids information

    if (teacher?.schoolId) {
      setLoadingSch(true);
      const q = query(collection(db, "schools", teacher.schoolId, "reminders"));

      return onSnapshot(q, (snapshot) => {
        const tmp = [];
        snapshot.forEach((doc) => {
          tmp.push({
            ...doc.data(),
            id: doc.id,
            timestamp: doc.data().timestamp.toDate(),
          });
        });

        setSchoolReminders(tmp);
        setLoadingSch(false);
      });
    }
  }, [teacher]);

  return (
    <motion.div
      variants={contVar}
      initial="hide"
      animate="show"
      className="reminders__page"
    >
      <Title title="Class Events" />
      {classReminders?.length > 0 ? (
        <motion.div
          variants={contVar}
          initial="hide"
          animate="show"
          className="reminders no-scroll"
        >
          {classReminders.map((e, i) => (
            <ReminderComp key={i} data={e} />
          ))}
        </motion.div>
      ) : (
        <motion.div
          variants={riseVar}
          className="rounded-3xl bg-white h-30 w-full p-6 mt-6"
        >
          {loadingClass ? (
            <p className="text-center text-gray-400 text-lg font-extrabold py-10">Loading</p>
          ) : (
            <p className="text-center text-lg font-semibold text-gray-400">
              No Reminders for the
              <br /> current week
            </p>
          )}
        </motion.div>
      )}
      <Title title="School Events" />
      {schoolReminders?.length > 0 ? (
        <motion.div
          variants={contVar}
          initial="hide"
          animate="show"
          className="reminders no-scroll"
        >
          {schoolReminders.map((e, i) => (
            <ReminderComp key={i} data={e} />
          ))}
        </motion.div>
      ) : (
        <motion.div
          variants={riseVar}
          className="rounded-3xl bg-white h-30 w-full p-6 mt-6"
        >
          {loadingSch ? (
            <p className="text-center text-gray-400 text-lg font-extrabold py-10">Loading</p>
          ) : (
            <p className="text-center text-lg font-semibold text-gray-400">
              No Reminders for the
              <br /> current week
            </p>
          )}
        </motion.div>
      )}
      <motion.label
        variants={riseVar}
        htmlFor="reminder_modal"
        className=" modal-button btn btn-circle btn-primary btn-md fixed right-5 bottom-28"
      >
        <BiMessageAltAdd size="2rem" />
      </motion.label>
    </motion.div>
  );
}
