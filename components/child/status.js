import { motion } from "framer-motion";
import { classNames } from "../../helpers/utility";
//custom
import ImageLoader from "../elements/imageLoader";
import { useData } from "../../context/dataContext";

export default function Status({ index, data }) {
  const { selStudent, setSelStudent } = useData();
  let isSelected = selStudent?.id === data?.id;

  const handleClick = () => {
    setSelStudent(data);
  };

  return (
    <motion.section
      variants={contAnim}
      custom={index}
      initial="hide"
      animate="rest"
      whileTap="tap"
      onClick={handleClick}
      className="relative"
    >
      <motion.div
        variants={imageAnim}
        className="min-h-[35px] rounded-full relative p-1 capitalize grid place-content-center"
      >
        <p
          className={classNames(
            "font-poppins font-semibold text-sm text-center capitalize",
            isSelected ? "text-gray-700" : "text-gray-400"
          )}
        >
          {data?.name}
        </p>
        {!data.name && (
          <span className="bg-gray-300 animate-pulse rounded w-10 h-5"></span>
        )}
      </motion.div>
      {!data.name && (
        <span className="bg-gray-200 bg-opacity-30 animate-pulse rounded w-10 h-5"></span>
      )}
      <div className="relative avatar online">
        {isSelected && data?.id && (
          <motion.div
            layoutId="outline"
            className="absolute -z-10 rounded-full -inset-2 bg-primary"
            initial={false}
            transition={spring}
          />
        )}
        <motion.div
          variants={imageAnim}
          className="relative w-16 rounded-full shadow-md"
        >
          <ImageLoader src={data?.image} />
        </motion.div>
      </div>
      <motion.div
        variants={buttonAnim}
        className="min-h-[35px] rounded-full -mt-4 relative p-1 bg-secondary  z-10 shadow-md grid place-content-center"
      >
        <p className="relative font-semibold text-sm text-center text-white uppercase">
          {data?.status}
        </p>
        {!data.status && (
          <span className="bg-gray-200 bg-opacity-30 animate-pulse rounded w-10 h-5"></span>
        )}
      </motion.div>
    </motion.section>
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
    scale: 0.9,
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
    scale: 1.1,
    transition: spring,
  },
};
