import { useEffect, useState } from "react";
//custom
import useStudentsFetch from "../../helpers/hooks/students/students";
import Contact from "../elements/contact";

export default function ModalContact() {
  const [teachers, setTeachers] = useState([]);

  const { students } = useStudentsFetch();

  useEffect(() => {
    if (students) {
      let res = mergeStudents(students);
      setTeachers(res);
    }
  }, [students]);

  const mergeStudents = (teachs) => {
    const result = teachs.reduce((acc, curr) => {
      const { schoolId, classId, name } = curr;
      const findObj = acc.find((o) => o?.info?.schoolId === schoolId && o?.info?.classId === classId);
      if (!findObj) {
        acc.push({ info: { schoolId, classId }, students:[name] });
      } else {
        findObj.students.push(name);
      }
      return acc;
    }, []);
    return result;
  };

  const handleCloseModal = () => {
    document.getElementById("contact_modal").checked = false;
  };

  return (
    <div>
      <input type="checkbox" id="contact_modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-gray-100 pb-20">
          <div className="flex items-center justify-between pb-6">
            <p className="text-lg text-secondary">Select Contact</p>
            <label
              htmlFor="contact_modal"
              className="btn btn-sm btn-secondary btn-outline btn-circle"
            >
              ✕
            </label>
          </div>
          <section className="grid gap-6 custom-scroll">
            {teachers?.length > 0 &&
              teachers.map((t, i) => (
                <Contact
                  key={i}
                  data={t}
                  handleClose={handleCloseModal}
                />
              ))}
          </section>
        </div>
      </div>
    </div>
  );
}
