import { motion } from "framer-motion";
import { classNames } from "../../../context/vars";

export default function CraftForm({
  selDiary,
  riseVar,
  change,
  project,
  setProject,
  materials,
  setMaterials,
}) {
  return (
    <>
      <motion.div variants={riseVar} className="form-control w-full">
        <label className="label">
          <span className="label-text">Project Name</span>
        </label>
        <input
          type="text"
          placeholder={selDiary?.project ? selDiary.project : "Project Name"}
          onChange={(event) => change(event, setProject)}
          className={classNames(
            "input input-primary w-full input-bordered focus:bg-white focus:border-2",
            project.state === "error" ? "input-error" : "text-primary"
          )}
        />
      </motion.div>
      <motion.div variants={riseVar} className="form-control w-full">
        <label className="label">
          <span className="label-text">Materials</span>
        </label>
        <textarea
          type="text"
          placeholder={selDiary?.materials ? selDiary.materials : "Sticks, Rope, etc."}
          onChange={(event) => change(event, setMaterials)}
          className={classNames(
            "input input-primary w-full input-bordered focus:bg-white focus:border-2",
            materials.state === "error" ? "input-error" : "text-primary"
          )}
        />
      </motion.div>
    </>
  );
}
