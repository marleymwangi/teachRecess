import { motion } from "framer-motion";
//custom
import { classNames } from "../../../helpers/utility";

export default function ExerForm({
  selHomework,
  change,
  book,
  setBook,
  pages,
  setPages,
}) {
  return (
    <>
      <motion.div variants={riseVar} className="form-control w-full">
        <label className="label">
          <span className="label-text text-emma-500">Book Name</span>
        </label>
        <input
          type="text"
          placeholder={selHomework?.book ? selHomework.book : "Book Name"}
          onChange={(event) => change(event, setBook)}
          className={classNames(
            "input input-primary w-full input-bordered focus:bg-white focus:border-2",
            book?.state === "error" && "input-error"
          )}
        />
        {book?.state === "error" && (
          <p className="text-error text-xs italic text-center mt-1">
            Please fill out the field with a valid input
          </p>
        )}
      </motion.div>
      <motion.div variants={riseVar} className="form-control w-full">
        <label className="label">
          <span className="label-text text-emma-500">Pages</span>
        </label>
        <input
          type="text"
          placeholder={selHomework?.page ? selHomework.page : "22, 24, 25"}
          onChange={(event) => change(event, setPages)}
          className={classNames(
            "input input-primary w-full input-bordered focus:bg-white focus:border-2",
            pages?.state === "error" && "input-error"
          )}
        />
        {pages?.state === "error" && (
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
