import Router from "next/router";
import { useState } from "react";
import dynamic from "next/dynamic";
//hooks
import { useData } from "../../context/dataContext";
import useTeacherFetch from "../../helpers/hooks/teacher";
//custom
import { classNames } from "../../helpers/utility";
//dynamic
const BiEditAlt = dynamic(
  async () => (await import("react-icons/bi")).BiEditAlt
);
const RiDeleteBin7Line = dynamic(
  async () => (await import("react-icons/ri")).RiDeleteBin7Line
);

export default function ModalHomework() {
  const [loading, setLoading] = useState(false);
  const { selHomework, SetAlert, setSelHomeworkMode } = useData();
  const { removeHomework } = useTeacherFetch();

  const handleEdit = () => {
    setSelHomeworkMode("edit")
    Router.push("/create/homework");
    handleCloseModal();
  };
  const handlDelete = () => {
    setLoading(true);
    removeHomework(selHomework)
      .then((res) => {
        console.log(res);
        setLoading(false);
        SetAlert({
          type: "success",
          message: "Deleted Successfully",
        });
        Router.push("/homework/homework");
        handleCloseModal();
      })
      .catch((err) => {
        console.log(err);
        SetAlert({
          type: "error",
          message: "Error occurred when trying to delete the homework",
        });
        setLoading(false);
      });
  };

  const handleCloseModal = () => {
    document.getElementById("homework_modal").checked = false;
  };

  return (
    <div>
      <input type="checkbox" id="homework_modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box pb-20">
          <div className="flex items-center justify-between pb-6">
            <p className="text-lg text-gray-400">Homework Options</p>
            <label
              htmlFor="homework_modal"
              className="btn btn-sm btn-primary btn-outline btn-circle"
            >
              ✕
            </label>
          </div>
          <div className="grid gap-4 w-full text-center text-cyan-500 font-poppins">
            <button
              onClick={handleEdit}
              className="btn btn-lg text-base btn-ghost bg-gray-100 btn-secondary gap-2"
            >
              <BiEditAlt size="1.25em" />
              <p>Edit</p>
            </button>
            <button
              onClick={handlDelete}
              className={classNames(
                "btn btn-lg text-base btn-ghost bg-gray-100 btn-secondary gap-2",
                loading && "loading"
              )}
            >
              <RiDeleteBin7Line size="1.25em" />
              <p>Delete</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
