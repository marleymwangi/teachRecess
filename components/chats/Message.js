import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  format,
  isSameYear,
  isSameMonth,
  differenceInDays,
  formatDistanceToNow,
} from "date-fns";
//hooks
import useStudentFetch from "../../helpers/hooks/students/student";
//custom
import { classNames, isEmpty } from "../../helpers/utility";
//dynamic
const TbMathSymbols = dynamic(
  async () => (await import("react-icons/tb")).TbMathSymbols
);

export default function Message({ data }) {
  const [time, setTime] = useState();
  const [diaryTime, setDiaryTime] = useState();
  const { getTimeFormatted: getDiaryTimeFormatted } = useStudentFetch();

  function getTimeFormatted(time) {
    if (!(time instanceof Date)) {
      throw "invalid timestamp isnt a date";
    } else {
      let diff = differenceInDays(new Date(), time);
      let year = isSameYear(new Date(), time);
      let month = isSameMonth(new Date(), time);
      let tmp;

      if (!year) {
        tmp = format(time, "do MMM yyyy");
      } else {
        if (!month) {
          tmp = format(time, "do MMM");
        } else {
          if (diff > 3) {
            tmp = format(time, "io iii");
          } else {
            tmp = formatDistanceToNow(time);
          }
        }
      }

      return tmp;
    }
  }

  useEffect(() => {
    if (data?.timestamp.toDate() instanceof Date) {
      let t = getTimeFormatted(data.timestamp.toDate());
      setTime(t);
    }
  }, [data?.timestamp, data]);

  useEffect(() => {
    let tmstp = data?.attachment?.diary?.timestamp.toDate();
    let tmdue = data?.attachment?.diary?.due.toDate();
    if (
      data?.attachment?.type === "diary" &&
      tmstp instanceof Date &&
      tmdue instanceof Date
    ) {
      let t = getDiaryTimeFormatted(tmstp, tmdue);
      setDiaryTime(t);
    }
  }, [data?.timestamp, data]);

  if (isEmpty(data?.attachment)) {
    return (
      <motion.div
        variants={messageAnim}
        custom={data?.type}
        className={classNames(
          "text-sm max-h-fit max-w-fit p-4 rounded-xl shadow-md font-medium",
          data?.type === "mine" && "ml-auto",
          data?.type === "other" ? "bg-white" : "bg-emma-600"
        )}
      >
        <p
          className={classNames(
            data?.type === "mine" ? "text-white" : "text-emma-600"
          )}
        >
          {data?.message}
        </p>
        <p></p>
        <p
          className={classNames(
            "text-xs float-right",
            data?.type === "mine" ? "text-gray-100" : "text-emma-400"
          )}
        >
          {time}
        </p>
      </motion.div>
    );
  } else {
    let diary = data.attachment.diary;
    return (
      <motion.div
        variants={messageAnim}
        custom={"mine"}
        className={classNames(
          "text-sm max-h-fit max-w-fit p-4 rounded-xl shadow-md ml-auto bg-primary",
          diary.complete ? "bg-green-400" : "bg-primary"
        )}
      >
        <div className="flex-1 flex flex-col justify-around py-2 px-6 text-sm z-10">
          <div className="flex text-gray-800 items-center gap-6">
            <TbMathSymbols size="3em" />
            <p className="text-xl font-poppins font-medium">
              {diary?.subject} Class
            </p>
          </div>
          <div className="grid grid-cols-2 mt-4">
            <div className="grid">
              <p
                className={classNames(
                  "font-semibold text-xs",
                  !diary?.complete && !diary?.overdue && "text-orange-700",
                  diary?.overdue && "text-red-700",
                  diary?.complete && "text-green-700"
                )}
              >
                {diary?.type === "Book Exercise" && "Book"}
                {diary?.type === "Craft" && "Project"}
              </p>
              <p className="text-gray-900">
                {diary?.type === "Book Exercise" && diary?.book}
                {diary?.type === "Craft" && diary?.project}
              </p>
            </div>
            <div className="grid">
              <p
                className={classNames(
                  "font-semibold text-xs",
                  !diary?.complete && !diary?.overdue && "text-orange-700",
                  diary?.overdue && "text-red-700",
                  diary?.complete && "text-green-700"
                )}
              >
                {diary?.type === "Book Exercise" && "Page(s)"}
                {diary?.type === "Craft" && "Materials"}
              </p>
              <p className="text-gray-900">
                {diary?.type === "Book Exercise" && diary?.pages}
                {diary?.type === "Craft" && diary?.materials}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <p
              className={classNames(
                "font-semibold text-xs",
                !diary?.complete && !diary?.overdue && "text-orange-700",
                diary?.overdue && "text-red-700",
                diary?.complete && "text-green-700"
              )}
            >
              Instructions
            </p>
            <p className="text-gray-900">{diary?.instructions}</p>
          </div>
          <div className="grid place-content-center gap-2 xxs:grid-cols-3">
            <div>
              <p
                className={classNames(
                  "font-semibold text-xs",
                  !diary?.complete && !diary?.overdue && "text-orange-700",
                  diary?.overdue && "text-red-700",
                  diary?.complete && "text-green-700"
                )}
              >
                Issued On
              </p>
              <p className="text-gray-900 text-sm">{diaryTime?.issued}</p>
            </div>
            <div>
              <p
                className={classNames(
                  "font-semibold text-xs",
                  !diary?.complete && !diary?.overdue && "text-orange-700",
                  diary?.overdue && "text-red-700",
                  diary?.complete && "text-green-700"
                )}
              >
                Time Left
              </p>
              <p className="text-gray-900 text-sm">{diaryTime?.left}</p>
            </div>
            <div>
              <p
                className={classNames(
                  "font-semibold text-xs",
                  !diary?.complete && !diary?.overdue && "text-orange-700",
                  diary?.overdue && "text-red-700",
                  diary?.complete && "text-green-700"
                )}
              >
                Due On
              </p>
              <p className="text-gray-900 text-sm">{diaryTime?.due}</p>
            </div>
          </div>
          <div className="mt-4">
            <p
              className={classNames(
                "font-semibold text-xs",
                !diary?.complete && !diary?.overdue && "text-orange-700",
                diary?.overdue && "text-red-700",
                diary?.complete && "text-green-700"
              )}
            >
              Comment
            </p>
            <p className="text-gray-900">{data?.message}</p>
          </div>
        </div>
      </motion.div>
    );
  }
}

const spring = {
  type: "spring",
  stiffness: 500,
  damping: 30,
};

const messageAnim = {
  hide: (custom) => ({
    x: custom === "mine" ? -10 : 10,
    opacity: 0,
    transition: spring,
  }),
  rest: {
    x: 0,
    opacity: 1,
    transition: spring,
  },
};
