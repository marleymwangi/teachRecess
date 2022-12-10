import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
//hooks
import useUserFetch from "../../helpers/hooks/user";
import useClassroomFetch from "../../helpers/hooks/classroom";
//custom
import { isEmpty } from "../../helpers/utility";
import { useData } from "../../context/dataContext";
import { AuthGuard } from "../../components/elements/AuthGuard";
import ImageLoader from "../../components/elements/imageLoader";
//dynamic
const FaRegHospital = dynamic(
  async () => (await import("react-icons/fa")).FaRegHospital
);
const FaUserNurse = dynamic(
  async () => (await import("react-icons/fa")).FaUserNurse
);
const FaHandHoldingMedical = dynamic(
  async () => (await import("react-icons/fa")).FaHandHoldingMedical
);
const GiMedicinePills = dynamic(
  async () => (await import("react-icons/gi")).GiMedicinePills
);
const IoMdTimer = dynamic(
  async () => (await import("react-icons/io")).IoMdTimer
);
const FaTablets = dynamic(
  async () => (await import("react-icons/fa")).FaTablets
);
const GiMeal = dynamic(async () => (await import("react-icons/gi")).GiMeal);

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
          <div className="grid text-center font-poppins">
            <div>
              <p className="flex gap-2 items-center justify-center text-gray-400 text-sm bg-white p-2 border border-dashed">
                <FaHandHoldingMedical size="1em" /> <span>Insurance</span>
              </p>
              <p className="text-secondary font-medium text-lg py-2 border border-dashed">
                APA insurance
              </p>
            </div>
            <div className="grid grid-cols-2">
              <p className="flex gap-2 items-center justify-center text-gray-400 text-sm bg-white p-2 border border-dashed">
                <FaRegHospital size="1em" /> <span>Prefered Hospital</span>
              </p>
              <p className="flex gap-2 items-center justify-center text-gray-400 text-sm bg-white p-2 border border-dashed">
                <FaUserNurse size="1em" /> <span>Prefered Hospital</span>
              </p>
              <p className="text-secondary font-medium text-lg py-2 border border-dashed">
                Nairobi Hospital
              </p>
              <p className="text-secondary font-medium text-lg py-2 border border-dashed">
                Bob Mwangi
              </p>
            </div>
          </div>
        </section>
        <section className="px-6">
          <p className="font-semibold text-gray-500 text-lg mb-2 font-poppins">
            {"Allergies"}
          </p>
          <div className="flex flex-wrap gap-3 font-poppins">
            <span className="badge badge-primary p-3">Apple</span>
            <span className="badge badge-primary p-3">Watermelon</span>
            <span className="badge badge-primary p-3">Beef</span>
            <span className="badge badge-primary p-3">Eggs</span>
            <span className="badge badge-primary p-3">Chapati</span>
            <span className="badge badge-primary p-3">Bacon</span>
          </div>
        </section>
        <section className="p-6">
          <p className="font-semibold text-gray-500 text-lg mb-2 font-poppins">
            {"Prescribed Medication"}
          </p>
          <div className="grid text-center font-poppins">
            <div className="grid grid-cols-2">
              <p className="flex gap-2 justify-center items-center text-gray-400 text-sm bg-white p-2 border border-dashed">
                <GiMedicinePills size="1em" /> <span>Name</span>
              </p>
              <p className="flex gap-2 items-center justify-center text-gray-400 text-sm bg-white p-2 border border-dashed">
                <IoMdTimer size="1em" /> <span>Times</span>
              </p>

              <p className="text-secondary font-medium py-2 border border-dashed">
                Augmentine
              </p>
              <p className="text-secondary font-medium py-2 border border-dashed">
                12:00pm
              </p>

              <p className="flex gap-2 items-center justify-center text-gray-400 text-sm bg-white p-2 border border-dashed">
                <FaTablets size="1em" /> <span>Dosage</span>
              </p>
              <p className="flex gap-2 items-center justify-center text-gray-400 text-sm bg-white p-2 border border-dashed">
                <GiMeal size="1em" /> <span>When</span>
              </p>

              <p className="text-secondary font-medium py-2 border border-dashed">
                3 Tablets
              </p>
              <p className="text-secondary font-medium py-2 border border-dashed">
                After Meals
              </p>
            </div>
          </div>
        </section>
      </main>
    </AuthGuard>
  );
}
