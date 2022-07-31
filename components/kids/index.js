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

  return (
    <section className="kids__sec">
      <div className="min-h-[250px]">
        {students?.length > 0 && (
          <motion.div
            variants={contVar}
            initial="hide"
            animate="show"
            className={`kids__list no-scroll ${tile && "tile"}`}
          >
            {students.map((k, i) => (
              <Kid data={k} key={i} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
