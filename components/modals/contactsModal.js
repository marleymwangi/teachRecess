import Image from "next/image";
import { useRef, useState, useEffect } from "react";
//context
import { useData } from "../../context/dataContext";
//custom
import { useSession } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import ContactElement from "../elements/contactElement";
import { db } from "../../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";

const slideVar = {
  hide: {
    x: "200%",
    opacity: 1,
  },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      delay: 0.25,
      type: "spring",
      mass: 0.8,
      damping: 10,
      staggerChildren: 0.25,
    },
  },
  exit: {
    x: "-100%",
    opacity: 0,
    transition: {
      duration: 0.25,
    },
  },
};

export default function ContactsModal() {
  const [kids, setKids] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const { data: session, status } = useSession();

  async function getTeachers(student) {
    return new Promise((resolve, reject) => {
      try {
        const q = query(
          collection(db, `teachers`),
          where("schoolId", "==", `${student.schoolId || ""}`),
          where("classId", "==", `${student.classId || ""}`),
          orderBy("name", "desc")
        );
        const listener = onSnapshot(q, (snapshot) => {
          const tmp = [];
          snapshot.forEach((doc) => {
            tmp.push({ ...doc.data(), student, id: doc.id });
          });
          if (tmp.length > 0) {
            resolve({ listener, data: tmp });
          }
        });
      } catch (error) {
        console.warn(error);
        reject(error);
      }
    });
  }

  useEffect(() => {
    let promises = [];
    kids.forEach(async (student) => {
      let p = getTeachers(student);
      promises.push(p);
    });

    Promise.all(promises).then((results) => {
      let tmp = [];
      results.forEach((r) => {
        tmp.push(...r.data);
        r.listener();
      });
      if (tmp !== teachers) {
        tmp.sort((a, b) => {
          let fa = a.name.toLowerCase(),
            fb = b.name.toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });
        //console.log(tmp)

        setTeachers(tmp);
      }
    });
  }, [kids, teachers]);

  useEffect(() => {
    //get students for teacher search
    if (session) {
      const q = query(
        collection(db, "students"),
        where("guardians", "array-contains", session?.user?.id || "")
      );

      return onSnapshot(q, (snapshot) => {
        let tmp = [];
        snapshot.forEach((doc) => {
          tmp.push({ ...doc.data(), id: doc.id });
        });
        setKids(tmp);
      });
    }
  }, [session]);

  return (
    <div>
      <input type="checkbox" id="contacts_modal" className="modal-toggle" />
      <label
        htmlFor="contacts_modal"
        className="modal modal-bottom sm:modal-middle cursor-pointer"
      >
        <label className="modal-box relative bg-white no-scroll" htmlFor="">
          <label
            htmlFor="contacts_modal"
            className="btn btn-primary btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="contacts__modal">
            <h1>Click on Contacts to start the Chat</h1>
            <section className="contacts__list custom-scroll">
              <section className="contacts__list custom-scroll">
                {teachers?.length &&
                  teachers.map((t, i) => <ContactElement key={i} data={t} />)}
              </section>
            </section>
          </div>
        </label>
      </label>
    </div>
  );
}
