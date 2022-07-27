import { useEffect, useState } from "react";
//custom packages
import { db } from "../firebase";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { getSession, useSession } from "next-auth/react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
//custom
import ImageLoader from "../components/elements/imageLoader";
import Diaries from "../components/diaries";
import Reminders from "../components/reminders";

import { AuthGuard } from "../components/elements/authGuard";

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

export default function Profile({ studentsInit, diariesInit, remindersInit }) {
  const { data: session } = useSession();
  const pageControl = useAnimation();
  const [pageRef, pageInView] = useInView();

  const [students, setStudents] = useState(
    studentsInit ? JSON.parse(studentsInit) : []
  );
  const [diaries, setDiaries] = useState([]);
  const [reminders, setReminders] = useState([]);

  //start animation when in view
  useEffect(() => {
    if (pageInView) {
      pageControl.start("show");
    }
  }, [pageControl, pageInView]);

  useEffect(() => {
    let tmp = JSON.parse(diariesInit);

    tmp.forEach((d) => {
      d.timestamp = new Date(d.timestamp);
      d.due = new Date(d.due);
    });
    setDiaries(tmp);
  }, [diariesInit]);

  useEffect(() => {
    //console.log("remindersInit", remindersInit)
    let tmp = JSON.parse(remindersInit);
    tmp.sort(function(a,b){
      return b.timestamp.localeCompare(a.timestamp);
    })

    tmp.forEach((d) => {
      d.timestamp = new Date(d.timestamp);
    });

    setReminders(tmp);
  }, [remindersInit]);

  useEffect(()=>{
    //console.log("reminders", reminders)
  },[reminders])


  return (
    <AuthGuard>
      <motion.div
        className="index__page"
        variants={contVar}
        initial="hide"
        ref={pageRef}
        animate={pageControl}
      >
        <motion.div variants={riseVar} className="welcome__tag">
          {session?.user && (
            <div className="relative h-10 w-10 mr-2 rounded-full overflow-hidden">
              <ImageLoader src={session.user.image} alt="pp" />
            </div>
          )}
          <div>
            <span>Welcome</span>
            <h4>{session?.user.name}</h4>
          </div>
        </motion.div>
        <Reminders students={students} remindersParam={reminders} />
        <Diaries students={students} diariesParam={diaries} />
      </motion.div>
    </AuthGuard>
  );
}

export const getServerSideProps = async (context) => {
  try {
    const session = await getSession(context);

    const q = query(
      collection(db, "students"),
      where("guardians", "array-contains", session?.user?.id || ""),
      orderBy("name", "desc")
    );

    const querySnapshot = await getDocs(q);
    let studentstmp = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      studentstmp.push({ ...doc.data(), id: doc.id });
    });

    async function getDiaries(student) {
      return new Promise(async (resolve, reject) => {
        try {
          const q = query(collection(db, `students/${student.id}/diaries`));

          const querySnapshot = await getDocs(q);
          let tmp = [];
          querySnapshot.forEach((doc) => {
            tmp.push({
              ...doc.data(),
              student,
              id: doc.id,
              timestamp: doc.data().timestamp.toDate(),
              due: doc.data().due.toDate(),
            });
          });
          if (tmp.length > 0) {
            resolve(tmp);
          }
        } catch (error) {
          console.warn(error);
          reject(error);
        }
      });
    }

    //get diaries
    let promisesD = [];
    studentstmp.forEach((student) => {
      let p = getDiaries(student);
      promisesD.push(p);
    });

    let diariesTmp = await Promise.all(promisesD).then((results) => {
      return results.flat();
    });

    async function getReminders(student) {
      return new Promise(async (resolve, reject) => {
        try {
          const q = query(
            collection(db, `students/${student.id}/reminders`),
            orderBy("timestamp", "desc")
          );

          const querySnapshot = await getDocs(q);
          let tmp = [];
          querySnapshot.forEach((doc) => {
            tmp.push({
              ...doc.data(),
              student,
              id: doc.id,
              timestamp: doc.data().timestamp.toDate(),
            });
          });
          if (tmp.length > 0) {
            resolve(tmp);
          }
        } catch (error) {
          console.warn(error);
          reject(error);
        }
      });
    }

    //get reminders
    let promisesR = [];
    studentstmp.forEach((student) => {
      let p = getReminders(student);
      promisesR.push(p);
    });

    let remindersTmp = await Promise.all(promisesR).then((results) => {
      return results.flat();
    });

    return {
      props: {
        studentsInit: JSON.stringify(studentstmp),
        diariesInit: JSON.stringify(diariesTmp),
        remindersInit: JSON.stringify(remindersTmp),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        studentsInit: JSON.stringify([]),
        diariesInit: JSON.stringify([]),
        remindersInit: JSON.stringify([]),
      },
    };
  }
};
