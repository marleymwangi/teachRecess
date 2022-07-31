import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
//custom packages
import { motion } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";
//custom
import { db } from "../../firebase";
import ImageLoader from "../elements/imageLoader";
import { useData } from "../../context/dataContext";

const slideVar = {
  hide: {
    opacity: 0,
    x: 10,
    scale: 0.9,
  },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.25,
    },
  },
};

export default function Kid({ id, data }) {
  const router = useRouter();
  const { classData } = useData();
  const [student, setStudent] = useState(data || {});

  useEffect(() => {
    if (id) {
      const docRef = doc(db, "students", id);

      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          setStudent(docSnap.data());
        }
      });
    }
  }, [id]);

  const handleClick = () => {
    if (data?.id) {
      router.push(`/attendance/profile?id=${data?.id}`);
    }
  };

  return (
    <motion.div variants={slideVar} className="child" onClick={handleClick}>
      <div className={`kid ${student?.color}`}>
        <div className="avatar">
          <div className="ring-offset-base-100 ring-offset-2">
            <ImageLoader
              src={student?.image}
              fallbackSrc="/assets/person.webp"
            />
          </div>
        </div>
        <div>
          <h1>{student?.name}</h1>
          <h2>
            class : <span>{classData.name}</span>
          </h2>
        </div>
        <div className="status">
          <div className="indicator" />
          <span>Present</span>
        </div>
      </div>
    </motion.div>
  );
}
