import { useRouter } from "next/router";
import { useState, useEffect } from "react";
//custom packages
import { motion } from "framer-motion";
import {
  collection,
  orderBy,
  onSnapshot,
  doc,
  query,
  where,
} from "firebase/firestore";
//custom
import { db } from "../../firebase";
import { useData } from "../../context/dataContext";
import KidsSection from "../../components/kids";
import { classNames } from "../../context/vars";

const contVar = {
  show: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
};

const FormContVar = {
  hide: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
};

const riseVar = {
  hide: {
    opacity: 0,
    y: 10,
    scale: 0.9,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.15,
    },
  },
};

export default function StudentsPage() {
  const router = useRouter();
  const { students } = useData();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //console.log("students", students);
  }, [students]);

  const handleClick = () => {
    scan();
  };

  const scan = async () => {
    if ("NDEFReader" in window) {
      try {
        const ndef = new window.NDEFReader();
        await ndef.scan();

        console.log("Scan started successfully.");
        ndef.onreadingerror = () => {
          console.log("Cannot read data from the NFC tag. Try another one?");
        };

        ndef.onreading = (event) => {
          console.log("NDEF message read.");
          onReading(event); //Find function below
        };
      } catch (error) {
        console.log(`Error! Scan failed to start: ${error}.`);
      }
    }
  };

  const onReading = ({ message, serialNumber }) => {
    console.log(serialNumber);
    for (const record of message.records) {
      switch (record.recordType) {
        case "text":
          const textDecoder = new TextDecoder(record.encoding);
          console.log("Message: ", textDecoder.decode(record.data));
          break;
        case "url":
          // TODO: Read URL record with record data.
          break;
        default:
        // TODO: Handle other records with record data.
      }
    }
  };

  const onWrite = async () => {
    try {
      const ndef = new window.NDEFReader();
      await ndef.write({
        records: [{ recordType: "text", data: "Hellow World!" }],
      });
      console.log(`Value Saved!`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.main
      variants={contVar}
      initial="hide"
      animate="show"
      className="profile__page caret-black"
    >
      <KidsSection students={students} tile />
    </motion.main>
  );
}
