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
const MdClass = dynamic(async () => (await import("react-icons/md")).MdClass);

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
  const { selDiary, setSelDiary } = useData();
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

  return (
    <motion.div
      variants={riseVar}
      onClick={handleClick}
      className="diary__entry">
      {diary.type === "Craft" ? (
        <div className="absolute top-0 right-0 rotate-12">
          <Image src="/assets/craft.png" width={130} height={110} alt="" />
        </div>
      ) : (
        <div className="absolute top-0 right-0 rotate-12">
          <Image src="/assets/exe.png" width={130} height={110} alt="" />
        </div>
      )}
      <section>
        <div className="info">
          <div className="class">
            <div>
              <MdClass size="2rem" />
            </div>
            <h4>
              <span className="text-md">class : </span>2b
            </h4>
          </div>
        </div>
        <div className="content">
          <h2>{`${diary.subject} Diary Entry`}</h2>
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
          {diary.complete && <h1>Completed</h1>}
          <label htmlFor="work_modal" className={classNames("modal-button")}>
            More Info
          </label>
        </div>
      </section>
    </motion.div>
  );
}
