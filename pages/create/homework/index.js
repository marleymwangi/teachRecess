import Router from "next/router";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
//hooks
import { useData } from "../../../context/dataContext";
import useTeacherFetch from "../../../helpers/hooks/teacher";
//custom
import ExerForm from "./ExerForm";
import CraftForm from "./CraftForm";
import { classNames, isEmpty } from "../../../helpers/utility";
import TimeSpanPickerInput from "../../../components/elements/timeSpanPickerInput";

export default function CreateHomework() {
  const { selHomeworkMode, selHomework, SetAlert } = useData();
  const { updateHomeworkInfo } = useTeacherFetch();
  const [loading, setLoading] = useState(false);
  //form data
  const [subject, setSubject] = useState({ data: "", state: null });
  const [type, setType] = useState({ data: "", state: null });
  const [book, setBook] = useState({ data: "", state: null });
  const [pages, setPages] = useState({ data: "", state: null });
  const [project, setProject] = useState({ data: "", state: null });
  const [materials, setMaterials] = useState({ data: "", state: null });
  const [instr, setInstr] = useState({ data: "", state: null });
  const [due, setDue] = useState(null);
  const [timestamp, setTimestamp] = useState(null);

  useEffect(() => {
    //console.log("due", due);
    //console.log("timestamp", timestamp);
  }, [due, timestamp]);

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
    setSubject({ data: "", state: null });
    setType({ data: "", state: null });
    setBook({ data: "", state: null });
    setPages({ data: "", state: null });
    setProject({ data: "", state: null });
    setMaterials({ data: "", state: null });
    setInstr({ data: "", state: null });
  };

  const isValidated = () => {
    if (
      subject.state === "success" &&
      instr.state === "success" &&
      type.state === "success" &&
      (type.data === "exer"
        ? book.state === "success" && pages.state === "success"
        : project.state === "success" && materials.state === "success")
    ) {
      return true;
    } else {
      if (subject.state !== "success") {
        setSubject({ ...subject, state: "error" });
      }
      if (type.state !== "success") {
        setType({ ...type, state: "error" });
      }
      if (type.data === "exer") {
        if (book.state !== "success" || book.data === "") {
          setBook({ ...book, state: "error" });
        }
        if (pages.state !== "success" || pages.data === "") {
          setPages({ ...pages, state: "error" });
        }
      }
      if (type.data === "craft") {
        if (project.state !== "success" || project.data === "") {
          setProject({ ...project, state: "error" });
        }
        if (materials.state !== "success" || materials.data === "") {
          setMaterials({ ...materials, state: "error" });
        }
      }
      if (instr.state !== "success" || instr.data === "") {
        setInstr({ ...instr, state: "error" });
      }
      return false;
    }
  };

  const handleData = async (e) => {
    e.preventDefault();
    if (isValidated() || selHomeworkMode === "edit") {
      setLoading(true);
      //validate()
      let obj = {};
      !isEmpty(subject.data) && (obj.subject = subject.data.trim());
      !isEmpty(type.data) && (obj.type = type.data.trim());
      !isEmpty(book.data) && (obj.book = book.data.trim());
      !isEmpty(pages.data) && (obj.pages = pages.data.trim());
      !isEmpty(project.data) && (obj.project = project.data.trim());
      !isEmpty(materials.data) && (obj.materials = materials.data.trim());
      !isEmpty(instr.data) && (obj.instructions = instr.data.trim());
      !isEmpty(due) && (obj.due = due);
      !isEmpty(timestamp) && (obj.timestamp = timestamp);

      console.log(obj);
      updateHomeworkInfo(obj)
        .then((res) => {
          console.log(res);
          clear();
          setLoading(false);
          SetAlert({
            type: "success",
            message: "Saved Successfully",
          });
          Router.push("/homework/homework");
        })
        .catch((err) => {
          console.log(err);
          SetAlert({
            type: "error",
            message: "Error occurred when trying to save the homework",
          });
          setLoading(false);
        });
    }
  };

  let subjects = [
    {
      value: "science",
      text: "Science",
    },
    {
      value: "english",
      text: "English",
    },
    {
      value: "hygiene",
      text: "Hygiene",
    },
    {
      value: "career",
      text: "Career",
    },
    {
      value: "swahili",
      text: "Kiswahili",
    },
    {
      value: "evironment",
      text: "Evironment",
    },
    {
      value: "math",
      text: "Mathematics",
    },
    {
      value: "religious",
      text: "Religious Education",
    },
  ];

  return (
    <main className="py-16 px-4">
      <motion.div
        variants={FormContVar}
        className="grid max-w-lg mx-auto text-emma-700"
      >
        <motion.div variants={FormContVar} className="grid gap-6 grid-cols-1">
          <motion.div variants={riseVar} className="form-control w-full">
            <label className="label">
              <span className="label-text text-emma-500">Subject</span>
            </label>
            <select
              defaultValue={
                selHomeworkMode === "edit" ? selHomework?.subject : "default"
              }
              onChange={(event) => change(event, setSubject, "sel")}
              className={classNames(
                "select w-full",
                subject.state === "error"
                  ? "text-error select-error"
                  : "select-primary"
              )}
            >
              <option disabled value={"default"}>
                Select Subject
              </option>
              {subjects.map((sub, i) => (
                <option key={i} value={sub.value}>
                  {sub.text}
                </option>
              ))}
            </select>
            {subject.state === "error" && (
              <p className="text-error text-xs italic text-center mt-1">
                Please select an option.
              </p>
            )}
          </motion.div>
          <motion.div variants={riseVar} className="form-control w-full">
            <label className="label">
              <span className="label-text text-emma-500">Homework Type</span>
            </label>
            <select
              defaultValue={
                selHomeworkMode === "edit" ? selHomework?.type : "default"
              }
              onChange={(event) => change(event, setType, "sel")}
              className={classNames(
                "select w-full",
                type.state === "error"
                  ? "text-error select-error"
                  : "select-primary"
              )}
            >
              <option disabled value={"default"}>
                Select Work Type
              </option>
              <option value={"exer"}>Book Exercise</option>
              <option value={"craft"}>Craft</option>
            </select>
            {type.state === "error" && (
              <p className="text-error text-xs italic text-center mt-1">
                Please select an option.
              </p>
            )}
          </motion.div>
          {selHomeworkMode === "add" && (
            <>
              <AnimatePresence>
                {type.data !== "exer" && type.data !== "craft" && (
                  <div
                    key="_"
                    className="grid place-content-center w-full min-h-[190px]"
                  >
                    <p
                      className={classNames(
                        "text-center",
                        type.state === "error" && "text-error"
                      )}
                    >
                      Select Homework Type
                    </p>
                  </div>
                )}
                {type?.data === "exer" && (
                  <ExerForm
                    key="exe"
                    change={change}
                    book={book}
                    setBook={setBook}
                    pages={pages}
                    setPages={setPages}
                  />
                )}
                {type?.data === "craft" && (
                  <CraftForm
                    key="cra"
                    change={change}
                    project={project}
                    setProject={setProject}
                    materials={materials}
                    setMaterials={setMaterials}
                  />
                )}
              </AnimatePresence>
              {type.state === "error" && (
                <p className="text-error text-xs italic text-center mt-1">
                  Please select an option.
                </p>
              )}
            </>
          )}
          {selHomeworkMode === "edit" && (
            <>
              <AnimatePresence>
                {selHomework.type !== "exer" && selHomework.type !== "craft" && (
                  <div
                    key="_"
                    className="grid place-content-center w-full min-h-[190px]"
                  >
                    <p
                      className={classNames(
                        "text-center",
                        type.state === "error" && "text-error"
                      )}
                    >
                      Select Homework Type
                    </p>
                  </div>
                )}
                {(selHomework?.type === "exer" || type?.data === "exer") && (
                  <ExerForm
                    key="exe"
                    book={book}
                    pages={pages}
                    change={change}
                    setBook={setBook}
                    setPages={setPages}
                    selHomework={selHomework}
                  />
                )}
                {(selHomework?.type === "craft" || type?.data === "craft") && (
                  <CraftForm
                    key="cra"
                    change={change}
                    project={project}
                    materials={materials}
                    setProject={setProject}
                    setMaterials={setMaterials}
                    selHomework={selHomework}
                  />
                )}
              </AnimatePresence>
              {(selHomework?.type?.length < 1 && type.state === "error") && (
                <p className="text-error text-xs italic text-center mt-1">
                  Please select an option.
                </p>
              )}
            </>
          )}
          <motion.div variants={riseVar} className="form-control w-full">
            <label className="label">
              <span className="label-text text-emma-500">Instructions</span>
            </label>
            <textarea
              type="text"
              placeholder={
                selHomework?.instructions
                  ? selHomework.instructions
                  : "Assignment Instructions"
              }
              onChange={(event) => change(event, setInstr)}
              className={classNames(
                "input input-primary w-full input-bordered",
                instr.state === "error" && "input-error"
              )}
            />
            {instr.state === "error" && (
              <p className="text-error text-xs italic text-center mt-1">
                Please select an option.
              </p>
            )}
          </motion.div>
          <motion.div variants={riseVar} className="form-control w-full">
            <p className="text-center mb-2 text-emma-500">
              Assignment Timespan
            </p>
            <div className="mx-auto">
              <TimeSpanPickerInput
                selHomework={selHomework}
                setDue={setDue}
                setTimestamp={setTimestamp}
              />
            </div>
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
