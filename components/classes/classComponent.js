import Link from "next/link";
import dynamic from "next/dynamic";
//custom packages
import { motion } from "framer-motion";
//custom
import { useData } from "../../context/dataContext";
//dynamic
const RiBuilding2Fill = dynamic(
  async () => (await import("react-icons/ri")).RiBuilding2Fill
);
const MdClass = dynamic(async () => (await import("react-icons/md")).MdClass);

const slideVar = {
  hide: {
    opacity: 0,
    x: 10,
    scale: 0.9,
  },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.25,
    },
  },
};

export default function ClassComponent() {
  const { schoolData, classData } = useData();

  return (
    <Link href="/attendance/students">
      <motion.div variants={slideVar} className="class__comp">
        <div className="info">
          <div className="label">
            <div className="icon">
              <RiBuilding2Fill size="1rem" />
            </div>
            <span>school</span>
          </div>
          <h4>{schoolData?.name}</h4>
        </div>
        <div className="info">
          <div className="label">
            <div className="icon">
              <MdClass size="1rem" />
            </div>
            <span>class</span>
          </div>
          <h4>{classData?.name}</h4>
        </div>
      </motion.div>
    </Link>
  );
}
