import Image from "next/image";
import dynamic from "next/dynamic";
import { useRef, useState, useEffect } from "react";
//custom
import swal from "sweetalert";
import { motion } from "framer-motion";
import { useData } from "../../../context/dataContext";
import DropDown from "../../elements/dropDown";
import DatePickerComp from "../../elements/calendar/datePickerComp";

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

export default function ReminderEntryModal() {
  const { selReminder, updateReminderInfo } = useData();
  const [loading, setLoading] = useState(false);
  //form data
  const [scope, setScope] = useState({ data: "", state: null });
  const [type, setType] = useState({ data: "", state: null });
  const [eventType, setEventType] = useState({ data: "", state: null });
  const [content, setContent] = useState({ data: "", state: null });
  const [timestamp, setTimestamp] = useState(null);

  useEffect(() => {
    //console.log("due", due);
    //console.log("timestamp", timestamp);
  }, [timestamp]);

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
    setEventType({ data: "", state: null });
    setType({ data: "", state: null });
    setScope({ data: "", state: null });
    setContent({ data: "", state: null });
  };

  const isValidated = () => {
    if (
      scope.state === "success" &&
      eventType.state === "success" &&
      type.state === "success" &&
      content.state === "success"
    ) {
      return true;
    } else {
      if (scope.state !== "success") {
        setScope({ ...scope, state: "error" });
      }
      if (eventType.state !== "success") {
        setEventType({ ...eventType, state: "error" });
      }
      if (type.state !== "success") {
        setType({ ...type, state: "error" });
      }
      if (content.state !== "success") {
        setContent({ ...content, state: "error" });
      }
      return false;
    }
  };

  const handleData = async (e) => {
    e.preventDefault();
    if (isValidated()) {
      setLoading(true);
      //validate()
      let obj = {};
      !isEmpty(type.data) && (obj.type = type.data.trim());
      !isEmpty(eventType.data) && (obj.eventType = eventType.data.trim());
      !isEmpty(scope.data) && (obj.scope = scope.data.trim());
      !isEmpty(content.data) && (obj.content = content.data.trim());
      !isEmpty(timestamp) && (obj.timestamp = timestamp);

      console.log(obj);
      updateReminderInfo(obj)
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
    }
  };

  const handleCloseModal = () => {
    document.getElementById("reminder_modal").checked = false;
  };

  return (
    <div>
      <input type="checkbox" id="reminder_modal" className="modal-toggle" />
      <label
        htmlFor="reminder_modal"
        className="modal modal-bottom sm:modal-middle cursor-pointer"
      >
        <label className="modal-box relative bg-white no-scroll" htmlFor="">
          <label
            htmlFor="reminder_modal"
            className="btn btn-primary btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="entry__modal caret-black">
            <motion.div variants={FormContVar} className="grid">
              <motion.div
                variants={FormContVar}
                className="grid gap-6 grid-cols-1"
              >
                <motion.div variants={riseVar} className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Reminder Scope</span>
                  </label>
                  <DropDown
                    value={scope.data}
                    setFunc={setScope}
                    placeholder={
                      selReminder?.scope ? selReminder.scope : "Reminder Scope"
                    }
                    list={["School", "Class"]}
                    error={scope.state === "error"}
                  />
                  {scope.state === "error" && (
                    <p className="text-error text-xs italic text-center mt-1">
                      Please select an option.
                    </p>
                  )}
                </motion.div>
                <motion.div variants={riseVar} className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Reminder Type</span>
                  </label>
                  <DropDown
                    value={eventType.data}
                    setFunc={setEventType}
                    placeholder={
                      selReminder?.eventType
                        ? selReminder.eventType
                        : "Reminder Type"
                    }
                    list={["Single", "Recurring"]}
                    error={eventType.state === "error"}
                  />
                  {eventType.state === "error" && (
                    <p className="text-error text-xs italic text-center mt-1">
                      Please select an option.
                    </p>
                  )}
                </motion.div>
                <motion.div variants={riseVar} className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Event Type</span>
                  </label>
                  <DropDown
                    value={type.data}
                    setFunc={setType}
                    placeholder={
                      selReminder?.type ? selReminder.type : "Event Type"
                    }
                    list={["Info", "Urgent"]}
                    error={type.state === "error"}
                  />
                  {type.state === "error" && (
                    <p className="text-error text-xs italic text-center mt-1">
                      Please select an option.
                    </p>
                  )}
                </motion.div>
                <motion.div variants={riseVar} className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    type="text"
                    placeholder={
                      selReminder?.content ? selReminder.content : "content"
                    }
                    onChange={(event) => change(event, setContent)}
                    className={classNames(
                      "input input-primary w-full input-bordered focus:bg-white focus:border-2",
                      content.state === "error" ? "input-error" : "text-primary"
                    )}
                  />
                  {content.state === "error" && (
                    <p className="text-error text-xs italic text-center mt-1">
                      Please fill out the field with a valid input
                    </p>
                  )}
                </motion.div>
                <motion.div variants={riseVar} className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Reminder Date</span>
                  </label>
                  <div className="mx-auto">
                    <DatePickerComp
                      selReminder={selReminder}
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
