import { useEffect } from "react";
import dynamic from "next/dynamic";
//custom packages
import { motion } from "framer-motion";
import { format, isBefore, startOfToday, addDays } from "date-fns";
//custom
import { classNames } from "../../context/vars";
import { useData } from "../../context/dataContext";
//dymanic
const BiDotsVerticalRounded = dynamic(
  async () => (await import("react-icons/bi")).BiDotsVerticalRounded
);

const riseVar = {
  hide: {
    opacity: 0,
    y: 10,
    scale: 0.9,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.15,
    },
  },
};

export default function ReminderComp({ data, home }) {
  const { setSelRemindersMode, setSelReminder, removeReminderInfo, classData } = useData();
  let today = startOfToday();

  useEffect(() => {
    //console.log("data", result);
  }, [data]);

  let result = addDays(today, 7);
  let upcoming = data?.timestamp && isBefore(data.timestamp, result);
  let passed = data?.timestamp && isBefore(data.timestamp, today);

  const editHandleClick = () => {
    setSelReminder(data);
    setSelRemindersMode("edit");
    document.getElementById("reminder_modal").checked = true;
  };

  const deleteHandleClick = () => {
    removeReminderInfo(data)
      .then((res) => {
        console.log(res);
        swal("Done!", "Deleted Successfully!", "success");
        3;
      })
      .catch((err) => {
        console.log(err);
        swal("Sorry!", "Error while deleting!", "error");
      });
  };

  return (
    <motion.div variants={riseVar} className="reminder">
      {!home && (
        <div className="dropdown dropdown-right">
          <label tabIndex="0" className="btn btn-circle btn-ghost">
            <button className="btn btn-ghost btn-circle text-gray-400">
              <BiDotsVerticalRounded size="2em" />
            </button>
          </label>
          <ul
            tabIndex="0"
            className="dropdown-content menu shadow font-semibold bg-gray-100 rounded-box w-24"
          >
            <li className="text-gray-700" onClick={editHandleClick}>
              <a>Edit</a>
            </li>
            <li className="text-gray-700" onClick={deleteHandleClick}>
              <a>Delete</a>
            </li>
          </ul>
        </div>
      )}
      <div className="content">
        <h5 className="font-bold text-gray-400 mb-2">
          Class : <span className="text-gray-600 uppercase">{classData.name}</span>
        </h5>
        <p>{data?.content ? data.content : "Student Reminder"}</p>
        <span>
          {data?.scope === "School" ? data.scope : data?.eventType} Reminder
        </span>
      </div>
      <div className="def">
        <div className="type">
          {passed ? (
            <>
              <span>Passed</span>
              <div className="absolute -right-0.5">
                <div className="absolute blur -inset-0.5 bg-opacity-75 animate-pulse rounded-full bg-gray-400" />
                <div className="relative h-10 w-2 rounded-full bg-gray-400" />
              </div>
            </>
          ) : (
            <>
              <span>
                {data?.type === "Urgent"
                  ? "Urgent"
                  : upcoming
                  ? "Upcoming"
                  : "Info"}
              </span>
              <div className="absolute -right-0.5">
                <div
                  className={classNames(
                    "absolute blur -inset-0.5 bg-opacity-75 animate-pulse rounded-full",
                    data?.type === "Urgent"
                      ? "bg-red-500"
                      : upcoming
                      ? "bg-green-400"
                      : "bg-cyan-400"
                  )}
                />
                <div
                  className={classNames(
                    "relative h-7 w-2 rounded-full bg-opacity-40",
                    data?.type === "Urgent"
                      ? "bg-red-500"
                      : upcoming
                      ? "bg-green-400"
                      : "bg-cyan-400"
                  )}
                />
              </div>
            </>
          )}
        </div>
        <div className="date">
          <span>{data?.timestamp && format(data.timestamp, "MMM")}</span>
          <span>{data?.timestamp && format(data.timestamp, "d")}</span>
        </div>
      </div>
    </motion.div>
  );
}
