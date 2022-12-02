import Image from "next/image";
import { motion } from "framer-motion";
import { useRef } from "react";
//custom
import { classNames } from "../../../helpers/utility";
//icons
import { BsCameraFill } from "react-icons/bs";

export default function UploadForm({ selectedFile, setSelectedFile }) {
  const filePickerRef = useRef(null);

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  return (
    <>
      <motion.div variants={riseVar} className="form-control w-full">
        <label
          htmlFor="dropzone-file"
          className={classNames(
            "flex flex-col justify-center items-center w-full h-64 rounded-lg bg-gray-50  border-2  border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600",
            selectedFile ? "border-primary" : "border-gray-300"
          )}
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
                <span className="font-semibold">
                  Click to take picture or upload
                </span>{" "}
                or drag and drop
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
        {false === "error" && (
          <p className="text-error text-xs italic text-center mt-1">
            Please fill out the field with a valid input
          </p>
        )}
      </motion.div>
    </>
  );
}

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
