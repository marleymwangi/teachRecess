import dynamic from "next/dynamic";
import { format } from "date-fns";
import { classNames } from "../../helpers/utility";
//dynamic
const BsBookmarkCheckFill = dynamic(
  async () => (await import("react-icons/bs")).BsBookmarkCheckFill
);

export default function CardReminder({ data, index }) {
  let type = index % 2;
  return (
    <div
      className={classNames(
        "relative px-6 py-4 flex items-center gap-4 shadow-xl rounded-l-xl",
        type
          ? "bg-gradient-to-r from-cyan-100 via-white to-transparent"
          : "bg-gradient-to-r from-sky-100 via-white to-transparent"
      )}
    >
      <div className="grid place-content-center">
        <div
          className={classNames(
            "p-4 rounded-full",
            type ? "bg-cyan-300 text-cyan-700" : "bg-sky-300 text-sky-700"
          )}
        >
          <BsBookmarkCheckFill size="1.5em" />
        </div>
      </div>
      <div className="flex-1">
        <p
          className={classNames(
            "text-sm font-poppins font-medium",
            type ? "text-cyan-500" : "text-sky-500"
          )}
        >
          {(data?.scope === "sch" && "School") ||
            (data?.scope === "cls" && "Class")}{" "}
          Activity
        </p>
        <p className="text-sm text-gray-500">
          {" "}
          <span className="font-medium">{data?.eventType}:</span>{" "}
          {data?.content}
        </p>
      </div>
      <div
        className={classNames(
          "text-center font-poppins rounded-lg py-1 px-3",
          type ? "bg-cyan-200" : "bg-sky-200"
        )}
      >
        <p
          className={classNames(
            "text-sm font-medium",
            type ? "text-cyan-800" : "text-sky-800"
          )}
        >
          {data?.timestamp && format(data.timestamp, "MMM")}
        </p>
        <p
          className={classNames(
            "font-bold text-2xl",
            type ? "text-cyan-800" : "text-sky-800"
          )}
        >
          {data?.timestamp && format(data.timestamp, "d")}
        </p>
        <p
          className={classNames(
            "text-xs font-medium",
            type ? "text-cyan-800" : "text-sky-800"
          )}
        >
          {data?.timestamp && format(data.timestamp, "eee")}
        </p>
      </div>
      <div
        className={classNames(
          "absolute right-0  w-1 h-full",
          type ? "bg-cyan-500" : "bg-sky-500"
        )}
      />
    </div>
  );
}
