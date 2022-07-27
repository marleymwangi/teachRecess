//custom
import Title from "../elements/title";
import { useData } from "../../context/dataContext";
import Entry from "./entry";
import Link from "next/link";
//custom
import { db } from "../../firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function DiariesSection({ students, diariesParam }) {
  const { data: session, status } = useSession();
  const [diaries, setDiaries] = useState(diariesParam);

  async function getDiaries(student) {
    return new Promise((resolve, reject) => {
      try {
        const q = query(collection(db, `students/${student.id}/diaries`));

        const listener = onSnapshot(q, (snapshot) => {
          const tmp = [];
          snapshot.forEach((doc) => {
            tmp.push({
              ...doc.data(),
              student,
              id: doc.id,
              timestamp: doc.data().timestamp.toDate(),
              due: doc.data().due.toDate(),
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
        let p = getDiaries(student);
        promises.push(p);
      });

      Promise.all(promises).then((results) => {
        let tmp = [];
        results.forEach((r) => {
          tmp.push(...r.data);
          lis.push(r.listener);
        });

        setDiaries(tmp);
      });
    }
    lis.forEach((l) => l());
  }, [students]);

  return (
    <section className="diaries px-8">
      <Title title="Todays Assignments" />
      <div className="mt-6">
        {diaries?.length > 0 &&
          diaries.slice(0, 3).map((e, i) => {
            return <Entry key={i} data={e} />;
          })}
      </div>
      <div className="flex justify-end">
        <Link href="/diaries">
          <button className="btn btn-ghost">See All</button>
        </Link>
      </div>
    </section>
  );
}
