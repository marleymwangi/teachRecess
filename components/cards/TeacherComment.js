import { motion } from "framer-motion";
//hooks
//custom

export default function TeacherComment() {
  return (
    <div>
      <p className="font-semibold text-emma-800 text-2xl mb-2 font-inter">
        {"Diary"}
      </p>
      <motion.div
        variants={contAnim}
        initial="hide"
        animate="rest"
        whileTap="tap"
        className="relative bg-white px-4 py-2 shadow-xl rounded-xl overflow-hidden mb-3"
      >
        <span className="absolute shadow-md top-0 left-0 bg-emma-300 py-2 rounded-br-xl font-semibold min-w-[7em] text-center text-xs text-emma-800 uppercase">
          info
        </span>
        <div className="flex items-center gap-4">
          <p className=" text-sm font-inter text-emma-500 mt-2 pt-4 p-2 rounded-lg border-2 border-emma-300">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A suscipit
            voluptates omnis, qui provident velit.
          </p>
        </div>
        <div className="flex flex-wrap justify-end items-center mt-2">
          <span className="text-emma-200 capitalize text-xs font-poppins whitespace-nowrap">
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
