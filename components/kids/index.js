import { useEffect, useState } from "react";
//custom packages
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
//custom
import Kid from "./kid";
import { db } from "../../firebase";
import Title from "../elements/title";

const contVar = {
  show: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.25,
    },
  },
};

export default function KidsSection({ students, tile }) {
  const { data: session, status } = useSession();
  const [kids, setKids] = useState(students);

  useEffect(() => {
    //listen for changes and update kids information 
    if (status !== "loading") {
      const q = query(
        collection(db, "students"),
        where("guardians", "array-contains", session?.user?.id || ""),
        orderBy("name", "desc")
      );

      return onSnapshot(q, (snapshot) => {
        let tmp = [];
        snapshot.forEach((doc) => {
          tmp.push({ ...doc.data(), id: doc.id });
        });
        setKids(tmp);
      });
    }
  }, [status, session]);

  return (
    <section className="kids__sec">
      <div className="pl-8">
        <Title title="Kids" light />
      </div>
      <div className="min-h-[250px]">
        {kids?.length > 0 && (
          <motion.div
            variants={contVar}
            initial="hide"
            animate="show"
            className={`kids__list no-scroll ${tile && "tile"}`}
          >
            {kids.map((k, i) => (
              <Kid data={k} key={i} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
