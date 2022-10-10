import { motion } from "framer-motion";
//custom
import { classNames } from "../../helpers/utility";

export default function SquareCard({ color, content }) {
  const getColorGradR = () => {
    switch (color) {
      case "complete":
        return "bg-gradient-to-tr from-emerald-400 via-emerald-300 to-emerald-200";
      case "error":
        return "bg-gradient-to-tr from-red-400 via-red-300 to-red-200";
      default:
        return "bg-gradient-to-tr from-emma-400 via-emma-300 to-emma-200";
    }
  };

  const getColorDark = () => {
    switch (color) {
      case "complete":
        return "bg-emerald-400";
      case "error":
        return "bg-red-400";
      default:
        return "bg-emma-400";
    }
  };

  const getColorGradL = () => {
    switch (color) {
      case "complete":
        return "bg-gradient-to-tl from-emerald-200 to-emerald-300";
      case "error":
        return "bg-gradient-to-tl from-red-200 to-red-300";
      default:
        return "bg-gradient-to-tl from-emma-200 to-emma-300";
    }
  };

  return (
    <motion.div
      variants={contAnim}
      initial="hide"
      animate="rest"
      //whileTap="tap"
      className={classNames(
        "relative min-h-[150px] w-full overflow-hidden transition-all duration-500 ease-in-out",
        getColorGradR(color)
      )}
    >
      <div
        className={classNames(
          "absolute h-[35vh] w-[35vh] rotate-45 -top-[10vh] -right-[10vh] z-0 transition-all duration-500 ease-in-out",
          getColorDark(color)
        )}
      >
        <div
          className={classNames(
            "absolute h-[20vh] w-[20vh] abs-center transition-all duration-500 ease-in-out",
            getColorGradL(color)
          )}
        >
          <div
            className={classNames(
              "absolute h-[10vh] w-[10vh] abs-center transition-all duration-500 ease-in-out",
              getColorDark(color)
            )}
          />
        </div>
      </div>
      {content || null}
    </motion.div>
  );
}

const spring = {
  type: "spring",
  stiffness: 500,
  damping: 30,
};

const contAnim = {
  hide: {
    scale: 0.9,
    opacity: 0,
    transition: spring,
  },
  rest: {
    scale: 1,
    opacity: 1,
    transition: spring,
  },
  tap: {
    scale: 0.9,
    transition: spring,
  },
};
