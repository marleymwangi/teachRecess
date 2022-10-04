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
  const [diary, setDiary] = useState({});
  const { getStudentDiary } = useHomeworkFetch();

  useEffect(() => {
    getStudentDiary(data.id, id).then((res) => setDiary(res));
  }, []);

  return (
    <div className="relative flex gap-2 items-center py-4 px-4 rounded-l-full shadow-lg bg-gradient-to-r from-yellow-200 via-white to-white">
      <div className="avatar">
        <div className="w-14 rounded-full shadow-lg">
          <ImageLoader src={data?.image} objectPosition={"top"} />
        </div>
      </div>
      <p className="text-yellow-500 flex-1 font-semibold">{data?.name}</p>
      <div className="flex items-center">
        <p
          className={classNames(
            "capitalize text-sm font-semibold",
            diary?.complete ? "text-yellow-600" : "text-gray-400"
          )}
        >
          {diary?.complete ? "complete" : "incomplete"}
        </p>
        <div
          className={classNames(
            "swap min-w-[20px]",
            diary?.complete ? "text-yellow-600" : "text-gray-400"
          )}
        >
          <IoCheckmarkDoneCircle className="swap-on" size="2em" />
          <IoCheckmarkDoneCircleOutline className="swap-off" size="2em" />
        </div>
      </div>
      <div className="absolute h-full w-1 right-0 bg-yellow-500"/>
    </div>
  );
}
