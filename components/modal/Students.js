import { useState } from "react";
//hooks
import useUserFetch from "../../helpers/hooks/user";
import useClassroomFetch from "../../helpers/hooks/classroom";
//context
import { useData } from "../../context/dataContext";
//custom
import StudentSelector from "../child/Selector";
//dynamic

export default function ModalStudents() {
  const { user } = useUserFetch();
  const { selStudents, setSelStudents } = useData();
  const { students, studPending } = useClassroomFetch(user);
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  let filtered =
    text.length > 0
      ? students.filter((stud) => {
          return stud.name.toLowerCase().includes(text.toLowerCase());
        })
      : students;

  const handleCloseModal = () => {
    document.getElementById("students_modal").checked = false;
  };

  //function that receives the selected student checks if student exists in selected array before adding
  const handleSelect = (student) => {
    if (selStudents.includes(student)) {
      setSelStudents(selStudents.filter((stud) => stud !== student));
    } else {
      setSelStudents([...selStudents, student]);
    }
  };

  return (
    <div>
      <input type="checkbox" id="students_modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box pb-20 bg-gray-100">
          <div className="flex items-center justify-between pb-6">
            <p className="text-lg text-gray-400">Select Students</p>
            <label
              htmlFor="students_modal"
              className="btn btn-sm btn-primary btn-outline btn-circle shadow-md"
            >
              ✕
            </label>
          </div>
          <div className="grid gap-4 w-full text-center text-primary font-poppins">
            <div className="relative form-control w-full">
              <input
                type="text"
                placeholder=" "
                onChange={handleChange}
                className="block rounded-lg px-2.5 pb-2.5 pt-6 w-full text-sm bg-white border focus:border-2 appearance-none focus:outline-none focus:ring-0 peer text-cyan-500 border-cyan-500 focus:border-cyan-500"
              />
              <label className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] left-2.5  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-cyan-700 peer-focus:text-cyan-600">
                Search
              </label>
            </div>
            <section className="grid gap-4">
              {studPending ? (
                <p>Loading</p>
              ) : (
                filtered.map((stud) => (
                  <StudentSelector
                    key={stud.id}
                    data={stud}
                    handleSelect={handleSelect}
                    selected={selStudents.includes(stud)}
                  />
                ))
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
