import dynamic from "next/dynamic";
import { classNames } from "../../helpers/utility";
//dynamic
const FaSwimmer = dynamic(
  async () => (await import("react-icons/fa")).FaSwimmer
);
const BiFootball = dynamic(
  async () => (await import("react-icons/bi")).BiFootball
);

export default function CardReminder({ data, type }) {
  return (
    <div
      className={classNames(
        "relative px-6 py-4 flex items-center gap-4 shadow-xl rounded-l-xl",
        type === "secondary" &&
          "bg-gradient-to-r from-blue-100 via-white to-transparent",
        type === "primary" &&
          "bg-gradient-to-r from-yellow-100 via-white to-transparent"
      )}
    >
      <div className="grid place-content-center">
        <div
          className={classNames(
            "p-4 rounded-full",
            type === "secondary" && "bg-sky-300 text-sky-700",
            type === "primary" && "bg-yellow-300 text-yellow-700"
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
            type === "secondary" && "text-sky-500",
            type === "primary" && "text-yellow-500"
          )}
        >
          {data?.scope} Activity
        </p>
        <p className="text-sm text-gray-500">
          {data?.content}
        </p>
      </div>
      <div
        className={classNames(
          "text-center font-poppins rounded-lg py-1 px-3",
          type === "secondary" && "bg-sky-200",
          type === "primary" && "bg-yellow-200"
        )}
      >
        <p
          className={classNames(
            "text-sm font-medium",
            type === "secondary" && "text-sky-800",
            type === "primary" && "text-yellow-800"
          )}
        >
          Sep
        </p>
        <p
          className={classNames(
            "font-bold text-2xl",
            type === "secondary" && "text-sky-800",
            type === "primary" && "text-yellow-800"
          )}
        >
          27
        </p>
        <p
          className={classNames(
            "text-xs text-sky-800 font-medium",
            type === "secondary" && "text-sky-800",
            type === "primary" && "text-yellow-800"
          )}
        >
          Tue
        </p>
      </div>
      <div
        className={classNames(
          "absolute right-0  w-1 h-full",
          type === "secondary" && "bg-secondary",
          type === "primary" && "bg-primary"
        )}
      />
    </div>
  );
}
