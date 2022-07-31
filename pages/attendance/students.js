import { useRouter } from "next/router";
import { useState, useEffect } from "react";
//custom packages
import { motion } from "framer-motion";
import {
  collection,
  orderBy,
  onSnapshot,
  doc,
  query,
  where,
} from "firebase/firestore";
//custom
import { db } from "../../firebase";
import { useData } from "../../context/dataContext";
import KidsSection from "../../components/kids";

const contVar = {
  show: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
};

const FormContVar = {
  hide: {
    opacity: 0,
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
      duration: 0.15,
    },
  },
};

export default function StudentsPage() {
  const router = useRouter();
  const { teacher } = useData();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getStudents(teacher) {
    return new Promise((resolve, reject) => {
      try {
        const q = query(
          collection(db, `students`),
          where("schoolId", "==", `${teacher.schoolId || ""}`),
          where("classId", "==", `${teacher.classId || ""}`),
          orderBy("name", "desc")
        );
        return onSnapshot(q, (snapshot) => {
          const tmp = [];
          snapshot.forEach((doc) => {
            tmp.push({ ...doc.data(), id: doc.id });
          });

          resolve(tmp);
        });
      } catch (error) {
        console.warn(error);
        reject(error);
      }
    });
  }

  useEffect(() => {
    if (teacher?.schoolId && teacher?.classId) {
      getStudents(teacher)
        .then((res) => {
          let tmp = [];

          res.forEach((stud) => {
            tmp.push(stud);
          });
          setStudents(tmp);
        })
        .catch((error) => console.log(error));
    }
  }, [teacher]);

  useEffect(() => {
    //console.log("students");
  }, [students]);
  return (
    <motion.main
      variants={contVar}
      initial="hide"
      animate="show"
      className="profile__page caret-black"
    >
      <KidsSection students={students} tile />
    </motion.main>
  );
}
