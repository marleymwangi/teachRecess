import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useRouter } from "next/router";
//hooks
import useStudentFetch from "../../helpers/hooks/students/student";
import useStudentsFetch from "../../helpers/hooks/students/students";
//custom
import { isEmpty } from "../../helpers/utility";
import { useData } from "../../context/dataContext";
import CardProject from "../../components/cards/project";
import ImageLoader from "../../components/elements/imageLoader";
import { AuthGuard } from "../../components/elements/authGuard";
//icons
import { BsCameraFill } from "react-icons/bs";
//dynamic
const RiSearch2Line = dynamic(
  async () => (await import("react-icons/ri")).RiSearch2Line
);

export default function Portfolio() {
  const router = useRouter();
  const { id } = router.query;

  const { students, getStudentById } = useStudentsFetch();
  const { student, portfolio } = useStudentFetch();
  const { selStudent, setSelStudent } = useData();

  useEffect(() => {
    if (id?.length > 0 && isEmpty(selStudent)) {
      let stud = getStudentById(id);
      stud && setSelStudent(stud);
    }
  }, [id, students, selStudent, setSelStudent, getStudentById]);

  return (
    <AuthGuard>
      <main className="pt-20 pb-4">
        <section className="top_section pb-4 px-4">
          <div className="flex justify-between">
            <div className="flex items-center">
              <div className="avatar mr-2">
                <div className="w-10 mask mask-squircle">
                  <ImageLoader src={student?.image} />
                </div>
              </div>
              {!selStudent?.name && (
                <span className="bg-gray-300 animate-pulse rounded w-10 h-5"></span>
              )}
              <p className="font-bold text-xl text-cyan-700 font-nexa">
                {selStudent?.name || ""}
                {"'s"}{" "}
                <span className="text-cyan-500 font-medium">Portfolio</span>
              </p>
            </div>
            <label
              htmlFor="photo_modal"
              className="btn btn-circle btn-secondary border-2 btn-outline modal-button"
            >
              <BsCameraFill size="2em" />
            </label>
          </div>
        </section>
        <section className="bg-gray-200 overflow-hidden p-4 mb-10">
          <div className="bg-white w-4/5 mx-auto rounded-full mb-4 flex items-center p-2">
            <RiSearch2Line size="1.5em" />
          </div>
          <div className="flex flex-col gap-4 pt-4 port-height overflow-y-scroll">
            {portfolio?.length > 0 &&
              portfolio.map((p) => <CardProject key={p.id} data={p} />)}
          </div>
        </section>
      </main>
    </AuthGuard>
  );
}
