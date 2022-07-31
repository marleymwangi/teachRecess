import Link from "next/link";
import { useState, useEffect } from "react";
//custom package
import {
  collection,
  orderBy,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { motion } from "framer-motion";
//custom
import { db } from "../../firebase";
import Title from "../elements/title";
import ReminderComp from "./reminderComp";
import { useData } from "../../context/dataContext";

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

export default function Reminders() {
  const { teacher } = useData();
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    //listen for changes and update kids information

    if (teacher?.schoolId && teacher?.classId) {
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

        setReminders(tmp);
      });
    }
  }, [teacher]);

  return (
    <section className="reminder__sec">
      <Title title="Reminders" />
      <motion.p variants={riseVar} className="text-gray-400 text-sm ">
        This area show reminders
      </motion.p>
      <motion.div
        variants={contVar}
        initial="hide"
        animate="show"
        className="reminders no-scroll"
      >
        {reminders?.length > 0 &&
          reminders
            .slice(0, 3)
            .map((e, i) => <ReminderComp key={i} data={e} home/>)}
        {reminders?.length < 1 && (
          <motion.div
            variants={riseVar}
            className="rounded-3xl bg-white h-30 w-full p-6"
          >
            <p className="text-center text-lg font-semibold text-gray-400">
              No reminders for the
              <br /> current week
            </p>
          </motion.div>
        )}
      </motion.div>
      <div className="flex justify-end">
        <Link href="/reminders">
          <button className="btn btn-ghost">See All</button>
        </Link>
      </div>
    </section>
  );
}
