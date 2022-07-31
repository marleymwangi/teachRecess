import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
//custom packages
import { getDoc, onSnapshot, doc } from "firebase/firestore";
import { motion } from "framer-motion";
//custom
import { db } from "../../firebase";
import { classNames } from "../../context/vars";
import ImageLoader from "../../components/elements/imageLoader";
//dynamic
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
      duration: 0.15,
    },
  },
};

export default function ChildProfile() {
  const router = useRouter();
  const { id } = router.query;
  const [student, setStudent] = useState([]);

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

  const backClr = (color) => {
    console.log;
    switch (color) {
      case "red":
        return "bg-gradient-to-r from-red-400 to-red-700 hover:from-red-500 hover:to-red-800";
      case "purple":
        return "bg-gradient-to-r from-purple-800 via-violet-900 to-purple-800";
      case "green":
        return "bg-gradient-to-r from-green-500 to-green-700";
      case "sky":
        return "bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900";
      case "amber":
        return "bg-gradient-to-r from-orange-600 to-orange-500";
      default:
        return "bg-conic-to-l from-sky-400 to-blue-800";
    }
  };

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

  return (
    <motion.main
      variants={contVar}
      initial="hide"
      animate="show"
      className="profile__page caret-black"
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
            <span className="text-sm font-medium whitespace-nowrap">
              Name :{" "}
            </span>
          </div>
          <h5 className={classNames("font-bold", textClr(student?.color))}>
            {student?.name}
          </h5>
        </motion.div>
      </motion.section>
      <motion.section variants={riseVar} className="form__sec">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Preferred Hospital</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-primary input-bordered w-full focus:bg-white"
          />
        </div>
        <div className="mt-6 grid gap-6 grid-cols-1 md:grid-cols-2">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Allergies</span>
            </label>
            <textarea
              type="text"
              placeholder="Type here"
              className="textarea textarea-primary input-bordered w-full focus:bg-white no-scroll"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Medical Allergies</span>
            </label>
            <textarea
              type="text"
              placeholder="Type here"
              className="textarea textarea-primary input-bordered w-full focus:bg-white no-scroll"
            />
          </div>
        </div>
      </motion.section>
      <motion.div variants={riseVar} className="flex justify-end my-6">
        <button
          disabled={true}
          className="btn border-0 btn-lg rounded-2xl w-full md:w-1/3 "
        >
          Save
        </button>
      </motion.div>
    </motion.main>
  );
}
