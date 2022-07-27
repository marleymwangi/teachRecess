import Image from "next/image";
import dynamic from "next/dynamic";
import { useRef, useState, useEffect } from "react";
//custom
import swal from "sweetalert";
import { motion } from "framer-motion";
import { useData } from "../../../context/dataContext";
import DropDown from "../../elements/dropDown";
import ExerForm from "./exerForm";
import CraftForm from "./craftForm";
import TimeSpanPickerInput from "../../elements/calendar/timeSpanPickerInput";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
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

export default function DiaryEntryModal() {
  const { selDiary, updateDiaryInfo } = useData();
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
    setSubject({ data: "", state: null });
    setType({ data: "", state: null });
    setBook({ data: "", state: null });
    setPages({ data: "", state: null });
    setProject({ data: "", state: null });
    setMaterials({ data: "", state: null });
    setInstr({ data: "", state: null });
  };

  const handleData = async (e) => {
    e.preventDefault();
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
    updateDiaryInfo(obj)
      .then((res) => {
        console.log(res);
        clear();
        setLoading(false);
        swal("Done!", "Update Complete!", "success");
        handleCloseModal();
      })
      .catch((err) => {
        console.log(err);
        swal("Sorry!", "Error while updating!", "error");
      });
  };

  const handleCloseModal = () => {
    document.getElementById("diary_modal").checked = false;
  };

  return (
    <div>
      <input type="checkbox" id="diary_modal" className="modal-toggle" />
      <label
        htmlFor="diary_modal"
        className="modal modal-bottom sm:modal-middle cursor-pointer"
      >
        <label className="modal-box relative bg-white no-scroll" htmlFor="">
          <label
            htmlFor="diary_modal"
            className="btn btn-primary btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="diary__modal">
            <motion.div variants={FormContVar} className="grid">
              <motion.div
                variants={FormContVar}
                className="grid gap-6 grid-cols-1"
              >
                <motion.div variants={riseVar} className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Subject</span>
                  </label>
                  <DropDown
                    value={subject.data}
                    setFunc={setSubject}
                    placeholder={
                      selDiary?.subject ? selDiary.subject : "Subject"
                    }
                    list={[
                      "Mathematics",
                      "Science",
                      "English",
                      "Kiswahili",
                      "Religious Education",
                    ]}
                  />
                </motion.div>
                <motion.div variants={riseVar} className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Assignment Type</span>
                  </label>
                  <DropDown
                    value={type.data}
                    setFunc={setType}
                    placeholder={
                      selDiary?.type ? selDiary.type : "Assignment Type"
                    }
                    list={["Book Exercise", "Craft"]}
                  />
                </motion.div>
                {type.data
                  ? type.data === "Book Exercise" && (
                      <ExerForm
                        selDiary={selDiary}
                        riseVar={riseVar}
                        change={change}
                        book={book}
                        setBook={setBook}
                        pages={pages}
                        setPages={setPages}
                      />
                    )
                  : selDiary?.type === "Book Exercise" && (
                      <ExerForm
                        selDiary={selDiary}
                        riseVar={riseVar}
                        change={change}
                        book={book}
                        setBook={setBook}
                        pages={pages}
                        setPages={setPages}
                      />
                    )}
                {type?.data === "Craft" ? (
                  <CraftForm
                    riseVar={riseVar}
                    change={change}
                    project={project}
                    setProject={setProject}
                    materials={materials}
                    setMaterials={setMaterials}
                  />
                ) : (
                  selDiary?.type === "Craft" && (
                    <CraftForm
                      selDiary={selDiary}
                      riseVar={riseVar}
                      change={change}
                      project={project}
                      setProject={setProject}
                      materials={materials}
                      setMaterials={setMaterials}
                    />
                  )
                )}
                <motion.div variants={riseVar} className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Instructions</span>
                  </label>
                  <textarea
                    type="text"
                    placeholder={
                      selDiary?.instructions
                        ? selDiary.instructions
                        : "Assignment Instructions"
                    }
                    onChange={(event) => change(event, setInstr)}
                    className={classNames(
                      "input input-primary w-full input-bordered focus:bg-white focus:border-2",
                      instr.state === "error" ? "input-error" : "text-primary"
                    )}
                  />
                </motion.div>
                <motion.div variants={riseVar} className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Assignment Timespan</span>
                  </label>
                  <div className="mx-auto">
                    <TimeSpanPickerInput
                      selDiary={selDiary}
                      setDue={setDue}
                      setTimestamp={setTimestamp}
                    />
                  </div>
                  <motion.div
                    variants={riseVar}
                    className="flex justify-end my-6"
                  >
                    <div
                      onClick={handleData}
                      className={classNames(
                        "btn btn-primary border-0 btn-lg rounded-2xl w-full md:w-1/3 ",
                        loading && "loading"
                      )}
                    >
                      Save
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </label>
      </label>
    </div>
  );
}
