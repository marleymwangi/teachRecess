import Image from "next/image";
import { motion } from "framer-motion";
//custom

export default function CircleButton({ index, func, data }) {
  return (
    <motion.div
      variants={contAnim}
      custom={index}
      initial="hide"
      animate="rest"
      whileTap="tap"
      onClick={func}
      className="flex flex-col gap-2 items-center"
    >
      <motion.div
        variants={imageAnim}
        className="rounded-full relative max-w-fit mx-auto shadow-xl p-2 border-4 border-primary"
      >
        <div className="relative rounded-full h-10 w-10 overflow-hidden">
          {data?.image && (
            <Image
              src={data.image || ""}
              alt=""
              layout="fill"
              objectFit="contain"
            />
          )}
        </div>
      </motion.div>
      <motion.p
        variants={buttonAnim}
        className="relative text-sm text-center font-poppins font-medium bg-white text-secondary capitalize py-2 px-4 rounded-full shadow-xl -top-5"
      >
        {data?.text}
      </motion.p>
    </motion.div>
  );
}

const spring = {
  type: "spring",
  stiffness: 500,
  damping: 30,
};

const contAnim = {
  rest: (custom) => ({
    opacity: 1,
    transition: {
      when: "beforeChildren",
      delay: custom * 0.1,
    },
  }),
};

const buttonAnim = {
  hide: {
    scale: 0,
    opacity: 0,
    transition: spring,
  },
  rest: {
    scale: 1,
    opacity: 1,
    transition: spring,
  },
  tap: {
    scale: 1.1,
    transition: spring,
  },
};

const imageAnim = {
  hide: {
    scale: 0,
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
