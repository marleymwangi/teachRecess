import { useRouter } from "next/router";
import { useEffect, useState } from "react";
//hooks
import useUserFetch from "../../helpers/hooks/user";
import useClassroomFetch from "../../helpers/hooks/classroom";
import useHomeworkFetch from "../../helpers/hooks/homework";
//custom
import { isEmpty } from "../../helpers/utility";
import { useData } from "../../context/dataContext";
import { AuthGuard } from "../../components/elements/authGuard";
import RadialProgress from "../../components/elements/RadialProgress";
import SectionHomeStudents from "../../components/sections/SectionHomeStudents";
import SquareCardHomeWork from "../../components/cards/SquareCardHomeWork";

export default function Homework() {
  const router = useRouter();
  const { id } = router.query;

  const { selHomework, setSelHomework } = useData();
  const { user } = useUserFetch();
  const { students, classroom, getHomeworkById } = useClassroomFetch(user);
  const { homework } = useHomeworkFetch(
    user?.school_id,
    user?.class?.id,
    id
  );

  const [percent, setPercent] = useState(0);
  const [over, setOver] = useState(0);

  useEffect(() => {
    if (students?.length > 0 && homework) {
      getCompletePercentage();
      getOverDue();
    }
  }, [id, students, homework]);

  useEffect(() => {
    if (id?.length > 0 && isEmpty(selHomework)) {
      let d = getHomeworkById(id);
      d && setSelHomework(d);
    }
  }, [id, user, selHomework, setSelHomework, getHomeworkById]);

  const getOverDue = () => {
    let tmp = homework?.overdue
      ? students.length - homework?.completed?.length || 0
      : 0;
    setOver(tmp);
  };

  const getPercentage = (a, b) => {
    return Number(Math.round((a / b) * 100 + "e2") + "e-2")
      ? Number(Math.round((a / b) * 100 + "e2") + "e-2")
      : 0;
  };

  const getCompletePercentage = () => {
    let perc = getPercentage(homework?.completed?.length || 0, students.length);
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
            <p className="font-bold text-xl font-nexa text-cyan-700">
              {classroom?.name}{" "}
              <span className="text-cyan-500 font-medium">Homework</span>
            </p>
          </div>
          <div className="flex justify-around ">
            <div className="text-cyan-600">
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
            <SquareCardHomeWork data={homework} instr />
          </div>
          <div className="my-6">
            <SectionHomeStudents
              students={students}
              completed={homework?.completed}
            />
          </div>
        </section>
      </main>
    </AuthGuard>
  );
}
