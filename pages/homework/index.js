import { useRouter } from "next/router";
import { useEffect, useState } from "react";
//hooks
import useTeacherFetch from "../../helpers/hooks/teacher";
import useHomeworkFetch from "../../helpers/hooks/homework/homework";
import useStudentFetch from "../../helpers/hooks/students/student";
//custom
import { isEmpty } from "../../helpers/utility";
import { useData } from "../../context/dataContext";
import { AuthGuard } from "../../components/elements/authGuard";
import CirclesCardHomework from "../../components/cards/CirclesCardHomework";
import SectionHomeStudents from "../../components/sections/SectionHomeStudents";

export default function Homework() {
  const router = useRouter();
  const { id } = router.query;

  const { selDiary, setSelDiary } = useData();
  const { teacher, students, classroom, getDiaryById } = useTeacherFetch();
  const { homework } = useHomeworkFetch(teacher?.schoolId, teacher?.classId, id)
  const { diaries } = useStudentFetch();

  const [percent, setPercent] = useState(0);
  const [over, setOver] = useState(0);

  useEffect(() => {
    if (diaries?.length > 0) {
      getOverDue(diaries);
      getCompletePercentage();
    }
  }, [diaries]);

  useEffect(() => {
    if (id?.length > 0 && isEmpty(selDiary)) {
      let d = getDiaryById(id);
      d && setSelDiary(d);
    }
    
  }, [id, teacher, selDiary, setSelDiary, getDiaryById]);

  const getOverDue = () => {
    let tmp = diaries.filter((diary) => diary.overdue === true);
    setOver(tmp.length);
  };

  const getPercentage = (a, b) => {
    return Number(Math.round((a / b) * 100 + "e2") + "e-2")
      ? Number(Math.round((a / b) * 100 + "e2") + "e-2")
      : 0;
  };

  const getCompletePercentage = () => {
    let comp = diaries.filter((diary) => diary.complete === true);
    let perc = getPercentage(comp.length, diaries.length);
    setPercent(perc);
  };

  console.log(selDiary)

  return (
    <AuthGuard>
      <main className="min-h-[95vh] py-20">
        <section className="top_section px-4">
          <div className="flex items-center">
            {!classroom?.name && (
              <span className="bg-gray-300 animate-pulse rounded w-10 h-5"></span>
            )}
            <p className="font-bold text-xl font-nexa">
              {classroom?.name}{" "}
              <span className="text-gray-500 font-medium">Homework</span>
            </p>
          </div>
          <div className="my-6">
            <CirclesCardHomework data={selDiary}/>
          </div>
          <div className="my-6">
            <SectionHomeStudents id={id} />
          </div>
        </section>
      </main>
    </AuthGuard>
  );
}
