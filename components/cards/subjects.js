import { LayoutGroup } from "framer-motion";
//hooks
import useStudentFetch from "../../helpers/hooks/students/student";
//custom
import Subject from "./subject";
import { useData } from "../../context/dataContext";

export default function Subjects() {
  const { selStudent } = useData();
  const { diaries } = useStudentFetch(selStudent?.id);

  let eng = diaries?.filter((d) => d.subject === "English");
  let math = diaries?.filter((d) => d.subject === "Mathematics");
  let swa = diaries?.filter((d) => d.subject === "Kiswahili");
  let hyg = diaries?.filter((d) => d.subject === "Hygiene");
  let sci = diaries?.filter((d) => d.subject === "Science");
  let env = diaries?.filter((d) => d.subject === "Evironment");
  let re = diaries?.filter((d) => d.subject === "Religious Education");
  let car = diaries?.filter((d) => d.subject === "Career");

  const subjects = [
    {
      name: "math",
      list: math,
      image: "/images/subjects/math.webp",
    },
    {
      name: "swahili",
      list: swa,
      image: "/images/subjects/swa.webp",
    },
    {
      name: "english",
      list: eng,
      image: "/images/subjects/eng.webp",
    },
    {
      name: "hygiene",
      list: hyg,
      image: "/images/subjects/hyg.webp",
    },
    {
      name: "science",
      list: sci,
      image: "/images/subjects/atom.webp",
    },
    {
      name: "enviromental",
      list: env,
      image: "/images/subjects/env.webp",
    },
    {
      name: "religious",
      list: re,
      image: "/images/subjects/re.webp",
    },
    {
      name: "career",
      list: car,
      image: "/images/subjects/car.webp",
    },
  ];

  let sorted = subjects.sort(function (a, b) {
    return b.list.length - a.list.length;
  });

  return (
    <div className="">
      <p className="font-semibold text-gray-500 text-2xl mb-2 font-inter">
        Subjects
      </p>
      <div className="max-w-screen grid xxs:grid-cols-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 pt-4 rounded-box">
        <LayoutGroup>
          {sorted.slice(0, 4).map((subject, i) => (
            <Subject
              key={i}
              index={i}
              count={subject.list.length}
              data={{ name: subject.name, image: subject.image }}
            />
          ))}
        </LayoutGroup>
      </div>
    </div>
  );
}
