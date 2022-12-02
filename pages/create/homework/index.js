import Router from "next/router";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
//hooks
import useUserFetch from "../../../helpers/hooks/user";
import { useData } from "../../../context/dataContext";
import useClassroomFetch from "../../../helpers/hooks/classroom";
//custom
import ExerForm from "./ExerForm";
import CraftForm from "./CraftForm";
import UploadForm from "./UploadForm";
import { classNames, isEmpty } from "../../../helpers/utility";
import TimeSpanPickerInput from "../../../components/elements/timeSpanPickerInput";

export default function CreateHomework() {
  const { selHomeworkMode, selHomework } = useData();
  const { user } = useUserFetch();
  const { updateHomeworkInfo } = useClassroomFetch(user);
  const [loading, setLoading] = useState(false);
  //form data
  const [subject, setSubject] = useState({ data: "default", state: null });
  const [type, setType] = useState({ data: "default", state: null });
  const [book, setBook] = useState({ data: "", state: null });
  const [pages, setPages] = useState({ data: "", state: null });
  const [project, setProject] = useState({ data: "", state: null });
  const [materials, setMaterials] = useState({ data: "", state: null });
  const [instr, setInstr] = useState({ data: "", state: null });
  const [due, setDue] = useState(null);
  const [timestamp, setTimestamp] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

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
        if (event.target.value?.length < 1) {
          setFunction({
            data: event.target.value,
            state: "error",
          });
        } else {
          setFunction({
            data: event.target.value,
            state: "success",
          });
        }
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
    setSelectedFile(null);
  };

  const typeValidated = () => {
    switch (type?.data) {
      case "exer":
        if (book.state === "success" && pages.state === "success") {
          return true;
        }
        break;
      case "craft":
        if (project.state === "success" && materials.state === "success") {
          return true;
        }
        break;
      case "image":
        if (selectedFile) {
          return true;
        }
      default:
        return false;
    }
  };

  const isValidated = () => {
    if (
      subject.state === "success" &&
      instr.state === "success" &&
      type.state === "success" &&
      typeValidated()
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
      !isEmpty(subject.data) && subject.data !== "default" && (obj.subject = subject.data.trim());
      !isEmpty(type.data) && type.data !== "default" && (obj.type = type.data.trim());
      !isEmpty(book.data) && (obj.book = book.data.trim());
      !isEmpty(pages.data) && (obj.pages = pages.data.trim());
      !isEmpty(project.data) && (obj.project = project.data.trim());
      !isEmpty(materials.data) && (obj.materials = materials.data.trim());
      !isEmpty(instr.data) && (obj.instructions = instr.data.trim());
      !isEmpty(due) && (obj.due = due);
      !isEmpty(timestamp) && (obj.timestamp = timestamp);
      !isEmpty(selectedFile) && (obj.selectedFile = selectedFile);

      console.log(obj);
      updateHomeworkInfo(obj)
        .then((res) => {
          console.log(res);
          clear();
          setLoading(false);
          toast.success(
            <div>
              <h5 className="font-medium text-gray-900">Success</h5>
              <h6>Homework created successfully</h6>
            </div>,
            {
              closeOnClick: true,
            }
          );
          Router.push("/homework/homework");
        })
        .catch((err) => {
          console.log(err);
          toast.error(
            <div>
              <h5 className="font-medium text-gray-900">Error</h5>
              <h6>Error occurred when trying to save the homework</h6>
            </div>,
            {
              closeOnClick: true,
            }
          );
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
      value: "evironmental",
      text: "Evironmental",
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
        className="grid max-w-lg mx-auto text-cyan-700"
      >
        <motion.div variants={FormContVar} className="grid gap-6 grid-cols-1">
          <motion.div variants={riseVar} className="form-control w-full">
            <label className="label">
              <span className="label-text text-cyan-500">Subject</span>
            </label>
            <select
              value={
                selHomeworkMode === "edit" && subject.data === "default"
                  ? selHomework.subject
                  : subject.data
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
              <span className="label-text text-cyan-500">Homework Type</span>
            </label>
            <select
              value={
                selHomeworkMode === "edit" && type.data === "default"
                  ? selHomework.type
                  : type.data
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
              <option value={"image"}>Image</option>
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
                {type.data !== "exer" &&
                  type.data !== "craft" &&
                  type.data !== "image" && (
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
                {type?.data === "image" && (
                  <UploadForm
                    key="img"
                    selectedFile={selectedFile}
                    setSelectedFile={setSelectedFile}
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
                {selHomework.type !== "exer" &&
                  selHomework.type !== "craft" && (
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
              {selHomework?.type?.length < 1 && type.state === "error" && (
                <p className="text-error text-xs italic text-center mt-1">
                  Please select an option.
                </p>
              )}
            </>
          )}
          <motion.div variants={riseVar} className="form-control w-full">
            <label className="label">
              <span className="label-text text-cyan-500">Instructions</span>
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
            <p className="text-center mb-2 text-cyan-500">
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
