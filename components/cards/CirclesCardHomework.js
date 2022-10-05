import { useState, useEffect } from "react";
import { useRouter } from "next/router";
//hooks
import useHomeworkFetch from "../../helpers/hooks/homework/homework";
//custom
import CirclesCard from "./CirclesCard";
import ImageLoader from "../elements/imageLoader";
import { formatSubjectNames, isEmpty, classNames } from "../../helpers/utility";

export default function CirclesCardHomework({ data, index, color, instr }) {
  let colors = ["emma", "teal", "cyan"];
  return (
    <CirclesCard
      color={color || colors[index % colors.length]}
      content={<Homework data={data} index={index} instr={instr}/>}
    />
  );
}

const Homework = ({ data, index, instr }) => {
  const router = useRouter();
  const [time, setTime] = useState();
  const { getTimeFormatted } = useHomeworkFetch();

  useEffect(() => {
    if (
      !isEmpty(data) &&
      data.timestamp instanceof Date &&
      data.due instanceof Date
    ) {
      let t = getTimeFormatted(data.timestamp, data.due);
      setTime(t);
    }
  }, [data]);

  const handleHomeWorkClick = () => {
    router.push(`/homework/?id=${data?.id}`);
  };

  const subjects = [
    {
      name: "math",
      image: "/images/subjects/math.webp",
    },
    {
      name: "swahili",
      image: "/images/subjects/swa.webp",
    },
    {
      name: "english",
      image: "/images/subjects/eng.webp",
    },
    {
      name: "hygiene",
      image: "/images/subjects/hyg.webp",
    },
    {
      name: "science",
      image: "/images/subjects/atom.webp",
    },
    {
      name: "enviromental",
      image: "/images/subjects/env.webp",
    },
    {
      name: "religious",
      image: "/images/subjects/re.webp",
    },
    {
      name: "career",
      image: "/images/subjects/car.webp",
    },
  ];

  let colors = ["emma", "teal", "cyan"];

  const getTextDark = () => {
    switch (colors[index % colors.length]) {
      case "emma":
        return "text-emma-900";
      case "teal":
        return "text-teal-900";
      case "cyan":
        return "text-cyan-900";
      default:
        return "text-emma-900";
    }
  };

  const getTextLight = () => {
    switch (colors[index % colors.length]) {
      case "emma":
        return "text-emma-700";
      case "teal":
        return "text-teal-700";
      case "cyan":
        return "text-cyan-700";
      default:
        return "text-emma-700";
    }
  };

  const getBackGround = () => {
    switch (colors[index % colors.length]) {
      case "emma":
        return "bg-emma-50";
      case "teal":
        return "bg-teal-50";
      case "cyan":
        return "bg-cyan-50";
      default:
        return "bg-emma-50";
    }
  };

  const getImage = (name) => {
    let sub = subjects.find((s) => s.name === name);
    return sub?.image || "";
  };

  return (
    <div
      onClick={handleHomeWorkClick}
      className="relative z-10 p-6 font-medium"
    >
      <div className="flex justify-center">
        <div className="flex text-white items-center gap-4">
          <div
            className={classNames(
              "h-10 w-10 rounded-full p-1 shadow-lg",
              getBackGround()
            )}
          >
            <ImageLoader src={getImage(data?.subject)} />
          </div>
          <p
            className={classNames(
              "text-xl font-inter font-medium",
              getTextDark()
            )}
          >
            {formatSubjectNames(data?.subject)} Class
          </p>
        </div>
      </div>
      <div className="text-center grid grid-cols-2 mt-4">
        <div className="grid">
          <p className={classNames("text-xs", getTextLight())}>
            {data?.type === "exer" && "Book"}
            {data?.type === "craft" && "Project"}
          </p>
          <p className={classNames("text-sm", getTextDark())}>
            {data?.type === "exer" && data?.book}
            {data?.type === "craft" && data?.project}
          </p>
        </div>
        <div className="grid">
          <p className={classNames("text-xs", getTextLight())}>
            {data?.type === "exer" && "Page(s)"}
            {data?.type === "craft" && "Materials"}
          </p>
          <p className={classNames("text-sm", getTextDark())}>
            {data?.type === "exer" && data?.pages}
            {data?.type === "craft" && data?.materials}
          </p>
        </div>
      </div>
      {instr && (
        <div className="mt-2 text-center">
          <p className={classNames("text-xs", getTextLight())}>Instructions</p>
          <p className={classNames("text-sm", getTextDark())}>
            {data?.instructions}
          </p>
        </div>
      )}
      <div className="mt-4 text-center grid place-content-center gap-2 xxs:grid-cols-3">
        <div>
          <p className={classNames("text-xs", getTextLight())}>Issued On</p>
          <p className={classNames("text-sm", getTextDark())}>{time?.issued}</p>
        </div>
        <div>
          <p className={classNames("text-xs", getTextLight())}>Time Left</p>
          <p className={classNames("text-sm", getTextDark())}>{time?.left}</p>
        </div>
        <div>
          <p className={classNames("text-xs", getTextLight())}>Due On</p>
          <p className={classNames("text-sm", getTextDark())}>{time?.due}</p>
        </div>
      </div>
    </div>
  );
};
