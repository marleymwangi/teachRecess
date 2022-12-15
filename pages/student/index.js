import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
//hooks
import useUserFetch from "../../helpers/hooks/user";
import useClassroomFetch from "../../helpers/hooks/classroom";
//custom
import { isEmpty } from "../../helpers/utility";
import UserWarn from "../../components/users/Warn";
import { useData } from "../../context/dataContext";
import { AuthGuard } from "../../components/elements/AuthGuard";
import ImageLoader from "../../components/elements/imageLoader";
//dynamic
const FaBriefcaseMedical = dynamic(async () => (await import("react-icons/fa")).FaBriefcaseMedical);
const MdPhotoAlbum = dynamic(async () => (await import("react-icons/md")).MdPhotoAlbum);
const GoGraph = dynamic(async () => (await import("react-icons/go")).GoGraph);

export default function StudentProfile() {
  const router = useRouter();
  const { id } = router.query;

  const { user } = useUserFetch();
  const { students, school, getStudentById } = useClassroomFetch(user);
  const { selStudent, setSelStudent } = useData();

  useEffect(() => {
    if (id?.length > 0 && isEmpty(selStudent)) {
      let stud = getStudentById(id);
      stud && setSelStudent(stud);
    }
  }, [id, students, selStudent, setSelStudent, getStudentById]);

  return (
    <AuthGuard>
      <main className="min-h-[95vh] py-20">
        <section className="flex flex-col items-center">
          <div className="avatar">
            <div className="w-24 mask mask-squircle">
              <ImageLoader src={selStudent?.image} />
            </div>
          </div>
          {!selStudent?.name && (
            <span className="bg-gray-300 animate-pulse my-2 rounded w-12 h-7" />
          )}
          {selStudent?.name && (
            <p className="font-semibold text-2xl my-2 font-poppins">
              {selStudent?.name}
            </p>
          )}
          <div className="flex items-center gap-2 text-sm text-gray-400">
            {!school?.name && (
              <span className="bg-gray-300 animate-pulse rounded w-12 h-5" />
            )}
            {school?.name && <span>{school?.name}</span>}
            {" . "}
            {!selStudent?.class?.name && (
              <span className="bg-gray-300 animate-pulse rounded w-7 h-5" />
            )}
            {selStudent?.class?.name && <span>{selStudent?.class?.name}</span>}
          </div>
        </section>
        <section className="p-6">
          <div className="grid grid-cols-3 gap-4">
            <Link href={"/student/medical?id=" + selStudent?.id}>
              <motion.div
                initial="hide"
                animate="rest"
                whileTap="tap"
                variants={buttonAnim}
                className="p-2 bg-pink-500 bg-opacity-90 rounded-box shadow-xl text-white"
              >
                <div className="min-h-[2em] my-2">
                  <FaBriefcaseMedical size="2em" className="mx-auto" />
                </div>
                <p className="text-center">Medical</p>
              </motion.div>
            </Link>
            <Link href={"/student/portfolio?id=" + selStudent?.id}>
              <motion.div
                initial="hide"
                animate="rest"
                whileTap="tap"
                variants={buttonAnim}
                className="p-2 bg-cyan-500 bg-opacity-90 rounded-box shadow-xl text-white"
              >
                <div className="min-h-[2em] my-2">
                  <MdPhotoAlbum size="2em" className="mx-auto" />
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
              <div className="min-h-[2em] my-2">
                <GoGraph size="2em" className="mx-auto" />
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
            <div className="collapse-content">
              <div className="grid gap-4 pt-4">
                {selStudent?.guardians?.length > 0 &&
                  selStudent?.guardians.map((g,i) => <UserWarn key={i} data={g} />)}
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
