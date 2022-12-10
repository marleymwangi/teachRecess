import { useState } from "react";
import dynamic from "next/dynamic";
//hooks
import useUserFetch from "../../helpers/hooks/user";
import useClassroomFetch from "../../helpers/hooks/classroom";
//custom
import Profile from "../../components/child/Profile";
import { AuthGuard } from "../../components/elements/AuthGuard";
//dynamic
const FaSearch = dynamic(async () => (await import("react-icons/fa")).FaSearch);

export default function Profiles() {
  const { user } = useUserFetch();
  const { students } = useClassroomFetch(user);
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

  return (
    <AuthGuard>
      <main className="min-h-[95vh] py-20 px-6 flex flex-col gap-4 items-start">
        <section className="w-full px-2 pb-2">
          <div className="rounded-full bg-white p-1 flex justify-between shadow-lg">
            <textarea
              value={text}
              type="text"
              onChange={handleChange}
              placeholder="Type here"
              className="input pt-2 resize-none rounded-full input-outline w-full flex-1"
            />
            <button className="btn btn-primary text-white btn-circle ml-2">
              <FaSearch size="1.5em" />
            </button>
          </div>
        </section>
        {filtered.map((stud) => (
          <Profile key={stud.id} data={stud} />
        ))}
      </main>
    </AuthGuard>
  );
}
