import { useRouter } from "next/router";
import { useEffect, useState } from "react";
//hooks
import useStudentFetch from "../../helpers/hooks/students/student";
import useStudentsFetch from "../../helpers/hooks/students/students";
//custom
import { formatSubjectNames, isEmpty } from "../../helpers/utility";
import { useData } from "../../context/dataContext";
import { AuthGuard } from "../../components/elements/authGuard";
import ImageLoader from "../../components/elements/imageLoader";
import CirclesCardHomework from "../../components/cards/CirclesCardHomework";
import CarouselHomework from "../../components/carousel/homework";
import RadialProgress from "../../components/elements/radialProgress";
import useTeacherFetch from "../../helpers/hooks/teacher";
import useHomeworkFetch from "../../helpers/hooks/homework/homework";
import SectionHomeStudents from "../../components/sections/SectionHomeStudents";

export default function Homework() {
  const router = useRouter();
  const { id } = router.query;

  const { selDiary, setSelDiary } = useData();
  const { diaries, classroom } = useTeacherFetch();

  return (
    <AuthGuard>
      <main className="py-20">
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
          <div className="my-6 grid gap-4">
            {diaries.map((d) => (
              <CirclesCardHomework key={d.id} data={d}/>
            ))}
          </div>
        </section>
      </main>
    </AuthGuard>
  );
}
