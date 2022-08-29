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
import { fi } from "date-fns/locale";

export default function ContactsModal() {
  const [guardians, setGuardians] = useState([]);
  const [selected, setSelected] = useState([]);
  const { teacher, students } = useData();
  const { data: session } = useSession();

  useEffect(() => {
    if (students?.length > 0) {
      let tmp = [];

      students.forEach((stud) => {
        let guardians = stud.guardians;
        delete stud.guardians;
        guardians &&
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
    }
  }, [students]);

  useEffect(() => {
    console.log(selected);
  }, [selected]);

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

  const sendToMany = () =>{

  }

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
                guardians.map((g, i) => <ContactElement key={i} data={g} array={selected} setFunc={setSelected}/>)}
            </section>
            <div className="flex justify-end">
          <label
            htmlFor="message_modal"
            className="btn btn-sm btn-primary"
          >
            Send to Many
          </label>
        </div>
          </div>
        </label>
      </label>
    </div>
  );
}
