import Link from "next/link";
import { useState, useEffect } from "react";
//custom package
import {
  endOfWeek,
  format,
  startOfWeek,
  startOfToday,
  isWeekend,
  nextMonday,
} from "date-fns";
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
  let today = startOfToday();
  let start, end;
  if (isWeekend(today)) {
    let tmp = nextMonday(today);
    start = startOfWeek(tmp, { weekStartsOn: 1 });
    end = endOfWeek(tmp, { weekStartsOn: 1 });
  } else {
    start = startOfWeek(today, { weekStartsOn: 1 });
    end = endOfWeek(today, { weekStartsOn: 1 });
  }

  const { teacher } = useData();
  const [loading, setLoading] = useState(true);
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    //listen for changes and update kids information

    if (teacher?.schoolId && teacher?.classId) {
      setLoading(true);
      const q = query(
        collection(
          db,
          "schools",
          teacher.schoolId,
          "classes",
          teacher.classId,
          "reminders"
        ),
        where("timestamp", ">=", start),
        where("timestamp", "<=", end)
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
        setLoading(false);
      });
    }
  }, [teacher]);

  return (
    <section className="reminder__sec">
      <Title title="Reminders" />
      <motion.p variants={riseVar} className="text-gray-400 text-sm ">
        This area show reminders from{" "}
        <span>{format(start, "MMM dd, yyy")}</span> to{" "}
        <span>{format(end, "MMM dd, yyy")}</span>
      </motion.p>
      <motion.div
        variants={contVar}
        initial="hide"
        animate="show"
        className="reminders no-scroll"
      >
        {reminders?.length > 0 ? (
        <motion.div variants={contVar} className="reminders no-scroll">
          {reminders.map((e, i) => (
            <ReminderComp key={i} index={i} data={e} />
          ))}
        </motion.div>
      ) : (
        <motion.div
          className="rounded-3xl h-30 w-full p-6 mt-6"
        >
          {loading ? (
            <p className="text-center text-gray-400 text-lg font-extrabold py-10">
              Loading
            </p>
          ) : (
            <p className="text-center text-lg font-semibold text-gray-400 py-10">
              No Reminders for the
              <br /> current week
            </p>
          )}
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
