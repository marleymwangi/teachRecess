import dynamic from "next/dynamic";
import { eachDayOfInterval, format, isEqual, isSameDay } from "date-fns";
//custom
import { classNames } from "../../helpers/utility";
//dynamic
const CgArrowLeftR = dynamic(
  async () => (await import("react-icons/cg")).CgArrowLeftR
);
const CgArrowRightR = dynamic(
  async () => (await import("react-icons/cg")).CgArrowRightR
);

export default function Calendar({
  homeworks,
  nextWeek,
  previousWeek,
  selectedDay,
  setSelectedDay,
  firstDayCurrentWeek,
  endDayCurrentWeek,
}) {
  let days = eachDayOfInterval({
    start: firstDayCurrentWeek,
    end: endDayCurrentWeek,
  });

  let d = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  let mappedDays = days.map((day, i) => {
    return {
      day: d[i],
      date: day,
    };
  });

  return (
    <section className="border-b border-emma-100">
      <div className="flex my-4 items-center justify-around">
        <button type="button" onClick={previousWeek} className="text-emma-400">
          <span className="sr-only">Previous Week</span>
          <CgArrowLeftR size="1.75em" />
        </button>
        <h2 className="font-semibold text-lg text-emma-400">
          {firstDayCurrentWeek &&
            `${format(firstDayCurrentWeek, "MMMM")} ${format(
              firstDayCurrentWeek,
              "yyyy"
            )}`}
        </h2>
        <button type="button" onClick={nextWeek} className="text-emma-400">
          <span className="sr-only">Next Week</span>
          <CgArrowRightR size="1.75em" />
        </button>
      </div>
      <div className="grid grid-cols-7">
        {mappedDays.map((day) => (
          <Day
            homeworks={homeworks}
            key={day?.date}
            data={day}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
          />
        ))}
      </div>
    </section>
  );
}

function Day({ homeworks, data, selectedDay, setSelectedDay }) {
  let selectedDayDiaries = homeworks?.filter((hmwrk) => {
    return (
      isSameDay(hmwrk.timestamp, data?.date) || isSameDay(hmwrk.due, data?.date)
    );
  });
  let selected = isEqual(data?.date, selectedDay);

  return (
    <div
      onClick={() => setSelectedDay(data.date)}
      className={classNames(
        "text-center py-2 px-1 text-emma-800",
        selected && "bg-primary !text-white"
      )}
    >
      <p className="text-3xl font-bold">{format(data.date, "d")}</p>
      <p className="text-xs uppercase">{data.day}</p>
      <div className="flex gap-0.5 justify-center mt-1">
        {selectedDayDiaries?.length > 0 &&
          selectedDayDiaries.length <= 5 &&
          selectedDayDiaries.map((e, i) => (
            <div
              key={i}
              className={classNames(
                "w-2 h-2 rounded-full",
                selected ? " bg-emma-50" : " bg-emma-500"
              )}
            />
          ))}
        {selectedDayDiaries?.length > 0 && selectedDayDiaries.length > 5 && (
          <div
            className={classNames(
              "w-4 h-4 rounded-full -mt-1 bg-emma-200 text-emma-800 text-xs grid place-content-center font-medium",
              selected
                ? "bg-emma-50 text-emma-800"
                : "bg-emma-500 text-emma-800"
            )}
          >
            <span className="">{selectedDayDiaries?.length}</span>
          </div>
        )}
      </div>
    </div>
  );
}
