import dynamic from "next/dynamic";
import localforage from "localforage";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
//custom
import { classNames } from "../../helpers/utility";
//dynamic
const HiOutlineInformationCircle = dynamic(
  async () => (await import("react-icons/hi")).HiOutlineInformationCircle
);

export default function CookieAlert() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localforage.getItem("cookies", function (err, value) {
      // if err is non-null, we got an error. otherwise, value is the value
      if (!err && !value) {
        setIsOpen(true);
      };
      if(value){
        setIsOpen(false);
      }
    });
  }, []);

  const handleCookiesAccept = () => {
    localforage.setItem("cookies", true, function (err) {
      // if err is non-null, we got an error
      localforage.getItem("cookies", function (err, value) {
        // if err is non-null, we got an error. otherwise, value is the value
        if(value){
          setIsOpen(false);
        }
      });
    });
  };

  const handleCookiesDeny = () => {
    localforage.setItem("cookies", false, function (err) {
      // if err is non-null, we got an error
      localforage.getItem("cookies", function (err, value) {
        // if err is non-null, we got an error. otherwise, value is the value
        if(value){
          setIsOpen(false);
        }
      });
    });
  };

  /*useEffect(() => {
    let timer = setTimeout(() => {
      setIsOpen(false);
    }, 5000);
    return () => {
      window.clearInterval(timer);
    };
  }, []);*/

  return (
    <div className="absolute z-50 w-full p-2 pointer-events-none">
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
              "alert bg-gray-50 shadow-lg pointer-events-auto"
            )}
          >
            <div>
              <span className="text-secondary">
                <HiOutlineInformationCircle size="1.5em" />
              </span>
              <span>We use cookies for no reason.</span>
            </div>
            <div className="flex-none">
              <button onClick={handleCookiesDeny} className="btn btn-sm btn-ghost text-secondary">
                Deny
              </button>
              <button onClick={handleCookiesAccept} className="btn btn-sm btn-primary text-orange-900">
                Accept
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const spring = {
  type: "spring",
  stiffness: 100,
  damping: 30,
};

const alertAnim = {
  hide: {
    y: -100,
    scale: 0.9,
    transition: spring,
  },
  rest: {
    y: 0,
    scale: 1,
    transition: spring,
  },
  tap: {
    scale: 1.1,
    transition: spring,
  },
};
