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

export default function Reminders({
  teacherInit,
  classRemindersInit,
  schoolRemindersInit,
}) {
  const { data: session, status } = useSession();
  let today = startOfToday();

  const [teacher, setTeacher] = useState(teacherInit);
  const [classReminders, setClassReminders] = useState([]);
  const [schoolReminders, setSchoolReminders] = useState([]);

  useEffect(() => {
    //read firebase teacher document

    if (status !== "loading" && session?.user?.id) {
      const docRef = doc(db, "teachers", session.user.id);

      return onSnapshot(docRef, (doc) => {
        setTeacher(doc.data());
      });
    }
  }, [status, session]);

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
        if (tmp.length > 0) {
          setClassReminders(tmp);
        }
      });
    }
  }, [teacher]);

  useEffect(() => {
    //listen for changes and update kids information

    if (teacher?.schoolId) {
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
        if (tmp.length > 0) {
          setSchoolReminders(tmp);
        }
      });
    }
  }, [teacher]);

  useEffect(() => {
    let tmp = JSON.parse(classRemindersInit);
    tmp.forEach((d) => {
      d.timestamp = new Date(d.timestamp);
    });

    setClassReminders(tmp);
  }, [classRemindersInit]);

  useEffect(() => {
    let tmp = JSON.parse(schoolRemindersInit);
    tmp.forEach((d) => {
      d.timestamp = new Date(d.timestamp);
    });

    setSchoolReminders(tmp);
  }, [schoolRemindersInit]);

  return (
    <motion.div
      variants={contVar}
      initial="hide"
      animate="show"
      className="diaries__page"
    >
      <motion.div variants={contVar} className="my-6">
        <Title title="Class Events" />
        {classReminders?.length > 0 &&
          classReminders.map((r, i) => (
            <div className="my-3" key={i}>
              <ReminderComp data={r} />
            </div>
          ))}
      </motion.div>
      <motion.div variants={contVar} className="my-6">
        <Title title="School Events" />
        {schoolReminders?.length > 0 &&
          schoolReminders.map((r, i) => (
            <div className="my-3" key={i}>
              <ReminderComp data={r} />
            </div>
          ))}
      </motion.div>
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

export const getServerSideProps = async (context) => {
  try {
    const session = await getSession(context);

    const docRef = doc(db, "teachers", session?.user?.id || "");
    const docSnap = await getDoc(docRef);

    let teacher = null;
    let classTmp = [];
    let schoolTmp = [];
    if (docSnap.exists()) {
      teacher = docSnap.data();
      const sq = query(
        collection(db, "schools", teacher.schoolId, "reminders")
      );

      const cq = query(
        collection(
          db,
          "schools",
          teacher.schoolId,
          "classes",
          teacher.classId,
          "reminders"
        )
      );

      const schoolQuerySnapshot = await getDocs(sq);
      const classQuerySnapshot = await getDocs(cq);

      schoolQuerySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        schoolTmp.push({
          ...doc.data(),
          id: doc.id,
          timestamp: doc.data().timestamp.toDate(),
        });
      });

      classQuerySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        classTmp.push({
          ...doc.data(),
          id: doc.id,
          timestamp: doc.data().timestamp.toDate(),
        });
      });
    }

    return {
      props: {
        teacherInit: JSON.stringify(teacher),
        classRemindersInit: JSON.stringify(classTmp),
        schoolRemindersInit: JSON.stringify(schoolTmp),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        teacherInit: JSON.stringify([]),
        classRemindersInit: JSON.stringify([]),
        schoolRemindersInit: JSON.stringify([]),
      },
    };
  }
};
