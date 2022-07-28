import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
//custom packages
import {
  add,
  addWeeks,
  eachDayOfInterval,
  endOfWeek,
  getWeekOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  startOfWeek,
  startOfToday,
} from "date-fns";
//custom
import { classNames } from "../../../context/vars";
import { useData } from "../../../context/dataContext";
import { colStartClasses } from "../../../context/vars";
//dynamic
const IoIosArrowDropleft = dynamic(
  async () => (await import("react-icons/io")).IoIosArrowDropleft
);
const IoIosArrowDropright = dynamic(
  async () => (await import("react-icons/io")).IoIosArrowDropright
);

export default function AttendanceCalendar({
  selectedDay,
  setSelectedDay,
  attendancees,
}) {
  const { selAttendance } = useData();
  let today = startOfToday();
  let [currentWeek, setCurrentWeek] = useState(today);
  let firstDayCurrentWeek = startOfWeek(currentWeek, { weekStartsOn: 1 });
  let endDayCurrentWeek = endOfWeek(currentWeek, {
    weekStartsOn: 1,
  });

  let days = eachDayOfInterval({
    start: firstDayCurrentWeek,
    end: endDayCurrentWeek,
  });

  function previousMonth() {
    let firstDayCurrentWeek = addWeeks(currentWeek, -1);
    setCurrentWeek(firstDayCurrentWeek);
  }

  function nextMonth() {
    let firstDayCurrentWeek = addWeeks(currentWeek, 1);
    setCurrentWeek(firstDayCurrentWeek);
  }

  useEffect(() => {
    //console.log(attendancees);
  }, [attendancees]);

  const backgroundColor = (day) => {
    const list = attendancees?.filter((attendance) =>
      isSameDay(attendance.day, day)
    );

    if (list?.length > 0) {
      const selected = list?.some((attendance) =>
        isSameDay(attendance.day, selectedDay)
      );
      if (selected) {
        return "bg-cyan-400";
      } else {
        return "bg-cyan-200";
      }
    }
    return "";
  };

  const textColor = (day) => {
    const list = attendancees?.filter(
      (attendance) =>
        isSameDay(attendance.timestamp, day) || isSameDay(attendance.due, day)
    );

    if (list?.length > 0) {
      const selected = list?.some((attendance) =>
        isSameDay(attendance.day, selectedDay)
      );

      if (selected) {
        return "text-white";
      } else {
        return "text-gray-900";
      }
    }
    return "";
  };

  const hoverColor = (day) => {
    if (!isEqual(day, selectedDay)) {
      const list = attendancees?.filter((attendance) =>
        isSameDay(attendance.day, day)
      );
      if (list?.length > 0) {
        let c = `hover:bg-cyan-400`;
        return c;
      }
      return "hover:bg-cyan-50";
    }
  };

  return (
    <div className="lg:mr-14 bg-white w-full min-w-md max-w-md p-6 rounded-3xl">
      <div className="flex items-center">
        <h2 className="flex-auto font-semibold text-gray-900">
          {`Week ${getWeekOfMonth(firstDayCurrentWeek)}, ${format(
            firstDayCurrentWeek,
            "MMMM yyyy"
          )}`}
        </h2>
        <button
          type="button"
          onClick={previousMonth}
          className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-primary"
        >
          <span className="sr-only">Previous Week</span>
          <IoIosArrowDropleft size="1.75em" />
        </button>
        <button
          onClick={nextMonth}
          type="button"
          className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-primary"
        >
          <span className="sr-only">Next Week</span>
          <IoIosArrowDropright size="1.75em" />
        </button>
      </div>
      <div className="grid grid-cols-7 my-3 text-xs leading-6 text-center text-gray-500">
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
        <div>S</div>
      </div>
      <div className="grid grid-cols-7">
        {days.map((day, dayIdx) => (
          <div
            key={day.toString()}
            className={classNames(
              dayIdx === 0 && colStartClasses[getDay(day)],
              "py-0.5 relative"
            )}
          >
            <button
              type="button"
              onClick={() => setSelectedDay(day)}
              className={classNames(
                !isEqual(day, selectedDay) &&
                  !isToday(day) &&
                  isSameMonth(day, firstDayCurrentWeek) &&
                  "text-gray-900",
                !isEqual(day, selectedDay) &&
                  !isToday(day) &&
                  !isSameMonth(day, firstDayCurrentWeek) &&
                  "text-gray-400",
                isEqual(day, selectedDay) && isToday(day) && "bg-cyan-300",
                isEqual(day, selectedDay) && isToday(day) && "text-white",
                (isEqual(day, selectedDay) || isToday(day)) && "font-semibold",
                textColor(day),
                hoverColor(day),
                backgroundColor(day),
                " mx-auto min-w-[3rem] min-h-[4rem] rounded-2xl flex items-center justify-center indicator"
              )}
            >
              {attendancees?.some((attendance) =>
                isSameDay(attendance.day, day)
              ) && (
                <span className="indicator-item indicator-center badge badge-error">
                  {attendancees?.length}
                </span>
              )}
              <time dateTime={format(day, "yyyy-MM-dd")}>
                {format(day, "d")}
              </time>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
