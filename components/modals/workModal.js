import Image from "next/image";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
//custom packages
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

export default function WorkModal() {
  const { teacher, selDiary, setSelDiaryMode, removeDiaryInfo } = useData();
  const [loading, setLoading] = useState(false);
  const [diary, setDiary] = useState(selDiary);
  const [temp, setTemp] = useState(0);

  useEffect(() => {
    if (selDiary && teacher) {
      const q = doc(
        db,
        "schools",
        teacher?.schoolId,
        "classes",
        teacher?.classId,
        "diaries",
        selDiary?.id
      );

      return onSnapshot(q, (docSnap) => {
        if (docSnap.exists()) {
          setDiary({
            id: docSnap.id,
            student: selDiary.student,
            ...docSnap.data(),
            timestamp: docSnap.data().timestamp.toDate(),
            due: docSnap.data().due.toDate(),
          });
        }
      });
    }
  }, [selDiary]);

  useEffect(() => {
    let tmp = Math.floor(Math.random() * 100) + 1;
    setTemp(tmp);
  }, [selDiary]);

  useEffect(() => {
    //console.log("diary", diary);
  }, [diary]);

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

  const handleEditClick = () => {
    setSelDiaryMode("edit");
  };

  const handleDeleteClick = () => {
    if (diary) {
      removeDiaryInfo(diary)
        .then((res) => {
          console.log(res);
          setLoading(false);
          swal("Done!", "Deleted Successfully!", "success");
          handleCloseModal();
        })
        .catch((err) => {
          console.log(err);
          swal("Sorry!", "Error while deleting!", "error");
        });
    }
  };

  const handleCloseModal = () => {
    document.getElementById("work_modal").checked = false;
  };

  return (
    <div>
      <input type="checkbox" id="work_modal" className="modal-toggle" />
      <label
        htmlFor="work_modal"
        className="modal modal-bottom sm:modal-middle cursor-pointer"
      >
        <label className="modal-box relative bg-white no-scroll" htmlFor="">
          <label
            htmlFor="work_modal"
            className="btn btn-primary btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="work__modal">
            <div className="heading">
              <h1>Assignment Details</h1>
            </div>
            <h2>{diary?.subject} Assignment</h2>
            <PieG num={temp}/>
            <div className={classNames("details", textClr("sky"))}>
              {diary?.type === "Book Exercise" && (
                <>
                  <div className="item">
                    <div>
                      <BsBook size="2em" /> <span>Book</span>
                    </div>
                    <span>{diary?.book}</span>
                  </div>
                  <div className="item">
                    <div className="flex items-center">
                      <RiPagesLine size="2em" /> <span>Page</span>
                    </div>
                    <span>{diary?.pages}</span>
                  </div>
                </>
              )}
              {diary?.type === "Craft" && (
                <>
                  <div className="item">
                    <div>
                      <BsBook size="2em" /> <span>Project</span>
                    </div>
                    <span>{diary?.project}</span>
                  </div>
                  <div className="item">
                    <div className="flex items-center">
                      <RiPagesLine size="2em" /> <span>Materials</span>
                    </div>
                    <span>{diary?.materials}</span>
                  </div>
                </>
              )}
              <div className="item">
                <div className="flex items-center">
                  <MdOutlineIntegrationInstructions size="2em" />{" "}
                  <span>Instructions</span>
                </div>
                <span>{diary?.instructions}</span>
              </div>
              <div className="item">
                <div className="flex items-center">
                  <MdOutlineTimerOff size="2em" /> <span>Issued On</span>
                </div>
                <span>
                  {isToday(diary?.timestamp)
                    ? "Today"
                    : diary?.timestamp && format(diary.timestamp, "dd EE LLL")}
                </span>
              </div>
              <div className="item">
                <div className="flex items-center">
                  <MdOutlineTimer size="2em" /> <span>Duration</span>
                </div>
                <span>
                  {diary?.due &&
                    diary?.timestamp &&
                    formatDistance(diary.timestamp, diary.due)}
                </span>
              </div>
              <div className="item">
                <div className="flex items-center">
                  <MdOutlineTimerOff size="2em" /> <span>Due</span>
                </div>
                <span>
                  {isToday(diary?.due)
                    ? "Today"
                    : diary?.due && format(diary.due, "dd EE LLL")}
                </span>
              </div>
            </div>
            <div className="button__sec">
              <label htmlFor="diary_modal" onClick={handleEditClick}>
                Edit
                <FiHelpCircle size="1.5em" />
              </label>
              <button
                className={loading ? "loading" : ""}
                onClick={handleDeleteClick}
              >
                Delete
                <FiHelpCircle size="1.5em" />
              </button>
            </div>
          </div>
        </label>
      </label>
    </div>
  );
}
