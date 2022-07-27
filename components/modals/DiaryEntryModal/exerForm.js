import { motion } from "framer-motion";
import { classNames } from "../../../context/vars";

export default function ExerForm({
  selDiary,
  riseVar,
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
          <span className="label-text">Book Name</span>
        </label>
        <input
          type="text"
          placeholder={selDiary?.book ? selDiary.book : "Book Name"}
          onChange={(event) => change(event, setBook)}
          className={classNames(
            "input input-primary w-full input-bordered focus:bg-white focus:border-2",
            book.state === "error" ? "input-error" : "text-primary"
          )}
        />
      </motion.div>
      <motion.div variants={riseVar} className="form-control w-full">
        <label className="label">
          <span className="label-text">Pages</span>
        </label>
        <input
          type="text"
          placeholder={selDiary?.page ? selDiary.page : "22, 24, 25"}
          onChange={(event) => change(event, setPages)}
          className={classNames(
            "input input-primary w-full input-bordered focus:bg-white focus:border-2",
            pages.state === "error" ? "input-error" : "text-primary"
          )}
        />
      </motion.div>
    </>
  );
}
