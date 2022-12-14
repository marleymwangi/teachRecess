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
  diaries,
  homeworks,
  schReminders,
  clsReminders,
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
    <section className="border-b border-yellow-500">
      <div className="flex my-4 items-center justify-around">
        <button type="button" onClick={previousWeek} className="text-cyan-600">
          <span className="sr-only">Previous Week</span>
          <CgArrowLeftR size="1.75em" />
        </button>
        <h2 className="font-semibold text-lg text-cyan-600">
          {firstDayCurrentWeek &&
            `${format(firstDayCurrentWeek, "MMMM")} ${format(
              firstDayCurrentWeek,
              "yyyy"
            )}`}
        </h2>
        <button type="button" onClick={nextWeek} className="text-cyan-600">
          <span className="sr-only">Next Week</span>
          <CgArrowRightR size="1.75em" />
        </button>
      </div>
      <div className="grid grid-cols-7">
        {mappedDays.map((day) => (
          <Day
            key={day?.date}
            data={day}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            diaries={diaries}
            homeworks={homeworks}
            clsReminders={clsReminders}
            schReminders={schReminders}
          />
        ))}
      </div>
    </section>
  );
}

function Day({
  diaries,
  homeworks,
  schReminders,
  clsReminders,
  data,
  selectedDay,
  setSelectedDay,
}) {
  let selectedDayHomeworks = homeworks?.filter(
    (hmwrk) =>
      isSameDay(hmwrk.timestamp, data?.date) ||
      isSameDay(hmwrk.due, data?.date)
  );

  let selectedDaySchReminders = schReminders?.filter((rem) =>
    isSameDay(rem.timestamp, data?.date)
  );

  let selectedDayClsReminders = clsReminders?.filter((rem) =>
    isSameDay(rem.timestamp, data?.date)
  );

  let selectedDayDiary = diaries?.filter((dia) =>
    isSameDay(dia.timestamp, data?.date)
  );

  let selected = isEqual(data?.date, selectedDay);

  let array = [
    ...selectedDayHomeworks,
    ...selectedDaySchReminders,
    ...selectedDayClsReminders,
    ...selectedDayDiary,
  ];

  return (
    <div
      onClick={() => setSelectedDay(data.date)}
      className={classNames(
        "text-center py-2 px-1 text-cyan-800",
        selected && "bg-primary !text-white"
      )}
    >
      <p className="text-3xl font-bold">{format(data.date, "d")}</p>
      <p className="text-xs uppercase">{data.day}</p>
      <div className="flex gap-0.5 justify-center mt-1">
        {array?.length > 0 &&
          array.length <= 5 &&
          array.map((e, i) => (
            <div
              key={i}
              className={classNames(
                "w-2 h-2 rounded-full",
                selected ? " bg-cyan-50" : " bg-cyan-500"
              )}
            />
          ))}
        {array?.length > 0 && array.length > 5 && (
          <div
            className={classNames(
              "w-4 h-4 rounded-full -mt-1 bg-cyan-200 text-cyan-800 text-xs grid place-content-center font-medium",
              selected
                ? "bg-cyan-50 text-cyan-800"
                : "bg-cyan-500 text-cyan-800"
            )}
          >
            <span className="">{array?.length}</span>
          </div>
        )}
      </div>
    </div>
  );
}
