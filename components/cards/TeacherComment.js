import Router from "next/router";
import { motion } from "framer-motion";
//hooks
import useTeacherFetch from "../../helpers/hooks/teacher";
//custom
import { classNames } from "../../helpers/utility";

export default function TeacherComment() {
  const { diaries } = useTeacherFetch();

  const handleClick = () => {
    if (diaries.length < 1) {
      Router.push("/create/diary");
    }
  };

  return (
    <div>
      <p className="font-semibold text-emma-800 text-2xl mb-2 font-inter">
        {"Diary"}
      </p>
      <motion.div
        initial="hide"
        animate="rest"
        variants={contAnim}
        onClick={handleClick}
        className="relative bg-white px-4 py-2 shadow-xl rounded-xl overflow-hidden mb-3 border border-emma-100"
      >
        <span className="absolute shadow-md top-0 left-0 bg-emma-400 py-2 rounded-br-xl font-semibold min-w-[7em] text-center text-xs text-emma-800 uppercase">
          info
        </span>
        <p
          className={classNames(
            "w-full font-medium text-sm font-inter text-center mt-2 py-4 px-2 rounded-lg border-2 border-emma-500",
            diaries[0]?.content?.length < 1 ? "text-gray-400" : "text-emma-700" 
          )}
        >
          {diaries[0]?.content?.length > 0
            ? diaries[0].content
            : "Select to add Today's Comment"}
        </p>
        <div className="flex flex-wrap justify-end items-center mt-2">
          <span className="text-emma-500 font-light capitalize text-xs font-poppins whitespace-nowrap">
            Today
          </span>
        </div>
      </motion.div>
    </div>
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
