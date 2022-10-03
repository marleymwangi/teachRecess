import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
//custom
import { classNames, isEmpty, formatSubjectNames } from "../../helpers/utility";
import { useData } from "../../context/dataContext";
import ImageLoader from "../elements/imageLoader";
import useStudentFetch from "../../helpers/hooks/students/student";
//dynamic
const TbMathSymbols = dynamic(
  async () => (await import("react-icons/tb")).TbMathSymbols
);
const IoCheckmarkDoneCircleOutline = dynamic(
  async () => (await import("react-icons/io5")).IoCheckmarkDoneCircleOutline
);
const IoCheckmarkDoneCircle = dynamic(
  async () => (await import("react-icons/io5")).IoCheckmarkDoneCircle
);

export default function CardHomework({ id, data, setFunc, teacher }) {
  const [ref, inView] = useInView();
  const { SetAlert } = useData();
  const { markAsComplete, getTimeFormatted } = useStudentFetch();
  const { setSelDiary } = useData();
  const [time, setTime] = useState();

  useEffect(() => {
    if (inView) {
      setFunc(data);
    }
  }, [inView, data, setFunc]);

  useEffect(() => {
    if (
      !isEmpty(data) &&
      data.timestamp instanceof Date &&
      data.due instanceof Date
    ) {
      let t = getTimeFormatted(data.timestamp, data.due);
      setTime(t);
    }
  }, [data]);

  const subjects = [
    {
      name: "math",
      image: "/images/subjects/math.webp",
    },
    {
      name: "swahili",
      image: "/images/subjects/swa.webp",
    },
    {
      name: "english",
      image: "/images/subjects/eng.webp",
    },
    {
      name: "hygiene",
      image: "/images/subjects/hyg.webp",
    },
    {
      name: "science",
      image: "/images/subjects/atom.webp",
    },
    {
      name: "enviromental",
      image: "/images/subjects/env.webp",
    },
    {
      name: "religious",
      image: "/images/subjects/re.webp",
    },
    {
      name: "career",
      image: "/images/subjects/car.webp",
    },
  ];

  const getImage = (name) => {
    let sub = subjects.find((s) => s.name === name);
    return sub.image;
  };

  return (
    <motion.div
      id={id}
      variants={contAnim}
      initial="hide"
      animate="rest"
      className={classNames(
        "relative carousel-item w-full bg-primary h-[50vh] flex flex-col pt-6 transition-all duration-500 ease-in-out",
        data.overdue && "bg-red-400",
        data.complete && "bg-green-400"
      )}
    >
      <div
        ref={ref}
        className="absolute abs-center pointer-events-none w-2/3 h-full z-0"
      />
      <div className="flex-1 flex flex-col justify-around py-2 px-6 text-sm z-10">
        <div className="flex text-gray-800 items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-white p-2 shadow-lg">
            <ImageLoader src={getImage(data?.subject)} />
          </div>
          <p className="text-xl font-poppins font-medium">
            {formatSubjectNames(data?.subject)} Class
          </p>
        </div>
        <div className="grid grid-cols-2 mt-4">
          <div className="grid">
            <p
              className={classNames(
                "font-semibold text-xs",
                !data.complete && !data.overdue && "text-primary-content",
                data.overdue && "text-pink-700",
                data.complete && "text-green-700"
              )}
            >
              {data.type === "exer" && "Book"}
              {data.type === "craft" && "Project"}
            </p>
            <p className="text-gray-900">
              {data.type === "exer" && data?.book}
              {data.type === "craft" && data?.project}
            </p>
          </div>
          <div className="grid">
            <p
              className={classNames(
                "font-semibold text-xs",
                !data.complete && !data.overdue && "text-primary-content",
                data.overdue && "text-pink-700",
                data.complete && "text-green-700"
              )}
            >
              {data.type === "exer" && "Page(s)"}
              {data.type === "craft" && "Materials"}
            </p>
            <p className="text-gray-900">
              {data.type === "exer" && data?.pages}
              {data.type === "craft" && data?.materials}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <p
            className={classNames(
              "font-semibold text-xs",
              !data.complete && !data.overdue && "text-primary-content",
              data.overdue && "text-pink-700",
              data.complete && "text-green-700"
            )}
          >
            Instructions
          </p>
          <p className="text-gray-900">{data?.instructions}</p>
        </div>
        <div className="grid place-content-center gap-2 xxs:grid-cols-3">
          <div>
            <p
              className={classNames(
                "font-semibold text-xs",
                !data.complete && !data.overdue && "text-primary-content",
                data.overdue && "text-pink-700",
                data.complete && "text-green-700"
              )}
            >
              Issued On
            </p>
            <p className="text-gray-900 text-sm">{time?.issued}</p>
          </div>
          <div>
            <p
              className={classNames(
                "font-semibold text-xs",
                !data.complete && !data.overdue && "text-primary-content",
                data.overdue && "text-pink-700",
                data.complete && "text-green-700"
              )}
            >
              Time Left
            </p>
            <p className="text-gray-900 text-sm">{time?.left}</p>
          </div>
          <div>
            <p
              className={classNames(
                "font-semibold text-xs",
                !data.complete && !data.overdue && "text-primary-content",
                data.overdue && "text-pink-700",
                data.complete && "text-green-700"
              )}
            >
              Due On
            </p>
            <p className="text-gray-900 text-sm">{time?.due}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ButtonComplete({ overdue, complete, onClick }) {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "btn btn-secondary text-white gap-2",
        overdue && "btn-error",
        complete && "btn-success"
      )}
    >
      Complete
      <div
        className={classNames("swap min-w-[20px]", complete && "swap-active")}
      >
        <IoCheckmarkDoneCircle className="swap-on" size="2em" />
        <IoCheckmarkDoneCircleOutline className="swap-off" size="2em" />
      </div>
    </button>
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
};
