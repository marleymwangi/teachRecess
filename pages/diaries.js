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
import Title from "../components/elements/title";
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
      staggerChildren: 0.5,
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
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.9,
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
    <div className="diaries__page">
      <div className="mb-6">
        <p className="text-gray-500 font-medium text-sm mt-2 md:ml-16">
          Clicking on a date will show when the Assignment was given and when
          its due.
          <br /> Top number shows assignments given while the number at the
          bottom show assignments due.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row items-center">
        <DiaryCalendar
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          diaries={diaries}
        />
        <section className="w-full backdrop-blur pt-6 rounded-3xl overflow-hidden">
          <h2 className="font-semibold text-gray-900">
            Diaries for{" "}
            <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
              {format(selectedDay, "MMM dd, yyy")}
            </time>
          </h2>
          <p className="text-sm text-gray-500">
            <br /> Check more for additional information
          </p>
          <motion.div
            variants={contVar}
            initial="hide"
            animate="show"
            exit="exit"
            className="diaries"
          >
            <AnimatePresence>
              {selectedDayDiaries.length > 0 ? (
                selectedDayDiaries.map((diary, i) => (
                  <motion.div variants={riseVar} key={`${diary?.id}`}>
                    <Entry
                      refData={{
                        school: teacher?.schoolId,
                        class: teacher?.classId,
                      }}
                      data={diary}
                    />
                  </motion.div>
                ))
              ) : (
                <p className="p-6">No diaries for today.</p>
              )}
            </AnimatePresence>
          </motion.div>
        </section>
      </div>
      <label
        htmlFor="diary_modal"
        className=" modal-button btn btn-circle btn-primary btn-md fixed right-5 bottom-28"
      >
        <BiMessageAltAdd size="2rem" />
      </label>
    </div>
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
