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
import { db } from "../firebase";
import { useData } from "../context/dataContext";
import Entry from "../components/diaries/entry";
import DiaryCalendar from "../components/elements/calendar/diaryCalendar";
//dynamic
const BiMessageAltAdd = dynamic(
  async () => (await import("react-icons/bi")).BiMessageAltAdd
);

const contVar = {
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
      duration: 0.5,
    },
  },
};

export default function Diaries({ diariesInit }) {
  const { data: session, status } = useSession();
  const { teacher, setSelDiary } = useData();
  let today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);

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
        if (tmp.length > 0) {
          setDiaries(tmp);
        }
      });
    }
  }, [teacher]);

  useEffect(() => {
    let tmp = JSON.parse(diariesInit);
    tmp.forEach((d) => {
      d.timestamp = new Date(d.timestamp);
      d.due = new Date(d.due);
    });

    setDiaries(tmp);
  }, [diariesInit]);

  let selectedDayDiaries = diaries?.filter(
    (diary) =>
      isSameDay(diary.timestamp, selectedDay) ||
      isSameDay(diary.due, selectedDay)
  );

  return (
    <motion.div
      variants={contVar}
      initial="hide"
      animate="show"
      className="diaries__page"
    >
      <motion.div variants={riseVar} className="mb-6">
        <p className="text-gray-500 font-medium text-sm mt-2 md:ml-16">
          Clicking on a date will show when the Assignment was given and when
          its due.
          <br /> Top number shows assignments given while the number at the
          bottom show assignments due.
        </p>
      </motion.div>
      <motion.div
        variants={contVar}
        className="flex flex-col lg:flex-row items-center"
      >
        <DiaryCalendar
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          diaries={diaries}
        />
        <section className="w-full backdrop-blur pt-6 rounded-3xl overflow-hidden">
          <motion.h2
            variants={riseVar}
            className="font-bold text-gray-400 mt-6 mb-3"
          >
            Diary Entries for{" "}
            <time
              className="text-gray-900 font-extrabold"
              dateTime={format(selectedDay, "yyyy-MM-dd")}
            >
              {format(selectedDay, "MMM dd, yyy")}
            </time>
          </motion.h2>
          <motion.p
            variants={riseVar}
            className="text-sm font-bold text-gray-400"
          >
            Check more for additional information
          </motion.p>
          <motion.div variants={contVar} className="diaries">
            {selectedDayDiaries.length > 0 ? (
              selectedDayDiaries.map((diary, i) => (
                <Entry data={diary} key={`${diary?.id}${diary?.student?.id}`} />
              ))
            ) : (
              <motion.p
                variants={riseVar}
                className="p-6 font-bold text-center text-gray-600"
              >
                No diaries for today.
              </motion.p>
            )}
          </motion.div>
        </section>
      </motion.div>
      <motion.label
        variants={riseVar}
        htmlFor="diary_modal"
        className=" modal-button btn btn-circle btn-primary btn-md fixed right-5 bottom-28"
      >
        <BiMessageAltAdd size="2rem" />
      </motion.label>
    </motion.div>
  );
}

export const getServerSideProps = async (context) => {
  try {
    const session = await getSession(context);

    const docRef = doc(db, "teachers", session?.user?.id || "");
    const docSnap = await getDoc(docRef);

    let teacher = null;
    let tmp = [];
    if (docSnap.exists()) {
      teacher = docSnap.data();
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

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        tmp.push({
          ...doc.data(),
          id: doc.id,
          timestamp: doc.data().timestamp.toDate(),
          due: doc.data().due.toDate(),
        });
      });
    }

    return {
      props: {
        diariesInit: JSON.stringify(tmp),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        diariesInit: JSON.stringify([]),
      },
    };
  }
};
