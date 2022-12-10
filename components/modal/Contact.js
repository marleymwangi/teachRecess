import { useEffect, useState } from "react";
//hooks
import { useAuth } from "../../context/authContext";
import useClassroomFetch from "../../helpers/hooks/classroom";
//custom
import Contact from "../elements/Contact";
import useUserFetch from "../../helpers/hooks/user";

export default function ModalContact() {
  const { user: session } = useAuth();
  const [guardians, setGuardians] = useState([]);

  const { user } = useUserFetch();
  const { students } = useClassroomFetch(user);

  useEffect(() => {
    if (students.length > 0) {
      let res = mergeGuardiansStudents(students);
      setGuardians(res);
    }
  }, [students]);

  const mergeGuardiansStudents = (studs) => {
    const result = studs.reduce((acc, curr) => {
      const { name, guardians } = curr;

      guardians.forEach((g) => {
        const findObj = acc.find((o) => o.guardian === g);

        if (g !== session?.user?.id) {
          if (!findObj) {
            let obj = {};
            obj.guardian = g;
            obj.students = [name];
            acc.push(obj);
          } else {
            findObj.students.push(name);
          }
        }
      });

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
            <p className="text-lg text-cyan-600">Select Contact</p>
            <label
              htmlFor="contact_modal"
              className="btn btn-sm btn-primary btn-outline btn-circle"
            >
              ✕
            </label>
          </div>
          <section className="grid gap-3 custom-scroll">
            {guardians?.length > 0 &&
              guardians.map((t, i) => (
                <Contact key={i} data={t} handleClose={handleCloseModal} />
              ))}
          </section>
        </div>
      </div>
    </div>
  );
}
