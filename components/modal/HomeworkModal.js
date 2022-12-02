import Router from "next/router";
import { useState } from "react";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
//hooks
import { useData } from "../../context/dataContext";
import useUserFetch from "../../helpers/hooks/user";
import useClassroomFetch from "../../helpers/hooks/classroom";
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
  const { selHomework, setSelHomeworkMode } = useData();
  const { user } = useUserFetch();
  const { removeHomework } = useClassroomFetch (user);

  const handleEdit = () => {
    setSelHomeworkMode("edit");
    Router.push("/create/homework");
    handleCloseModal();
  };
  const handlDelete = () => {
    setLoading(true);
    removeHomework(selHomework)
      .then((res) => {
        console.log(res);
        setLoading(false);
        toast.success(
          <div>
            <h5 className="font-medium text-gray-900">Success</h5>
            <h6>Homework deleted successfully</h6>
          </div>,
          {
            closeOnClick: true,
          }
        );
        Router.push("/homework/homework");
        handleCloseModal();
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          <div>
            <h5 className="font-medium text-gray-900">Error</h5>
            <h6>Error occurred when trying to delete the homework</h6>
          </div>,
          {
            closeOnClick: true,
          }
        );
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
