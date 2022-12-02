import { motion } from "framer-motion";
//custom
import { classNames } from "../../../helpers/utility";

export default function CraftForm({
  selHomework,
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
          <span className="label-text text-cyan-500">Project Name</span>
        </label>
        <input
          type="text"
          placeholder={selHomework?.project || "Project Name"}
          onChange={(event) => change(event, setProject)}
          className={classNames(
            "input input-primary w-full input-bordered focus:bg-white",
            project?.state === "error" && "input-error"
          )}
        />
        {project?.state === "error" && (
          <p className="text-error text-xs italic text-center mt-1">
            Please fill out the field with a valid input
          </p>
        )}
      </motion.div>
      <motion.div variants={riseVar} className="form-control w-full">
        <label className="label">
          <span className="label-text text-cyan-500">Materials</span>
        </label>
        <textarea
          type="text"
          placeholder={selHomework?.materials || "Sticks, Rope, etc."}
          onChange={(event) => change(event, setMaterials)}
          className={classNames(
            "input input-primary w-full input-bordered focus:bg-white",
            materials?.state === "error" && "input-error"
          )}
        />
        {materials?.state === "error" && (
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
