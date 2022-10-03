import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
//custom
import { useData } from "../../context/dataContext";
import { isEmpty } from "../../helpers/utility";

export default function Subject({ index,count, data }) {
  const router = useRouter();
  const { selStudent } = useData();

  const handleClick = () => {
    if (!isEmpty(selStudent)) {
      router.push(`/homework?id=${selStudent.id}`);
    }
  };

  return (
    <motion.div
      variants={contAnim}
      custom={index}
      initial="hide"
      animate="rest"
      whileTap="tap"
      onClick={handleClick}
      className="flex flex-col gap-2 items-center"
    >
        <motion.div
          variants={imageAnim}
          className="rounded-full relative max-w-fit mx-auto shadow-xl p-2 border-4 border-primary"
        >
          <motion.div
          variants={buttonAnim}
          className="absolute h-6 w-6 bg-secondary text-sm text-white font-semibold rounded-full grid place-content-center z-10 -right-2 -top-2 shadow-md"
        >
          {count}
        </motion.div>
          <div className="relative rounded-full h-10 w-10 overflow-hidden">
            <Image src={data?.image || ""} alt="" layout="fill" objectFit="contain" />
          </div>
        </motion.div>
        <motion.p
          variants={buttonAnim}
          className="relative text-sm text-center font-poppins font-medium bg-white text-secondary capitalize py-2 px-4 rounded-full shadow-xl -top-5"
        >
          {data?.name || "math"}
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
