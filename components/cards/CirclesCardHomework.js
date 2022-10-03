import { useState, useEffect } from "react";
import { useRouter } from "next/router";
//hooks
import useHomeworkFetch from "../../helpers/hooks/homework/homework";
//custom
import CirclesCard from "./CirclesCard";
import ImageLoader from "../elements/imageLoader";
import { formatSubjectNames, isEmpty } from "../../helpers/utility";

export default function CirclesCardHomework({ data }) {
  return <CirclesCard color="pink" content={<Homework data={data} />} />;
}

const Homework = ({ data }) => {
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

  const getImage = (name) => {
    let sub = subjects.find((s) => s.name === name);
    return sub?.image || "";
  };

  return (
    <div onClick={handleHomeWorkClick} className="relative z-10 p-6 font-medium">
      <div className="flex justify-center">
        <div className="flex text-white items-center gap-4">
          <div className="h-8 w-8 rounded-full bg-white p-1 shadow-lg">
            <ImageLoader src={getImage(data?.subject)} />
          </div>
          <p className="text-xl font-poppins font-medium">
            {formatSubjectNames(data?.subject)} Class
          </p>
        </div>
      </div>
      <div className="text-center grid grid-cols-2 mt-4">
        <div className="grid">
          <p className="text-gray-300 text-xs">
            {data?.type === "exer" && "Book"}
            {data?.type === "craft" && "Project"}
          </p>
          <p className="text-white text-sm">
            {data?.type === "exer" && data?.book}
            {data?.type === "craft" && data?.project}
          </p>
        </div>
        <div className="grid">
          <p className="text-gray-300 text-xs">
            {data?.type === "exer" && "Page(s)"}
            {data?.type === "craft" && "Materials"}
          </p>
          <p className="text-white text-sm">
            {data?.type === "exer" && data?.pages}
            {data?.type === "craft" && data?.materials}
          </p>
        </div>
      </div>
      <div className="mt-2 text-center">
        <p className="text-gray-300 text-xs">Instructions</p>
        <p className="text-white text-sm">{data?.instructions}</p>
      </div>
      <div className="mt-4 text-center grid place-content-center gap-2 xxs:grid-cols-3">
        <div>
          <p className="text-gray-300 text-xs">Issued On</p>
          <p className="text-white text-sm">{time?.issued}</p>
        </div>
        <div>
          <p className="text-gray-300 text-xs">Time Left</p>
          <p className="text-white text-sm">{time?.left}</p>
        </div>
        <div>
          <p className="text-gray-300 text-xs">Due On</p>
          <p className="text-white text-sm">{time?.due}</p>
        </div>
      </div>
    </div>
  );
};
