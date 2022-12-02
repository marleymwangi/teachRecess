import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
//custom
import { classNames } from "../../helpers/utility";
import ImageLoader from "../elements/imageLoader";
//dynamic
const IoCheckmarkDoneCircleOutline = dynamic(
  async () => (await import("react-icons/io5")).IoCheckmarkDoneCircleOutline
);
const IoCheckmarkDoneCircle = dynamic(
  async () => (await import("react-icons/io5")).IoCheckmarkDoneCircle
);

export default function HomeworkStudent({ data, completed }) {
  let complete = completed?.length > 0 && completed.some((id) => id === data?.id);
  return (
    <div className="relative flex gap-2 items-center py-4 px-4 rounded-l-xl shadow-lg bg-gradient-to-r from-cyan-200 via-cyan-100 to-white">
      <div className="avatar">
        <div className="w-10 rounded-full shadow-lg">
          <ImageLoader src={data?.image} objectPosition={"top"} />
        </div>
      </div>
      <p className="text-cyan-700 flex-1 font-semibold">{data?.name}</p>
      <div className="flex items-center">
        <p
          className={classNames(
            "capitalize text-sm font-semibold",
            complete ? "text-cyan-600" : "text-cyan-300"
          )}
        >
          {complete ? "complete" : "incomplete"}
        </p>
        <div
          className={classNames(
            "swap min-w-[20px]",
            complete ? "text-cyan-600" : "text-cyan-300"
          )}
        >
          <IoCheckmarkDoneCircle className="swap-on" size="2em" />
          <IoCheckmarkDoneCircleOutline className="swap-off" size="2em" />
        </div>
      </div>
      <div
        className={classNames(
          "absolute h-full w-1 right-0",
          complete ? "bg-cyan-500" : "bg-cyan-300"
        )}
      />
    </div>
  );
}
