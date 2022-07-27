import { useRouter } from "next/router";
import { useState, useEffect } from "react";
//custom packages
import swal from "sweetalert";
import { motion } from "framer-motion";
import {
  collection,
  getDoc,
  onSnapshot,
  doc,
  query,
  where,
} from "firebase/firestore";
//custom
import { db } from "../../firebase";
import { classNames } from "../../context/vars";
import { useData } from "../../context/dataContext";
import DropDown from "../../components/elements/dropDown";
import ImageLoader from "../../components/elements/imageLoader";

const contVar = {
  show: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
};

const FormContVar = {
  hide: {
    opacity: 0,
  },
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

export default function ChildProfileInfo({ studentInit }) {
  const router = useRouter();
  const { id } = router.query;
  const { updateChildInfo } = useData();
  const [student, setStudent] = useState(
    studentInit ? JSON.parse(studentInit) : []
  );
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState({ data: "", state: null });
  const [gender, setGender] = useState({ data: "", state: null });
  const [color, setColor] = useState({ data: "", state: null });
  //dates
  const [date, setDate] = useState({ data: "", state: null });
  const [month, setMonth] = useState({ data: "", state: null });
  const [year, setYear] = useState({ data: "", state: null });

  const [schoolsInfo, setSchoolsInfo] = useState({});

  const getSchoolInfo = async (schoolId, classId) => {
    try {
      const schRef = doc(db, "schools", schoolId || "");
      const clsRef = doc(
        db,
        "schools",
        schoolId || "",
        "classes",
        classId || ""
      );
      const schSnap = await getDoc(schRef);
      const clsSnap = await getDoc(clsRef);

      if (schSnap.exists() && clsSnap.exists()) {
        let schobj = schSnap.data();
        let clsobj = clsSnap.data();
        let obj = {
          school: schobj?.name,
          class: clsobj?.name,
        };
        setSchoolsInfo(obj);
      }
    } catch (error) {
      reject(error);
    }
  };

  const getStudent = async (id) => {
    const docRef = doc(db, "students", id);

    return onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        setStudent(doc.data());
      }
    });
  };

  useEffect(() => {
    if (id) getStudent(id);
  }, [id]);

  useEffect(() => {
    if (student?.classId && student?.schoolId) {
      const { schoolId, classId } = student;
      getSchoolInfo(schoolId, classId);
    }
  }, [student]);

  function range(start, end) {
    return Array(end - start + 1)
      .fill()
      .map((_, idx) => start + idx);
  }

  const change = (event, setFunction, type = "str") => {
    switch (type) {
      case "num":
        if (verifyNumber(event.target.value)) {
          setFunction({
            data: event.target.value,
            state: "success",
          });
        } else {
          setFunction({
            data: event.target.value,
            state: "error",
            mess: "Input must be a number",
          });
        }
        break;

      case "str":
        setFunction({
          data: event.target.value,
          state: "success",
        });
        break;
      case "sel":
        setFunction({
          data: event,
          state: "success",
        });
        break;

      default:
        break;
    }
  };

  function isEmpty(e) {
    switch (e) {
      case "":
      case null:
      case false:
      case undefined:
        return true;
      default:
        return false;
    }
  }

  const clear = () => {
    setName({ data: "", state: null });
    setGender({ data: "", state: null });
    setColor({ data: "", state: null });
    setDate({ data: "", state: null });
    setMonth({ data: "", state: null });
    setYear({ data: "", state: null });
  };

  const handleData = async (e) => {
    e.preventDefault();
    setLoading(true);
    //validate()
    let obj = {};
    !isEmpty(name.data) && (obj.name = name.data.trim());
    !isEmpty(gender.data) && (obj.gender = gender.data);
    !isEmpty(color.data) && (obj.color = color.data);
    !isEmpty(date.data) && (obj.date = Number(date.data));
    !isEmpty(month.data) && (obj.month = month.data);
    !isEmpty(year.data) && (obj.year = Number(year.data));

    //console.log(obj);
    updateChildInfo(id, obj)
      .then((res) => {
        console.log(res);
        setLoading(false);
        swal("Done!", "Update Complete!", "success");
        clear();
      })
      .catch((err) => {
        console.log(err);
        swal("Sorry!", "Error whle updating!", "error");
      });
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

  const radioClr = (color) => {
    console.log;
    switch (color) {
      case "red":
        return "checked:bg-red-500";
      case "purple":
        return "checked:bg-purple-500";
      case "green":
        return "checked:bg-green-500";
      case "sky":
        return "checked:bg-sky-500";
      case "amber":
        return "checked:bg-amber-500";
      default:
        return "checked:bg-primary";
    }
  };


  const inputClr = (color) => {
    console.log;
    switch (color) {
      case "red":
        return "border-red-500 ring-red-500";
      case "purple":
        return "border-purple-500 ring-purple-500";
      case "green":
        return "border-green-500 ring-green-500";
      case "sky":
        return "border-sky-500 ring-sky-500";
      case "amber":
        return "border-amber-500 ring-amber-500";
      default:
        return "border-red-500 ring-red-500";
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
          <span className="text-gray-500 text-sm whitespace-nowrap ">
            Name :
          </span>
          <h5 className="font-semibold">{student?.name}</h5>
          <span className=" text-gray-500 text-sm whitespace-nowrap ">
            School :
          </span>
          <h5 className="font-semibold">{schoolsInfo?.school}</h5>

          <span className="text-gray-500 text-sm whitespace-nowrap ">
            Class :
          </span>
          <h5 className="font-semibold">{schoolsInfo?.class}</h5>
        </motion.div>
      </motion.section>
      <motion.section variants={FormContVar} className="form__sec">
        <motion.p
          variants={riseVar}
          className="mt-6 text-sm text-center font-bold text-gray-300"
        >
          Profile Color
        </motion.p>
        <div className="grid gap-6 grid-cols-5 px-0 sm:px-10">
          <motion.div variants={riseVar} className="form-control w-3/5 mx-auto">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="radio-color"
                checked={
                  color?.data ? color.data === "red" : student?.color === "red"
                }
                onChange={() => change("red", setColor, "sel")}
                className="radio border-red-400 checked:bg-red-400"
              />
            </label>
          </motion.div>
          <motion.div variants={riseVar} className="form-control w-3/5 mx-auto">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="radio-color"
                checked={
                  color?.data
                    ? color.data === "purple"
                    : student?.color === "purple"
                }
                onChange={() => change("purple", setColor, "sel")}
                className="radio border-purple-400 checked:bg-purple-400"
              />
            </label>
          </motion.div>
          <motion.div variants={riseVar} className="form-control w-3/5 mx-auto">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="radio-color"
                checked={
                  color?.data
                    ? color.data === "green"
                    : student?.color === "green"
                }
                onChange={() => change("green", setColor, "sel")}
                className="radio border-green-400 checked:bg-green-400"
              />
            </label>
          </motion.div>
          <motion.div variants={riseVar} className="form-control w-3/5 mx-auto">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="radio-color"
                checked={
                  color?.data ? color.data === "sky" : student?.color === "sky"
                }
                onChange={() => change("sky", setColor, "sel")}
                className="radio border-sky-400 checked:bg-sky-400"
              />
            </label>
          </motion.div>
          <motion.div variants={riseVar} className="form-control w-3/5 mx-auto">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="radio-color"
                checked={
                  color?.data
                    ? color.data === "amber"
                    : student?.color === "amber"
                }
                onChange={() => change("amber", setColor, "sel")}
                className="radio border-amber-500 checked:bg-amber-400"
              />
            </label>
          </motion.div>
        </div>
        <motion.div variants={FormContVar} className="grid gap-6 grid-cols-1">
          <motion.div variants={riseVar} className="form-control w-full">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder={`${student?.name ? student.name : "Name"}`}
              onChange={(event) => change(event, setName)}
              className={classNames(
                "input w-full input-bordered focus:bg-white focus:border-2 focus:outline-none",
                name.state === "error"
                  ? "input-error"
                  : inputClr(student?.color)
              )}
            />
          </motion.div>
        </motion.div>
        <motion.p
          variants={riseVar}
          className="mt-6 text-sm text-center font-bold text-gray-300"
        >
          Birthday
        </motion.p>
        <motion.div
          variants={FormContVar}
          className="grid gap-2 sm:gap-6 grid-cols-3"
        >
          <motion.div variants={riseVar} className="form-control w-full">
            <label className="label">
              <span className="label-text">Date</span>
            </label>
            <DropDown
              value={date.data}
              setFunc={setDate}
              placeholder={`${student?.date ? student.date : "Day"}`}
              list={[...range(1, 31)]}
              color={student?.color}
            />
          </motion.div>
          <motion.div variants={riseVar} className="form-control w-full">
            <label className="label">
              <span className="label-text">Month</span>
            </label>
            <DropDown
              value={month.data}
              setFunc={setMonth}
              placeholder={`${student?.month ? student.month : "Month"}`}
              list={[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ]}
              color={student?.color}
            />
          </motion.div>
          <motion.div variants={riseVar} className="form-control w-full">
            <label className="label">
              <span className="label-text">Year</span>
            </label>
            <DropDown
              value={year.data}
              setFunc={setYear}
              placeholder={`${student?.year ? student.year : "Year"}`}
              list={[...range(1900, 2022)].sort().reverse()}
              color={student?.color}
            />
          </motion.div>
        </motion.div>
        <motion.p
          variants={riseVar}
          className="mt-6 text-center text-sm font-bold text-gray-300"
        >
          Gender
        </motion.p>
        <div className="grid gap-6 grid-cols-2 ">
          <motion.div variants={riseVar} className="form-control w-3/5 mx-auto">
            <label className="label cursor-pointer">
              <span
                className={classNames(
                  "label-text font-semibold text-lg mr-3",
                  textClr(student?.color)
                )}
              >
                Male
              </span>
              <input
                type="radio"
                name="radio-gender"
                checked={
                  gender?.data
                    ? gender.data === "male"
                    : student?.gender === "male"
                }
                onChange={() => change("male", setGender, "sel")}
                className={classNames("radio", radioClr(student?.color))}
              />
            </label>
          </motion.div>
          <motion.div variants={riseVar} className="form-control w-3/5 mx-auto">
            <label className="label cursor-pointer">
              <span
                className={classNames(
                  "label-text font-semibold text-lg mr-3",
                  textClr(student?.color)
                )}
              >
                Female
              </span>
              <input
                type="radio"
                name="radio-gender"
                checked={
                  gender?.data
                    ? gender.data === "female"
                    : student?.gender === "female"
                }
                onChange={() => change("female", setGender, "sel")}
                className={classNames("radio", radioClr(student?.color))}
              />
            </label>
          </motion.div>
        </div>
      </motion.section>
      <motion.div variants={riseVar} className="flex justify-end my-6">
        <div
          onClick={handleData}
          className={classNames(
            "btn border-0 btn-lg rounded-2xl w-full md:w-1/3 ",
            loading && "loading",
            backClr(student?.color)
          )}
        >
          Save
        </div>
      </motion.div>
    </motion.main>
  );
}

export const getServerSideProps = async (context) => {
  try {
    const { id } = context.query;

    const docRef = doc(db, "students", id || "");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        props: { studentInit: JSON.stringify(docSnap.data()) },
      };
    } else {
      return {
        props: { studentInit: JSON.stringify({}) },
      };
    }
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
};
