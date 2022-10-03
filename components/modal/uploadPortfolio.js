import { useRef, useState } from "react";
import Image from "next/image";
//custom
import { useData } from "../../context/dataContext";
import { classNames, isEmpty } from "../../helpers/utility";
//hooks
import useStudentFetch from "../../helpers/hooks/students/student";
//icons
import { BsCameraFill } from "react-icons/bs";

export default function ModalUploadPortfolio() {
  const filePickerRef = useRef(null);
  const { selStudent, SetAlert } = useData();
  const { uploadPortfolioPicture } = useStudentFetch();

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadPictureCall = () => {
    if (loading) return;
    if (!isEmpty(selStudent) && selectedFile) {
      setLoading(true);
      uploadPortfolioPicture(selectedFile, "caption")
        .then((res) => {
          if (res === "done") {
            handleCloseModal(false);
            SetAlert({
              type: "success",
              message: "Uploaded Successfully",
            });
            setLoading(false);
            setSelectedFile(null);
          } else {
            console.log(res.message);
          }
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const handleCloseModal = () => {
    document.getElementById("photo_modal").checked = false;
  };

  return (
    <div>
      <input type="checkbox" id="photo_modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box pb-20">
          <div className="flex items-center justify-between pb-6">
            <p className="text-lg text-secondary">
              {selStudent?.name} Portfolio Upload
            </p>
            <label
              htmlFor="photo_modal"
              className="btn btn-sm btn-secondary btn-outline btn-circle"
            >
              ✕
            </label>
          </div>
          <div className="mb-2">
            <div className="flex justify-center items-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                {selectedFile ? (
                  <div className="relative h-[98%] w-[98%] rounded-md overflow-hidden">
                    <Image
                      src={selectedFile}
                      layout="fill"
                      objectFit="cover"
                      alt=""
                    />
                  </div>
                ) : (
                  <div className="flex flex-col justify-center items-center pt-5 pb-6 text-gray-500 dark:text-gray-400">
                    <BsCameraFill size="3em" />
                    <p className="mb-2 text-sm">
                      <span className="font-semibold">Click to take picture or upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs">SVG, PNG, JPG or GIF.</p>
                  </div>
                )}
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  ref={filePickerRef}
                  onChange={addImageToPost}
                />
              </label>
            </div>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Caption</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
            />
          </div>
          <div className="modal-action">
            <button
              htmlFor="photo_modal"
              onClick={uploadPictureCall}
              className={classNames(
                "btn btn-secondary btn-wide mx-auto",
                loading && "loading"
              )}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
