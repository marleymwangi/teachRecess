import dynamic from "next/dynamic";
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
//custom
import { classNames } from "../../helpers/utility";
import { useEffect, useState } from "react";
import { useData } from "../../context/dataContext";
//dynamic
const HiOutlineInformationCircle = dynamic(
  async () => (await import("react-icons/hi")).HiOutlineInformationCircle
);
const HiCheck = dynamic(async () => (await import("react-icons/hi")).HiCheck);
const IoWarningOutline = dynamic(
  async () => (await import("react-icons/io5")).IoWarningOutline
);
const BiErrorAlt = dynamic(
  async () => (await import("react-icons/bi")).BiErrorAlt
);

export default function Alerts() {
  const { alerts } = useData();

  return (
    <div className="fixed z-[100] top-0 w-full p-2 flex flex-col gap-2 pointer-events-none">
      <LayoutGroup>
        {alerts.map((alrt, i) => (
          <Alert index={i} data={alrt} key={alrt.id} />
        ))}
      </LayoutGroup>
    </div>
  );
}

const Alert = ({ index, data }) => {
  const [isOpen, setIsOpen] = useState(true);
  const { alerts, RemoveAlerts } = useData();

  useEffect(() => {
    let timer = setTimeout(() => {
      setIsOpen(false);
    }, 5000);
    return () => {
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    let timer;
    if (index + 1 === alerts.length) {
      if (!isOpen) {
        timer = setTimeout(() => {
          RemoveAlerts();
        }, 3000);
      }
    }
    return () => {
      window.clearInterval(timer);
    };
  }, [isOpen, alerts, index, RemoveAlerts]);

  const getClass = () => {
    switch (data.type) {
      case "info":
        return "alert-info";
      case "success":
        return "alert-success";
      case "warning":
        return "alert-warning";
      case "error":
        return "alert-error";
      default:
        return "";
    }
  };

  const handleFinish = () =>{
    console.log("isOpen", isOpen)
    console.log("animation ended")
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={alertAnim}
          initial="hide"
          animate="rest"
          exit="hide"
          layout
          whileTap="tap"
          whileHover="hover"
          className={classNames(
            "alert shadow-lg pointer-events-auto",
            getClass()
          )}
        >
          <div className="w-full">
            {data?.type === "info" && (
              <HiOutlineInformationCircle size="1.5em" />
            )}
            {data?.type === "success" && <HiCheck size="1.5em" />}
            {data?.type === "warning" && <IoWarningOutline size="1.5em" />}
            {data?.type === "error" && <BiErrorAlt size="1.5em" />}
            <span>{data?.message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const spring = {
  type: "spring",
  stiffness: 100,
  damping: 30,
};

const exit = {
  type: "spring", duration: 0.8
};

const alertAnim = {
  hide: {
    y: -10,
    opacity: 0,
    scale: 0.9,
    transition: exit,
  },
  rest: {
    y: 0,
    scale: 1,
    opacity: 1,
    transition: spring,
  },
  tap: {
    scale: 1.1,
    transition: spring,
  },
};
