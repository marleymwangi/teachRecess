//custom
import HomeworkStudent from "../child/HomeworkStudent";

export default function SectionHomeStudents({ students, completed }) {
  return (
    <section className="grid gap-4">
      {students?.length > 0 &&
        students?.map((h, i) => (
          <HomeworkStudent key={h + i} data={h} completed={completed} />
        ))}
    </section>
  );
}
