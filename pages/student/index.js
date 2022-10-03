import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
//hooks
import useStudentFetch from "../../helpers/hooks/students/student";
import useStudentsFetch from "../../helpers/hooks/students/students";
//custom
import { isEmpty } from "../../helpers/utility";
import UserWarn from "../../components/users/warn";
import { useData } from "../../context/dataContext";
import { AuthGuard } from "../../components/elements/authGuard";
import ImageLoader from "../../components/elements/imageLoader";
//icons
import { FaBriefcaseMedical } from "react-icons/fa";
import { MdPhotoAlbum } from "react-icons/md";
import { GoGraph } from "react-icons/go";

export default function StudentProfile() {
  const router = useRouter();
  const { id } = router.query;

  const { students, getStudentById } = useStudentsFetch();
  const { student, school, classroom } = useStudentFetch();
  const { selStudent, setSelStudent } = useData();

  useEffect(() => {
    if (id?.length > 0 && isEmpty(selStudent)) {
      let stud = getStudentById(id);
      stud && setSelStudent(stud);
    }
  }, [id, students, selStudent, setSelStudent, getStudentById]);

  return (
    <AuthGuard>
      <main className="py-20">
        <section className="flex flex-col items-center">
          <div className="avatar">
            <div className="w-24 mask mask-squircle">
              <ImageLoader src={student?.image} />
            </div>
          </div>
          {!student?.name && (
            <span className="bg-gray-300 animate-pulse my-2 rounded w-12 h-7" />
          )}
          {student?.name && (
            <p className="font-semibold text-2xl my-2 font-poppins">
              {student?.name}
            </p>
          )}
          <div className="flex items-center gap-2 text-sm text-gray-400">
            {!school?.name && (
              <span className="bg-gray-300 animate-pulse rounded w-12 h-5" />
            )}
            {school?.name && <span>{school?.name}</span>}
            {" . "}
            {!classroom?.name && (
              <span className="bg-gray-300 animate-pulse rounded w-7 h-5" />
            )}
            {classroom?.name && <span>{classroom?.name}</span>}
          </div>
        </section>
        <section className="p-6">
          <div className="grid grid-cols-3 gap-4">
            <Link href={"/student/medical?id=" + student?.id}>
              <motion.div
                initial="hide"
                animate="rest"
                whileTap="tap"
                variants={buttonAnim}
                className="p-2 bg-pink-500 bg-opacity-90 rounded-box shadow-xl text-white"
              >
                <div className="">
                  <FaBriefcaseMedical size="2em" className="mx-auto my-2" />
                </div>
                <p className="text-center">Medical</p>
              </motion.div>
            </Link>
            <Link href={"/student/portfolio?id=" + student?.id}>
              <motion.div
                initial="hide"
                animate="rest"
                whileTap="tap"
                variants={buttonAnim}
                className="p-2 bg-cyan-500 bg-opacity-90 rounded-box shadow-xl text-white"
              >
                <div className="">
                  <MdPhotoAlbum size="2em" className="mx-auto my-2" />
                </div>
                <p className="text-center">Portfolio</p>
              </motion.div>
            </Link>
            <motion.div
              initial="hide"
              animate="rest"
              whileTap="tap"
              variants={buttonAnim}
              className="p-2 bg-lime-500 bg-opacity-90 rounded-box shadow-xl text-white"
            >
              <div className="">
                <GoGraph size="2em" className="mx-auto my-2" />
              </div>
              <p className="text-center">Results</p>
            </motion.div>
          </div>
        </section>
        <section className="px-6">
          <div className="collapse collapse-arrow">
            <input type="checkbox" />
            <div className="collapse-title text-lg text-gray-500 font-poppins font-semibold">
              Authorised Users
            </div>
            <div className="collapse-content bg-gray-50 rounded-box">
              <div className="grid gap-4 pt-4">
                <UserWarn data={{ name: "John Doe" }} />
                <UserWarn data={{ name: "Jane Doe" }} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </AuthGuard>
  );
}

const spring = {
  type: "spring",
  stiffness: 500,
  damping: 30,
};

const buttonAnim = {
  hide: {
    scale: 0,
    opacity: 0,
    transition: spring,
  },
  rest: {
    scale: 1,
    opacity: 1,
    transition: spring,
  },
  tap: {
    scale: 0.9,
    transition: spring,
  },
};
