import { useEffect, useState } from "react";
import { motion } from "framer-motion";
//custom
import { classNames } from "../../helpers/utility";
import CardHomework from "../cards/homework";
import useHomeworksFetch from "../../helpers/hooks/homework/homeworks";

export default function CarouselHomework({ teacher }) {
  const { homeworks } = useHomeworksFetch();
  const [selected, setSelected] = useState();

  return (
    <>
      <div className="carousel carousel-center w-full">
        {homeworks?.length > 0 &&
          homeworks.map((diary) => (
            <CardHomework
              key={diary.id}
              id={diary.id}
              data={diary}
              teacher={teacher}
              setFunc={setSelected}
            />
          ))}
      </div>
      <div className="flex justify-center w-full py-2 gap-2">
        {homeworks?.length > 0 &&
          homeworks.map((diary, i) => (
            <Indicator
              key={diary.id}
              id={diary.id}
              text={i + 1}
              data={{
                id: diary.id,
                overdue: diary.overdue,
                complete: diary.complete,
              }}
              selected={selected}
            />
          ))}
      </div>
    </>
  );
}

const Indicator = ({ id, text, data, selected }) => {
  const link = `#${id}`;
  const highlight = Boolean(data.id === selected?.id);
  if (data.overdue) {
    return (
      <motion.a
        variants={growAnim}
        initial="hide"
        animate="rest"
        whileTap="tap"
        href={link}
        className={classNames(
          "rounded-full w-6 text-center",
          highlight ? "text-pink-900" : "text-pink-500",
          highlight ? "bg-red-400" : "bg-red-200"
        )}
      >
        {text}
      </motion.a>
    );
  } else if (data.complete) {
    return (
      <motion.a
        variants={growAnim}
        initial="hide"
        animate="rest"
        whileTap="tap"
        href={link}
        className={classNames(
          "rounded-full w-6 text-center",
          highlight ? "text-green-700" : "text-green-500",
          highlight ? "bg-green-400" : "bg-green-200"
        )}
      >
        {text}
      </motion.a>
    );
  } else {
    return (
      <motion.a
        variants={growAnim}
        initial="hide"
        animate="rest"
        whileTap="tap"
        href={link}
        className={classNames(
          "rounded-full w-6 text-secondary text-center",
          highlight ? "text-orange-900" : "text-yellow-500",
          highlight ? "bg-yellow-300" : "bg-yellow-200"
        )}
      >
        {text}
      </motion.a>
    );
  }
};

const spring = {
  type: "spring",
  stiffness: 500,
  damping: 30,
};

const growAnim = {
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
