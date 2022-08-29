import Link from "next/link";
import { useEffect, useState } from "react";
//custom packages
import {
  format,
  endOfWeek,
  isWeekend,
  nextMonday,
  startOfWeek,
  startOfToday,
  eachDayOfInterval,
} from "date-fns";
import { motion } from "framer-motion";
import { Listbox } from "@headlessui/react";
import { collection, onSnapshot, query } from "firebase/firestore";
//custom
import { db } from "../../firebase";
import Title from "../elements/title";
import { useData } from "../../context/dataContext";
import Entry from "./entry";
import ListBox from "../listBox";

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

const subjects = [
  { name: "All" },
  { name: "Mathematics" },
  { name: "English" },
  { name: "Kiswahili" },
  { name: "Science" },
  { name: "Religious Education" },
];

export default function DiariesSection() {
  const { teacher } = useData();
  const [filter, setFilter] = useState(subjects[0]);
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
  const [diaries, setDiaries] = useState([]);

  let days = eachDayOfInterval({
    start,
    end,
  });

  useEffect(() => {
    //console.log("filter ", filter);
  }, [filter]);

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

  let filtered =
    filter?.name === "All"
      ? diaries
      : diaries.filter((diary) => diary.subject === filter.name);

  return (
    <section className="diaries__sec px-8">
      <Title title="Weeks Assignments" />
      <motion.p variants={riseVar} className="text-gray-400 text-sm ">
        This area show Diary Entries from{" "}
        <span>{format(start, "MMM dd, yyy")}</span> to{" "}
        <span>{format(end, "MMM dd, yyy")}</span>
      </motion.p>
      <ListBox list={subjects} value={filter} setFunc={setFilter} />
      <motion.div
        variants={contVar}
        initial="hide"
        animate="show"
        className="diaries"
      >
        {filtered.length > 0 ? (
          filtered.map((diary, i) => (
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
