import Image from "next/image";
import { useRef, useState, useEffect } from "react";
//custom packages
import {
  doc,
  query,
  where,
  getDoc,
  orderBy,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
//custom
import { db } from "../../firebase";
import ContactElement from "../elements/contactElement";
//context
import { useData } from "../../context/dataContext";

export default function ContactsModal() {
  const [guardians, setGuardians] = useState([]);
  const { teacher } = useData();
  const { data: session } = useSession();

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

          if (tmp.length > 0) {
            resolve(tmp);
          }
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
          let studs = [];
          let names = [];

          res.forEach((stud) => {
            names.push(stud.name);
            studs.push(stud.guardians);
          });
          let gs = studentProcessGuardians(studs);

          let promises = [];
          gs.forEach(async (g) => {
            let p = getGuardian(g);
            promises.push(p);
          });

          Promise.all(promises).then((results) => {
            let guards = [];
            results.forEach((r) => {
              guards.push(r);
            });
            if (guards.length > 0) {
              let tmp = [];
              guards.forEach((g) => {
                let obj = {
                  students: names,
                  guardian: g,
                };
                tmp.push(obj);
              });
              if (tmp.length > 0 && tmp !== guardians) {
                setGuardians(tmp);
              }
            }
          });
        })
        .catch((error) => console.log(error));
    }
  }, [teacher]);

  useEffect(() => {
    //console.log(guardians)
  }, [guardians]);

  const studentProcessGuardians = (array) => {
    let flatArray = array.reduce((acc, curVal) => {
      return acc.concat(curVal);
    }, []);
    let withoutDuplicates = [...new Set(flatArray)];
    return withoutDuplicates;
  };

  const getGuardian = (id) => {
    const docRef = doc(db, "users", id);

    return getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        return {...docSnap.data(), id };
      }
    });
  };

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
              {guardians?.length &&
                guardians.map((t, i) => <ContactElement key={i} data={t} />)}
            </section>
          </div>
        </label>
      </label>
    </div>
  );
}
