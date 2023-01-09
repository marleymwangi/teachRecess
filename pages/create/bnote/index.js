import Router from "next/router";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
//hooks
import useUserFetch from "../../../helpers/hooks/user";
import useClassroomFetch from "../../../helpers/hooks/classroom";
//custom
import { useData } from "../../../context/dataContext";
import { classNames, isEmpty } from "../../../helpers/utility";
import ImageLoader from "../../../components/elements/imageLoader";
//dynamic
const TbMoodSad = dynamic(
  async () => (await import("react-icons/tb")).TbMoodSad
);
const TbMoodEmpty = dynamic(
  async () => (await import("react-icons/tb")).TbMoodEmpty
);
const TbMoodSmile = dynamic(
  async () => (await import("react-icons/tb")).TbMoodSmile
);

export default function CreateBNote() {
  const { selReminder, selStudents } = useData();
  const { user } = useUserFetch();
  const { updateBnoteInfo, students } = useClassroomFetch(user);
  const [loading, setLoading] = useState(false);
  //form data
  const [type, setType] = useState("neutral");
  const [content, setContent] = useState({ data: "", state: null });

  useEffect(() => {
    //console.log("due", due);
    //console.log("timestamp", timestamp);
  }, [content]);

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
        if (event.target.value !== "default") {
          setFunction({
            data: event.target.value,
            state: "success",
          });
        }
        break;
      default:
        break;
    }
  };

  const clear = () => {
    setContent({ data: "", state: null });
  };

  const isValidated = () => {
    if (content.state === "success") {
      return true;
    } else {
      if (content.state !== "success") {
        setContent({ ...content, state: "error" });
      }
      return false;
    }
  };

  const processStudents = () => {
    if (selStudents.length === 0 || selStudents.length === students.length) {
      return false;
    } else {
      return true;
    }
  };

  //loop through students and create student with only name and id
  const shortStudents = (arr) => {
    {
    }
    let newArr = [];
    arr.forEach((student) => {
      newArr.push({
        name: student.name,
        id: student.id,
        admission_no: student.admission_no,
        school_id: student.school_id,
        class_id: student.class_id,
      });
    });
    return newArr;
  };

  //create array of student ids
  const getStudentIds = (arr) => {
    let newArr = [];
    arr.forEach((student) => {
      newArr.push(student.id);
    });
    return newArr;
  };

  const handleData = async (e) => {
    e.preventDefault();
    if (isValidated()) {
      setLoading(true);
      //validate()
      let obj = {};
      obj.type = type;
      obj.select = processStudents();
      !isEmpty(content.data) && (obj.content = content.data.trim());
      !isEmpty(selStudents) &&
        processStudents() &&
        (obj.students = shortStudents(selStudents));
      !isEmpty(selStudents) &&
        processStudents() &&
        (obj.student_ids = getStudentIds(selStudents));
      obj.timestamp = new Date();

      updateBnoteInfo(obj)
        .then((res) => {
          console.log(res);
          clear();
          setLoading(false);
          toast.success(
            <div>
              <h5 className="font-medium text-gray-900">Success</h5>
              <h6>Behavioral Note created successfully</h6>
            </div>,
            {
              closeOnClick: true,
            }
          );
          Router.push("/");
        })
        .catch((err) => {
          console.log(err);
          toast.error(
            <div>
              <h5 className="font-medium text-gray-900">Success</h5>
              <h6>Error occurred when trying to save the Behavioral Note</h6>
            </div>,
            {
              closeOnClick: true,
            }
          );
          setLoading(false);
        });
    }
  };

  return (
    <main className="min-h-[95vh] pt-32 px-8">
      <motion.div
        variants={FormContVar}
        className="grid max-w-lg mx-auto text-cyan-700"
      >
        <motion.div variants={FormContVar} className="grid gap-6 grid-cols-1">
          <motion.div variants={riseVar} className="form-control w-full">
            <p className="text-center w-full font-medium text-lg text-cyan-500">
              Create Behavioral Note
            </p>
          </motion.div>
          <motion.div variants={riseVar} className="form-control w-full">
            <label
              htmlFor="students_modal"
              className="btn btn-primary btn-outline bg-white"
            >
              {selStudents?.length < 1 ? "All Students" : "Selected Students"}
            </label>
            <section className="flex flex-wrap gap-2 mt-4">
              {selStudents.map((stud, i) => (
                <div
                  key={stud.id}
                  className="rounded-full px-2 py-2 bg-primary text-white flex items-center gap-2"
                >
                  <div className="avatar">
                    <div className="w-8 rounded-full">
                      <ImageLoader src={stud.image} />
                    </div>
                  </div>
                  <span className="font-semibold">{stud.name}</span>
                </div>
              ))}
            </section>
          </motion.div>
          <motion.div variants={riseVar} className="form-control w-full">
            <section className="grid grid-cols-3 text-center font-semibold text-gray-400">
              <div
                onClick={(e) => setType("good")}
                className={classNames(
                  "border p-2 rounded-l-xl bg-white shadow-md",
                  type == "good" && "text-success border-success shadow-lg"
                )}
              >
                <TbMoodSmile size="2em" className="mx-auto" />
                <p className="text-lg">Yaah!</p>
              </div>
              <div
                onClick={(e) => setType("neutral")}
                className={classNames(
                  "border p-2 bg-white shadow-md",
                  type == "neutral" && "text-cyan-500 border-cyan-500 shadow-lg"
                )}
              >
                <TbMoodEmpty size="2em" className="mx-auto" />
                <p className="text-lg">Ok</p>
              </div>
              <div
                onClick={(e) => setType("bad")}
                className={classNames(
                  "border p-2 rounded-r-xl bg-white shadow-md",
                  type == "bad" && "text-error border-error shadow-lg"
                )}
              >
                <TbMoodSad size="2em" className="mx-auto" />
                <p className="text-lg">Oops!</p>
              </div>
            </section>
          </motion.div>
          <motion.div
            variants={riseVar}
            className="relative form-control w-full"
          >
            <textarea
              type="text"
              placeholder=" "
              onChange={(event) => change(event, setContent)}
              className={classNames(
                "block rounded-lg px-2.5 pb-2.5 pt-6 w-full text-sm bg-white border focus:border-2 appearance-none focus:outline-none focus:ring-0 peer",
                content?.state === "success" && "text-success border-success",
                content?.state === "error" && "text-error border-error",
                content?.state !== "success" &&
                  content?.state !== "error" &&
                  "text-cyan-500 border-cyan-500 focus:border-cyan-500"
              )}
            />
            <label
              className={classNames(
                "absolute text-sm duration-300 transform -translate-y-2 scale-75 top-3 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-2",
                content?.state === "success" && "text-success",
                content?.state === "error" && "text-error",
                content?.state !== "success" &&
                  content?.state !== "error" &&
                  "text-cyan-700 peer-focus:text-cyan-600"
              )}
            >
              Note Content
            </label>
            {content?.state === "error" && (
              <p className="text-error text-xs italic text-center mt-1">
                Please enter a valid content
              </p>
            )}
          </motion.div>
          <motion.div variants={riseVar} className="form-control w-full">
            <select className="select select-primary w-full mx-auto">
              <option disabled selected>
                Escalation Level
              </option>
              <option>Teacher</option>
              <option>Class Teacher</option>
              <option>Stream Guidance Councillor</option>
              <option>MSG</option>
              <option>Deputy Head Teacher</option>
              <option>Head Teacher</option>
            </select>
          </motion.div>
          <motion.div variants={riseVar} className="flex justify-end my-6">
            <button
              onClick={handleData}
              className={classNames(
                "btn btn-primary border-0 btn-lg rounded-xl w-full md:max-w-md mx-auto ",
                loading && "loading"
              )}
            >
              Save
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </main>
  );
}

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
