//hook
import useTeacherFetch from "../../helpers/hooks/teacher";
import HomeworkStudent from "../cards/HomeworkStudent";

export default function SectionHomeStudents({id}) {
  const { students } = useTeacherFetch();
  return (
    <section className="grid gap-4">
      {students.map((s) => (
        <HomeworkStudent key={s.id} id={id} data={s}/>
      ))}
    </section>
  );
}
