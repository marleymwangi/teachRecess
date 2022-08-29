import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
//custom packages
import { motion } from "framer-motion";
import { onSnapshot, doc } from "firebase/firestore";
//custom
import { db } from "../../firebase";
import { useData } from "../../context/dataContext";
import { classNames } from "../../context/vars";
//dynamic
const MdScience = dynamic(
  async () => (await import("react-icons/md")).MdScience
);
const TbMathSymbols = dynamic(
  async () => (await import("react-icons/tb")).TbMathSymbols
);

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
      duration: 0.25,
    },
  },
};

export default function Entry({ data, refData }) {
  const { selDiary, setSelDiary, classData } = useData();
  const [diary, setDiary] = useState(data);

  useEffect(() => {
    if (data && refData?.school && refData.class) {
      const docRef = doc(
        db,
        "schools",
        refData.school,
        "classes",
        refData.class,
        "diaries",
        data.id
      );
      //get doc with matching id from firebase
      return onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          setDiary({
            ...docSnap.data(),
            id: docSnap.id,
            refData,
            timestamp: docSnap.data().timestamp.toDate(),
            due: docSnap.data().due.toDate(),
          });
        }
      });
    }
    //console.log("data", data);
  }, [data]);

  const handleClick = () => {
    if (selDiary !== diary && diary !== null && diary !== undefined) {
      setSelDiary(diary);
    }
  };

  const backClr = (subject) => {
    switch (subject) {
      case "Mathematics":
        return "bg-gradient-to-r from-red-500 to-red-800";
      case "English":
        return "bg-gradient-to-r from-purple-800 via-violet-900 to-purple-800";
      case "Kiswahili":
        return "bg-gradient-to-r from-green-500 to-green-700";
      case "Science":
        return "bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900";
      case "Religous Education":
        return "bg-gradient-to-r from-orange-600 to-orange-500";
      default:
        return "bg-conic-to-l from-sky-400 to-blue-800";
    }
  };

  const textClr = (subject) => {
    switch (subject) {
      case "Mathematics":
        return "!text-red-500 hover:!text-red-600";
      case "English":
        return "!text-purple-500 hover:!text-purple-600";
      case "Kiswahili":
        return "!text-green-500 hover:!text-green-600";
      case "Science":
        return "!text-sky-500 hover:!text-sky-600";
      case "Religous Education":
        return "!text-amber-500 hover:!text-amber-600";
      default:
        return "!text-primary";
    }
  };

  return (
    <motion.div
      variants={riseVar}
      onClick={handleClick}
      className={classNames(
        "diary__entry", backClr(diary?.subject)
      )}
    >
      <div className="info">
        <div className={textClr(diary?.subject)}>
          {diary?.subject === "Science" && <MdScience size="2rem" />}
          {diary?.subject === "Mathematics" && <TbMathSymbols size="2rem" />}
        </div>
        <h4>{diary?.subject} Diary Entry</h4>
      </div>
      <div className="content">
        {diary.type === "Book Exercise" && (
          <h3>
            {`${diary.book}`}
            <span>, PG : </span>
            {`${diary.pages}`}
          </h3>
        )}
        {diary.type === "Craft" && (
          <h3>
            {`${diary.project}`}
            <span>, Req : </span>
            {`${diary.materials}`}
          </h3>
        )}
        <h3>{diary.instructions}</h3>
        <div className="flex justify-end">
          <label
            htmlFor="work_modal"
            className={classNames(
              "modal-button",
              textClr(diary?.subject)
            )}
          >
            More Info
          </label>
        </div>
      </div>
    </motion.div>
  );
}
