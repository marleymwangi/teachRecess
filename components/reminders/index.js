import Link from "next/link";
import { useState, useEffect } from "react";
//custom package
import {
  collection,
  orderBy,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
//custom
import { db } from "../../firebase";
import Title from "../elements/title";
import ReminderComp from "./reminderComp";

export default function Reminders({ students, remindersParam }) {
  const [reminders, setReminders] = useState(remindersParam);

  async function getReminders(student) {
    return new Promise((resolve, reject) => {
      try {
        const q = query(
          collection(db, `students/${student.id}/reminders`),
          orderBy("timestamp", "desc")
        );

        const listener = onSnapshot(q, (snapshot) => {
          const tmp = [];
          snapshot.forEach((doc) => {
            tmp.push({
              ...doc.data(),
              student,
              id: doc.id,
              timestamp: doc.data().timestamp.toDate(),
            });
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
    let lis = [];
    if (students?.length > 0) {
      let promises = [];
      students.forEach((student) => {
        let p = getReminders(student);
        promises.push(p);
      });

      Promise.all(promises).then((results) => {
        let tmp = [];
        results.forEach((r) => {
          tmp.push(...r.data);
          lis.push(r.listener);
        });

        
        tmp.sort((a,b)=> new Date(b.timestamp).getTime()-new Date(a.timestamp).getTime());
        setReminders(tmp);
      });
    }
    lis.forEach((l) => l());
  }, [students]);

  return (
    <section className="reminder__sec">
      <Title title="Reminders" />
      <p className="text-gray-400 text-sm">
        This area show reminders. Scroll right to see more.
      </p>
      <div className="reminders no-scroll">
        {reminders?.length > 0 &&
          reminders.slice(0,3).map((e, i) => {
            return <ReminderComp key={i} data={e} />;
          })}
      </div>
      <div className="flex justify-end">
        <Link href="/reminders">
          <button className="btn btn-ghost">See All</button>
        </Link>
      </div>
    </section>
  );
}
