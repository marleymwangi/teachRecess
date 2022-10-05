import { useRouter } from "next/router";
import { useEffect, useState } from "react";
//hooks
import useTeacherFetch from "../../helpers/hooks/teacher";
//custom
import { isEmpty } from "../../helpers/utility";
import { useData } from "../../context/dataContext";
import { AuthGuard } from "../../components/elements/authGuard";
import RadialProgress from "../../components/elements/RadialProgress";
import CirclesCardHomework from "../../components/cards/CirclesCardHomework";
import SectionHomeStudents from "../../components/sections/SectionHomeStudents";

export default function Homework() {
  const router = useRouter();
  const { id } = router.query;

  const { selHomework, setSelHomework } = useData();
  const { teacher, students, classroom, getHomeworkById, getStudentsHomeworks } =
    useTeacherFetch();

  const [hmwrk, setHmwrk] = useState([]);
  const [percent, setPercent] = useState(0);
  const [over, setOver] = useState(0);

  useEffect(() => {
    if (students?.length > 0) {
      getStudentsHomeworks(id).then((res) => {
        setHmwrk(res);
      });
    }
  }, [id, students]);

  useEffect(() => {
    if (hmwrk?.length > 0) {
      getOverDue(hmwrk);
      getCompletePercentage();
    }
  }, [hmwrk]);

  useEffect(() => {
    if (id?.length > 0 && isEmpty(selHomework)) {
      let d = getHomeworkById(id);
      d && setSelHomework(d);
    }
  }, [id, teacher, selHomework, setSelHomework, getHomeworkById]);

  const getOverDue = () => {
    let tmp = hmwrk.filter((diary) => diary.overdue === true);
    setOver(tmp.length);
  };

  const getPercentage = (a, b) => {
    return Number(Math.round((a / b) * 100 + "e2") + "e-2")
      ? Number(Math.round((a / b) * 100 + "e2") + "e-2")
      : 0;
  };

  const getCompletePercentage = () => {
    let comp = hmwrk.filter((diary) => diary.complete === true);
    let perc = getPercentage(comp.length, hmwrk.length);
    setPercent(perc);
  };

  return (
    <AuthGuard>
      <main className="min-h-[95vh] py-20">
        <section className="top_section px-4">
          <div className="flex items-center">
            {!classroom?.name && (
              <span className="bg-gray-300 animate-pulse rounded w-10 h-5"></span>
            )}
            <p className="font-bold text-xl font-nexa text-emma-700">
              {classroom?.name}{" "}
              <span className="text-emma-500 font-medium">Homework</span>
            </p>
          </div>
          <div className="flex justify-around ">
            <div className="text-emma-600">
              <div className="h-20 w-20 grid place-content-center rounded-full bg-gray-200 my-2 shadow-md">
                <div className="my-2">
                  <RadialProgress number={percent} />
                </div>
              </div>
              <p className="text-center text-sm">completed</p>
            </div>
            <div className="text-error">
              <div className="h-20 w-20 rounded-full bg-gray-200 my-2 grid place-content-center shadow-md">
                <span className="text-6xl">{over}</span>
              </div>
              <p className="text-center text-sm">overdue</p>
            </div>
          </div>
          <div className="my-6">
            <CirclesCardHomework color="emma" data={selHomework} instr />
          </div>
          <div className="my-6">
            <SectionHomeStudents list={hmwrk}/>
          </div>
        </section>
      </main>
    </AuthGuard>
  );
}
