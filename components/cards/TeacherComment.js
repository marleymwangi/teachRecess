import Router from "next/router";
import { useEffect } from "react";
import { motion } from "framer-motion";
//hooks
import useUserFetch from "../../helpers/hooks/user";
import useClassroomFetch from "../../helpers/hooks/classroom";
//custom
import { classNames } from "../../helpers/utility";

export default function TeacherComment({ data }) {
  const { user } = useUserFetch();
  const { diaries, bnotes } = useClassroomFetch(user);

  console.log(bnotes)

  const handleClick = () => {
    if (diaries.length < 1) {
      Router.push("/create/diary");
    }
  };

  return (
    <div>
      <p className="font-semibold text-cyan-800 text-2xl mb-2 font-inter">
        {"Diary"}
      </p>
      <motion.div
        initial="hide"
        animate="rest"
        variants={contAnim}
        onClick={handleClick}
        className="relative bg-white px-4 py-2 shadow-xl rounded-xl overflow-hidden mb-3 border border-cyan-100"
      >
        <span className="absolute shadow-md top-0 left-0 bg-cyan-400 py-2 rounded-br-xl font-semibold min-w-[7em] text-center text-xs text-cyan-800 uppercase">
          info
        </span>
        {data ? (
          <>
            <p
              className={classNames(
                "w-full font-medium text-sm font-inter text-center mt-2 py-4 px-2 rounded-lg border-2 border-cyan-500",
                data?.content?.length > 0 ? "text-cyan-700" : "text-gray-400"
              )}
            >
              {data?.content?.length > 0
                ? data.content
                : "Select to add Today's Comment"}
            </p>
            <div className="flex flex-wrap justify-end items-center mt-2">
              <span className="text-cyan-500 font-light capitalize text-xs font-poppins whitespace-nowrap">
                Today
              </span>
            </div>
          </>
        ) : (
          <>
            <p
              className={classNames(
                "w-full font-medium text-sm font-inter text-center mt-2 py-4 px-2 rounded-lg border-2 border-cyan-500",
                diaries[0]?.content?.length > 0
                  ? "text-cyan-700"
                  : "text-gray-400"
              )}
            >
              {diaries[0]?.content?.length > 0
                ? diaries[0].content
                : "Select to add Today's Comment"}
            </p>
            <div className="flex flex-wrap justify-end items-center mt-2">
              <span className="text-cyan-500 font-light capitalize text-xs font-poppins whitespace-nowrap">
                Today
              </span>
            </div>
          </>
        )}
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
