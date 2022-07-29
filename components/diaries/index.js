import Link from "next/link";
import { useEffect, useState } from "react";
//custom packages
import { motion } from "framer-motion";
import { format, isSameDay, startOfToday } from "date-fns";
import { collection, onSnapshot, query } from "firebase/firestore";
//custom
import { db } from "../../firebase";
import Title from "../elements/title";
import { useData } from "../../context/dataContext";
import Entry from "./entry";

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

export default function DiariesSection() {
  const { teacher } = useData();
  const [diaries, setDiaries] = useState([]);

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
          "diaries"
        )
      );

      return onSnapshot(q, (snapshot) => {
        const tmp = [];
        snapshot.forEach((doc) => {
          tmp.push({
            ...doc.data(),
            id: doc.id,
            timestamp: doc.data().timestamp.toDate(),
            due: doc.data().due.toDate(),
          });
        });

        setDiaries(tmp);
      });
    }
  }, [teacher]);

  return (
    <section className="diaries px-8">
      <Title title="Todays Assignments" />
      <motion.div
        variants={contVar}
        initial="hide"
        animate="show"
        className="diaries"
      >
        {diaries.length > 0 ? (
          diaries.map((diary, i) => (
            <Entry data={diary} key={`${diary?.id}${diary?.student?.id}`} />
          ))
        ) : (
          <motion.div
            variants={riseVar}
            className="rounded-3xl bg-white h-30 w-full p-6"
          >
            <p className="text-center text-lg font-semibold text-gray-400">
              No Diary entries for the
              <br /> current week
            </p>
          </motion.div>
        )}
      </motion.div>
      <div className="flex justify-end">
        <Link href="/diaries">
          <button className="btn btn-ghost">See All</button>
        </Link>
      </div>
    </section>
  );
}
