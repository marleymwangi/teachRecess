import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
//hooks
import useStudentFetch from "../../helpers/hooks/students/student";
//custom
import { isEmpty } from "../../helpers/utility";
import { useData } from "../../context/dataContext";

export default function CardHomeWorkSummary() {
  const router = useRouter();
  const { selStudent } = useData();
  const { diaries } = useStudentFetch();
  const [over, setOver] = useState(0);

  const handleClick = () => {
    if (!isEmpty(selStudent)) {
      router.push(`/homework?id=${selStudent.id}`);
    }
  };

  useEffect(() => {
    if (diaries?.length > 0) {
      getOverDue(diaries);
    }
  }, [diaries]);

  const getOverDue = () => {
    let tmp = diaries.filter((diary) => diary.overdue === true);
    setOver(tmp.length);
  };

  return (
    <motion.div
      variants={contAnim}
      initial="hide"
      animate="rest"
      whileTap="tap"
      onClick={handleClick}
      className="py-4 bg-primary  text-gray-800 rounded-2xl px-8 shadow-xl"
    >
      <p className="text-center text-xl font-poppins mb-4 font-semibold">
        {"Today's"} Homework
      </p>
      <div className="grid grid-cols-2">
        <div className="flex-1 text-gray-500 font-light">
          <p>
            <span className="text-gray-700 font-medium">{diaries?.length}</span>{" "}
            Assignments
          </p>
          <p>
            <span className="text-gray-700 font-medium">{over}</span> Overdue
          </p>
        </div>
        <div className="flex justify-end mt-2">
          <button className="btn btn-sm btn-secondary border-0">See All</button>
        </div>
      </div>
    </motion.div>
  );
}

const spring = {
  type: "spring",
  stiffness: 500,
  damping: 30,
};

const contAnim = {
  hide: {
    scale: 0.9,
    opacity: 0,
    transition: spring,
  },
  rest: {
    scale: 1,
    opacity: 1,
    transition: spring,
  },
  tap: {
    scale: 0.9,
    transition: spring,
  },
};
