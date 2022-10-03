import { useEffect } from "react";
import { LayoutGroup } from "framer-motion";
//hooks
import useStudentsFetch from "../../helpers/hooks/students/students";
//custom
import Status from "./status";
import { isEmpty } from "../../helpers/utility";
import { useData } from "../../context/dataContext";

export default function ProfileSwitch() {
  const { students, pending } = useStudentsFetch();
  const { selStudent, setSelStudent } = useData();

  useEffect(() => {
    if (isEmpty(selStudent) && students?.length > 0) {
      setSelStudent(students[0]);
    }
  }, [students, selStudent, setSelStudent]);

  return (
    <section className="overflow-x-scroll no-scroll px-6 md:px-0">
      <LayoutGroup>
        <ul className="relative flex w-full gap-6 justify-start md:justify-center ml-50 pb-6">
          {pending ? (
            <Status data={{}} />
          ) : (
            students.length > 0 &&
            students.map((student, i) => (
              <Status key={student.id} index={i} data={student} />
            ))
          )}
        </ul>
      </LayoutGroup>
    </section>
  );
}
