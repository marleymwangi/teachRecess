import { useState, useEffect } from "react";
//custom packages
import { motion } from "framer-motion";
//custom
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import ImageLoader from "../elements/imageLoader";

const slideVar = {
  hide: {
    opacity: 0,
    x: 100,
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

export default function Kid({ id }) {
  const [student, setStudent] = useState({});

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

  return (
    <motion.div variants={slideVar} className="child my-3">
      <div className="flex items-center w-full bg-white p-4 rounded-2xl">
        <div className="avatar">
          <div className="w-10 rounded-full">
            <ImageLoader src={student.image} />
          </div>
        </div>
        <div>
          <h1 className="font-extrabold ml-3">{student.name}</h1>
        </div>
      </div>
    </motion.div>
  );
}
