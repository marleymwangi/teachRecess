import { motion } from "framer-motion";
//custom
import Title from "../elements/title";
import ClassComponent from "./classComponent";

const contVar = {
  show: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
};

export default function Classes() {
  return (
    <motion.section variants={contVar} initial="hide" animate="show" className="container px-8">
      <div className="flex items-center justify-center my-4">
        <ClassComponent />
      </div>
    </motion.section>
  );
}
