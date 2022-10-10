import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
//hooks
import useHomeworkFetch from "../../helpers/hooks/homework/homework";
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

export default function HomeworkStudent({ data, id }) {

  return (
    <div className="relative flex gap-2 items-center py-4 px-4 rounded-l-xl shadow-lg bg-gradient-to-r from-emma-200 via-emma-100 to-white">
      <div className="avatar">
        <div className="w-10 rounded-full shadow-lg">
          <ImageLoader src={data?.student?.image} objectPosition={"top"} />
        </div>
      </div>
      <p className="text-emma-700 flex-1 font-semibold">{data?.student?.name}</p>
      <div className="flex items-center">
        <p
          className={classNames(
            "capitalize text-sm font-semibold",
            data?.complete ? "text-emma-600" : "text-emma-300"
          )}
        >
          {data?.complete ? "complete" : "incomplete"}
        </p>
        <div
          className={classNames(
            "swap min-w-[20px]",
            data?.complete ? "text-emma-600" : "text-emma-300"
          )}
        >
          <IoCheckmarkDoneCircle className="swap-on" size="2em" />
          <IoCheckmarkDoneCircleOutline className="swap-off" size="2em" />
        </div>
      </div>
      <div
        className={classNames(
          "absolute h-full w-1 right-0",
          data?.complete ? "bg-emma-500" : "bg-emma-300"
        )}
      />
    </div>
  );
}
