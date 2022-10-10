import dynamic from "next/dynamic";
import { format } from "date-fns";
import { classNames } from "../../helpers/utility";
//dynamic
const FaSwimmer = dynamic(
  async () => (await import("react-icons/fa")).FaSwimmer
);
const BiFootball = dynamic(
  async () => (await import("react-icons/bi")).BiFootball
);

export default function CardReminder({ data, index }) {
  let type = index % 2;
  return (
    <div
      className={classNames(
        "relative px-6 py-4 flex items-center gap-4 shadow-xl rounded-l-xl",
        type
          ? "bg-gradient-to-r from-emma-100 via-white to-transparent"
          : "bg-gradient-to-r from-emerald-100 via-white to-transparent"
      )}
    >
      <div className="grid place-content-center">
        <div
          className={classNames(
            "p-4 rounded-full",
            type
              ? "bg-emma-300 text-emma-700"
              : "bg-emerald-300 text-emerald-700"
          )}
        >
          {type === "secondary" && <FaSwimmer size="1.5em" />}
          {type === "primary" && <BiFootball size="1.5em" />}
        </div>
      </div>
      <div className="flex-1">
        <p
          className={classNames(
            "text-sm font-poppins font-medium",
            type ? "text-emma-500" : "text-emerald-500"
          )}
        >
          {(data?.scope === "sch" && "School") ||
            (data?.scope === "cls" && "Class")}{" "}
          Activity
        </p>
        <p className="text-sm text-gray-500">{data?.content}</p>
      </div>
      <div
        className={classNames(
          "text-center font-poppins rounded-lg py-1 px-3",
          type ? "bg-emma-200" : "bg-emerald-200"
        )}
      >
        <p
          className={classNames(
            "text-sm font-medium",
            type ? "text-emma-800" : "text-emerald-800"
          )}
        >
          {data?.timestamp && format(data.timestamp, "MMM")}
        </p>
        <p
          className={classNames(
            "font-bold text-2xl",
            type ? "text-emma-800" : "text-emerald-800"
          )}
        >
          {data?.timestamp && format(data.timestamp, "d")}
        </p>
        <p
          className={classNames(
            "text-xs font-medium",
            type ? "text-emma-800" : "text-emerald-800"
          )}
        >
          {data?.timestamp && format(data.timestamp, "eee")}
        </p>
      </div>
      <div
        className={classNames(
          "absolute right-0  w-1 h-full",
          type ? "bg-emma-500" : "bg-emerald-500"
        )}
      />
    </div>
  );
}
