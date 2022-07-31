import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
//custom packages
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import {
  collection,
  getDoc,
  orderBy,
  doc,
  query,
  onSnapshot,
} from "firebase/firestore";
//custom
import { db } from "../../firebase";
import { classNames } from "../../context/vars";
import ImageLoader from "../../components/elements/imageLoader";
//dynamic
const FaUserShield = dynamic(
  async () => (await import("react-icons/fa")).FaUserShield
);
const BiRightArrow = dynamic(
  async () => (await import("react-icons/bi")).BiRightArrow
);
const HiInformationCircle = dynamic(
  async () => (await import("react-icons/hi")).HiInformationCircle
);
const MdHealthAndSafety = dynamic(
  async () => (await import("react-icons/md")).MdHealthAndSafety
);
const MdClass = dynamic(async () => (await import("react-icons/md")).MdClass);
const HiDocumentReport = dynamic(
  async () => (await import("react-icons/hi")).HiDocumentReport
);
const IoPersonCircle = dynamic(
  async () => (await import("react-icons/io5")).IoPersonCircle
);

const contVar = {
  show: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
};

const riseVar = {
  hide: {
    opacity: 0,
    y: 10,
    scale: 0.9,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.25,
    },
  },
};

export default function ChildProfile() {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();
  const [student, setStudent] = useState({});
  const [guardians, setGuardians] = useState([]);

  const getGuardian = (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const docRef = doc(db, "users", id || "");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          let obj = docSnap.data();
          resolve(obj);
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  const getGuardians = async (guardians) => {
    let promises = [];
    guardians.forEach((guard) => {
      let p = getGuardian(guard);
      promises.push(p);
    });

    let guardTmp = await Promise.all(promises).then((results) => {
      return results;
    });

    setGuardians(guardTmp);
  };

  const getStudent = async (id) => {
    const docRef = doc(db, "students", id);

    return onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        setStudent({ ...doc.data(), id: doc.id });
      }
    });
  };

  useEffect(() => {
    if (id) getStudent(id);
  }, [id]);

  useEffect(() => {
    if (student?.guardians?.length > 0 && session) {
      let listTmp = student.guardians.filter(
        (item) => item !== `${session?.user?.id}`
      );
      if (listTmp.length > 0) {
        getGuardians(listTmp);
      }
    }
  }, [student, session]);

  const textClr = (color) => {
    console.log;
    switch (color) {
      case "red":
        return "!text-red-500";
      case "purple":
        return "!text-purple-500";
      case "green":
        return "!text-green-500";
      case "sky":
        return "!text-sky-500";
      case "amber":
        return "!text-amber-500";
      default:
        return "!text-primary";
    }
  };

  const ringClr = (color) => {
    console.log;
    switch (color) {
      case "red":
        return "ring-red-500";
      case "purple":
        return "ring-purple-500";
      case "green":
        return "ring-green-500";
      case "sky":
        return "ring-sky-500";
      case "amber":
        return "ring-amber-500";
      default:
        return "ring-primary";
    }
  };

  return (
    <motion.main
      variants={contVar}
      initial="hide"
      animate="show"
      className="profile__page"
    >
      <motion.section variants={contVar} className="user">
        <motion.div variants={riseVar} className="avatar">
          <div
            className={classNames(
              "w-24 rounded-full ring-4 ring-offset-base-100 ring-offset-2",
              ringClr(student?.color)
            )}
          >
            <ImageLoader
              src={student?.image}
              fallbackSrc="/assets/person.webp"
            />
          </div>
        </motion.div>
        <motion.div
          variants={riseVar}
          className="backdrop-blur px-6 mt-8 rounded-3xl overflow-hidden grid grid-cols-2 gap-1"
        >
          <div className="flex gap-2 items-center text-gray-500">
            <IoPersonCircle size="1rem" />
            <span className="font-medium whitespace-nowrap">Name : </span>
          </div>
          <h1 className={classNames("font-bold", textClr(student?.color))}>
            {student?.name}
          </h1>
        </motion.div>
      </motion.section>
      <motion.section variants={contVar} className="button__sec">
        <Link href={`/attendance/info?id=${id}`}>
          <motion.div variants={riseVar} className="button">
            <div>
              <div className="icon">
                <HiInformationCircle size="1.5em" />
              </div>
              <h6>Information</h6>
            </div>
            <BiRightArrow size="1em" />
          </motion.div>
        </Link>
        <Link href={`/attendance/medic?id=${id}`}>
          <motion.div variants={riseVar} className="button">
            <div>
              <div className="icon">
                <MdHealthAndSafety size="1.5em" />
              </div>
              <h6>Medical</h6>
            </div>
            <BiRightArrow size="1em" />
          </motion.div>
        </Link>
        <Link href={`/attendance/work?id=${id}`}>
          <motion.div variants={riseVar} className="button">
            <div>
              <div className="icon">
                <MdClass size="1.5em" />
              </div>
              <h6>Work</h6>
            </div>
            <BiRightArrow size="1em" />
          </motion.div>
        </Link>
        <Link href="/attendance/results">
          <motion.div variants={riseVar} className="button">
            <div>
              <div className="icon">
                <HiDocumentReport size="1.5em" />
              </div>
              <h6>Results</h6>
            </div>
            <BiRightArrow size="1em" />
          </motion.div>
        </Link>
        <motion.div
          variants={riseVar}
          tabIndex="0"
          className="collapse mt-6 collapse-arrow border border-base-300 bg-white rounded-box"
        >
          <input type="checkbox" />
          <div className="collapse-title text-lg font-medium buttton flex items-center">
            <div className="flex items-center">
              <div className="p-2 bg-gray-200 rounded-box">
                <FaUserShield size="1.25em" />
              </div>
              <h6 className="ml-2">Authorised users</h6>
            </div>
          </div>
          <div className="collapse-content">
            {guardians?.length > 0 ? (
              guardians.map((g, i) => (
                <div key={i} className="flex flex-wrap items-center my-2 ml-6">
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <ImageLoader
                        src={g.image}
                        fallbackSrc="/assets/person.webp"
                      />
                    </div>
                  </div>
                  <span className="ml-4 font-medium capitalize text-center text-gray-500">
                    {g.name}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                Your the only Authorised User tied to this Account
              </p>
            )}
          </div>
        </motion.div>
      </motion.section>
    </motion.main>
  );
}
