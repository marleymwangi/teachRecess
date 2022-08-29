import Image from "next/image";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
//custom packages
import { motion } from "framer-motion";
import swal from "sweetalert";
import { isToday, format, formatDistance } from "date-fns";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
//custom
import { db } from "../../firebase";
import { useData } from "../../context/dataContext";
import PieG from "../elements/charts/pieG";
import { classNames } from "../../context/vars";
//dynamic
const BsBook = dynamic(async () => (await import("react-icons/bs")).BsBook);
const RiPagesLine = dynamic(
  async () => (await import("react-icons/ri")).RiPagesLine
);
const FiHelpCircle = dynamic(
  async () => (await import("react-icons/fi")).FiHelpCircle
);
const MdOutlineTimer = dynamic(
  async () => (await import("react-icons/md")).MdOutlineTimer
);
const MdOutlineTimerOff = dynamic(
  async () => (await import("react-icons/md")).MdOutlineTimerOff
);
const MdOutlineIntegrationInstructions = dynamic(
  async () => (await import("react-icons/md")).MdOutlineIntegrationInstructions
);

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

export default function MessageModal() {
  const { teacher, selDiary, setSelDiaryMode, removeDiaryInfo } = useData();
  const [loading, setLoading] = useState(false);
  const [diary, setDiary] = useState(selDiary);
  const [temp, setTemp] = useState(0);

  //form data
  const [mess, setMess] = useState({ data: "", state: null });

  const change = (event, setFunction, type = "str") => {
    switch (type) {
      case "str":
        setFunction({
          data: event.target.value,
          state: "success",
        });
        break;
      default:
        break;
    }
  };

  const handleCloseModal = () => {
    document.getElementById("message_modal").checked = false;
  };

  return (
    <div>
      <input type="checkbox" id="message_modal" className="modal-toggle" />
      <label
        htmlFor="message_modal"
        className="modal modal-bottom sm:modal-middle cursor-pointer"
      >
        <label className="modal-box relative bg-white no-scroll" htmlFor="">
          <label
            htmlFor="message_modal"
            className="btn btn-primary btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="message__modal">
            <motion.div variants={FormContVar} className="grid">
              <motion.div
                variants={FormContVar}
                className="grid gap-6 grid-cols-1"
              >
                <motion.div variants={riseVar} className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Message</span>
                  </label>
                  <textarea
                    type="text"
                    placeholder="Type your message here"
                    onChange={(event) => change(event, setMess)}
                    className={classNames(
                      "input input-primary w-full input-bordered focus:bg-white focus:border-2",
                      mess.state === "error" ? "input-error" : "text-primary"
                    )}
                  />
                </motion.div>
              </motion.div>
              <button className="btn btn-primary my-4">Send</button>
            </motion.div>
          </div>
        </label>
      </label>
    </div>
  );
}
