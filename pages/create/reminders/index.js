import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
//hooks
import useUserFetch from "../../../helpers/hooks/user";
import useClassroomFetch from "../../../helpers/hooks/classroom";
//custom
import { useData } from "../../../context/dataContext";
import { classNames, isEmpty } from "../../../helpers/utility";
import DatePickerComp from "../../../components/elements/datePickerComp";

export default function CreateReminder() {
  const { selReminder } = useData();
  const { user } = useUserFetch();
  const { updateReminderInfo } = useClassroomFetch(user);
  const [loading, setLoading] = useState(false);
  //form data
  const [scope, setScope] = useState({ data: "default", state: null });
  const [type, setType] = useState({ data: "default", state: null });
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
    setEventType({ data: "", state: null });
    setType({ data: "default", state: null });
    setScope({ data: "default", state: null });
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
      if (scope.state !== "success" || scope.data === "default") {
        setScope({ ...scope, state: "error" });
      }
      if (type.state !== "success" || type.data === "default") {
        setType({ ...type, state: "error" });
      }
      if (eventType.state !== "success") {
        setEventType({ ...eventType, state: "error" });
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
          toast.success(
            <div>
              <h5 className="font-medium text-gray-900">Success</h5>
              <h6>Reminder created successfully</h6>
            </div>,
            {
              closeOnClick: true,
            }
          );
        })
        .catch((err) => {
          console.log(err);
          toast.error(
            <div>
              <h5 className="font-medium text-gray-900">Success</h5>
              <h6>Error occurred when trying to save the reminder</h6>
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
    <main className="py-16 px-4">
      <motion.div
        variants={FormContVar}
        className="grid max-w-lg mx-auto text-cyan-700"
      >
        <motion.div variants={FormContVar} className="grid gap-6 grid-cols-1">
          <motion.div variants={riseVar} className="form-control w-full">
            <label className="label">
              <span className="label-text text-cyan-500">Reminder Scope</span>
            </label>
            <select
              value={scope.data}
              onChange={(event) => change(event, setScope, "sel")}
              className={classNames(
                "select w-full",
                scope.state === "error"
                  ? "text-error select-error"
                  : "select-primary"
              )}
            >
              <option disabled value={"default"}>
                Select Reminder Scope
              </option>
              <option value={"sch"}>School</option>
              <option value={"cls"}>Class</option>
            </select>
            {scope.state === "error" && (
              <p className="text-error text-xs italic text-center mt-1">
                Please select an option.
              </p>
            )}
          </motion.div>
          <motion.div variants={riseVar} className="form-control w-full">
            <label className="label">
              <span className="label-text text-cyan-500">Reminder Type</span>
            </label>
            <select
              value={type?.data}
              onChange={(event) => change(event, setType, "sel")}
              className={classNames(
                "select w-full",
                type.state === "error"
                  ? "text-error select-error"
                  : "select-primary"
              )}
            >
              <option disabled value={"default"}>
                Select Reminder Type
              </option>
              <option value={"single"}>Single</option>
              <option value={"recur"}>Recurring</option>
            </select>
            {type.state === "error" && (
              <p className="text-error text-xs italic text-center mt-1">
                Please select an option.
              </p>
            )}
          </motion.div>
          <motion.div variants={riseVar} className="form-control w-full">
            <label className="label">
              <span className="label-text text-cyan-500">Event Type</span>
            </label>
            <input
              type="text"
              value={eventType?.data}
              onChange={(event) => change(event, setEventType)}
              placeholder={
                selReminder?.eventType ? selReminder.eventType : "Opening Day"
              }
              className={classNames(
                "input input-primary w-full input-bordered focus:bg-white focus:border-2",
                eventType?.state === "error" && "input-error"
              )}
            />
            {eventType?.state === "error" && (
              <p className="text-error text-xs italic text-center mt-1">
                Please fill out the field with a valid input
              </p>
            )}
          </motion.div>
          {/**
             
          <motion.div variants={riseVar} className="form-control w-full">
            <label className="label">
              <span className="label-text text-cyan-500">Event Type</span>
            </label>
            <select
              defaultValue={"default"}
              onChange={(event) => change(event, setEventType, "sel")}
              className={classNames(
                "select w-full",
                eventType.state === "error"
                  ? "text-error select-error"
                  : "select-primary"
              )}
            >
              <option disabled value={"default"}>
                Select Event Type
              </option>
              <option value={"exam"}>Exam</option>
              <option value={"open"}>Opening</option>
              <option value={"swim"}>Swimming</option>
              <option value={"close"}>Closing</option>
            </select>
            {eventType.state === "error" && (
              <p className="text-error text-xs italic text-center mt-1">
                Please select an option.
              </p>
            )}
          </motion.div>

            */}

          <motion.div variants={riseVar} className="form-control w-full">
            <label className="label">
              <span className="label-text text-cyan-500">Content</span>
            </label>
            <textarea
              type="text"
              value={content?.data}
              onChange={(event) => change(event, setContent)}
              placeholder={
                selReminder?.content ? selReminder.content : "content"
              }
              className={classNames(
                "input input-primary w-full input-bordered focus:bg-white focus:border-2",
                content.state === "error" && "input-error"
              )}
            />
            {content.state === "error" && (
              <p className="text-error text-xs italic text-center mt-1">
                Please fill out the field with a valid input
              </p>
            )}
          </motion.div>
          <motion.div variants={riseVar} className="form-control w-full">
            <p className="text-center mb-2 text-cyan-500">Reminder Date</p>
            <div className="mx-auto">
              <DatePickerComp
                selReminder={selReminder}
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
