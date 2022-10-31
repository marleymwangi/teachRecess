//custom
import HomeworkStudent from "../child/HomeworkStudent";

export default function SectionHomeStudents({ list }) {
  return (
    <section className="grid gap-4">
      {list && list?.map((h, i) => <HomeworkStudent key={h + i} data={h} />)}
    </section>
  );
}
