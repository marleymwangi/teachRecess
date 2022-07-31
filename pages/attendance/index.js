import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
//custom packages
import { format, startOfToday } from "date-fns";
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
import { db } from "../../firebase";
import { useData } from "../../context/dataContext";
import AttendanceCalender from "../../components/elements/calendar/attendanceCalendar";
import Kid from "../../components/kids/kid";
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

export default function Diaries({ attendanceInit }) {
  const { data: session, status } = useSession();
  const { teacher, setSelDiary } = useData();
  let today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);

  const [attendancees, setAttendancees] = useState([]);

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
          "attendance"
        )
      );

      return onSnapshot(q, (snapshot) => {
        const tmp = [];
        snapshot.forEach((doc) => {
          var timestamp = Date.parse(doc.id);
          var dateObject = new Date(timestamp);

          return tmp.push({
            ...doc.data(),
            day: dateObject,
          });
        });
        if (tmp.length > 0) {
          setAttendancees(tmp);
        }
      });
    }
  }, [teacher]);

  return (
    <div className="attendance__page">
      <div className="mb-6">
        <p className="text-gray-500 font-medium text-sm mt-2 md:ml-16">
          Clicking on a date will show when the Assignment was given and when
          its due.
          <br /> Top number shows assignments given while the number at the
          bottom show assignments due.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row items-center">
        <AttendanceCalender
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          attendancees={attendancees}
        />
        <h2 className="font-medium text-gray-500 mt-6 mb-3">
          Attendance Summary for{" "}
          <time
            className="text-gray-900 font-extrabold"
            dateTime={format(selectedDay, "yyyy-MM-dd")}
          >
            {format(selectedDay, "MMM dd, yyy")}
          </time>
        </h2>
        <section className="w-full overflow-hidden">
          <div className="bg-white rounded-2xl w-full p-4 font-bold">
            <div className="flex justify-between">
              <h5 className="text-gray-400">Total Students</h5>
              <h5 className="text-gray-900">30</h5>
            </div>
            <div className="grid grid-cols-1 xs:gap-6 xs:grid-cols-2">
              <div className="flex justify-between">
                <h5 className="text-gray-400">Present Students</h5>
                <h5 className="text-success">30</h5>
              </div>
              <div className="flex justify-between">
                <h5 className="text-gray-400">Absent Students</h5>
                <h5 className="text-error">30</h5>
              </div>
            </div>
          </div>
          <h2 className="font-extrabold text-center text-gray-500 mt-6 mb-3">
            Students Absent
          </h2>
          <motion.div
            variants={contVar}
            initial="hide"
            animate="show"
            exit="exit"
            className="diaries"
          >
            <AnimatePresence>
              {attendancees.length > 0 ? (
                attendancees.map((diary, i) => (
                  <motion.div variants={riseVar} key={`${i}`}>
                    <Kid id={diary?.id} />
                  </motion.div>
                ))
              ) : (
                <p className="p-6">No diaries for today.</p>
              )}
            </AnimatePresence>
          </motion.div>
          <div className="flex justify-end">
            <Link href="/attendance/students">
              <button className="btn btn-ghost">See All</button>
            </Link>
          </div>
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
          "attendance"
        )
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        var timestamp = Date.parse(doc.id);
        var dateObject = new Date(timestamp);
        return tmp.push({
          ...doc.data(),
          day: dateObject,
        });
      });
    }

    return {
      props: {
        attendanceInit: JSON.stringify(tmp),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        attendanceInit: JSON.stringify([]),
      },
    };
  }
};
