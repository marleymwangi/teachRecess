import Router from "next/router";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
//hooks
import useUserFetch from "../../../helpers/hooks/user";
import useClassroomFetch from "../../../helpers/hooks/classroom";
//custom
import { useData } from "../../../context/dataContext";
import { classNames, isEmpty } from "../../../helpers/utility";

export default function CreateDiary() {
  const { selReminder } = useData();
  const { user } = useUserFetch();
  const { updateDiaryInfo } = useClassroomFetch(user);
  const [loading, setLoading] = useState(false);
  //form data
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

  const handleData = async (e) => {
    e.preventDefault();
    if (isValidated()) {
      setLoading(true);
      //validate()
      let obj = {};
      !isEmpty(content.data) && (obj.content = content.data.trim());
      obj.timestamp = new Date();

      updateDiaryInfo(obj)
        .then((res) => {
          console.log(res);
          clear();
          setLoading(false);
          toast.success(
            <div>
              <h5 className="font-medium text-gray-900">Success</h5>
              <h6>Diary created successfully</h6>
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
              <h6>Error occurred when trying to save the diary</h6>
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
    <main className="min-h-[95vh] pt-32 px-4">
      <motion.div
        variants={FormContVar}
        className="grid max-w-lg mx-auto text-cyan-700"
      >
        <motion.div variants={FormContVar} className="grid gap-6 grid-cols-1">
          <motion.div variants={riseVar} className="form-control w-full">
            <label className="label mb-5">
              <span className="label-text text-center w-full font-medium text-lg text-cyan-500">
                Diary for the Day
              </span>
            </label>
            <textarea
              type="text"
              placeholder={
                selReminder?.content ? selReminder.content : "Type here"
              }
              onChange={(event) => change(event, setContent)}
              className={classNames(
                "input input-primary w-full min-h-[10vh] input-bordered focus:bg-white focus:border-2",
                content.state === "error" && "input-error"
              )}
            />
            {content.state === "error" && (
              <p className="text-error text-xs italic text-center mt-1">
                Please fill out the field with a valid input
              </p>
            )}
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
