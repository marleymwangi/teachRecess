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
            let guardians = stud.guardians;
            delete stud.guardians;
            guardians.forEach((guard) => {
              let obj = { id: guard, student: stud };
              tmp.push(obj);
            });
          });

          let gs = mergeGuardiansStudents(tmp);

          let promises = [];
          gs.forEach(async (g) => {
            let p = getGuardian(g);
            promises.push(p);
          });

          Promise.all(promises).then((results) => {
            setGuardians(results);
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

  const mergeGuardiansStudents = (teachs) => {
    const result = teachs.reduce((acc, curr) => {
      const { id, student } = curr;
      const findObj = acc.find((o) => o.id === id);
      if (!findObj) {
        curr.student = [student];
        acc.push(curr);
      } else {
        findObj.student.push(student);
      }
      return acc;
    }, []);

    return result;
  };

  const getGuardian = (guard) => {
    const docRef = doc(db, "users", guard.id);

    return getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        return { ...docSnap.data(), id: guard.id, students: guard.student };
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
                guardians.map((g, i) => <ContactElement key={i} data={g} />)}
            </section>
          </div>
        </label>
      </label>
    </div>
  );
}
