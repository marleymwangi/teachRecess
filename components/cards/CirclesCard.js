import { classNames } from "../../helpers/utility";

export default function CirclesCard({ color, content }) {

  const getColorGrad = () => {
    switch (color) {
      case "cyan":
        return "bg-cyan-100";
      case "teal":
        return "bg-teal-100";
      case "cyan":
        return "bg-cyan-100";
      default:
        return "bg-gradient-to-r from-cyan-600 via-cyan-500 to-cyan-400";
    }
  };

  const getColorNorm = () => {
    switch (color) {
      case "cyan":
        return "bg-cyan-200";
      case "teal":
        return "bg-teal-200";
      case "cyan":
        return "bg-cyan-200";
      default:
        return "bg-cyan-200";
    }
  };

  const getColorLight = () => {
    switch (color) {
      case "cyan":
        return "bg-cyan-200";
      case "teal":
        return "bg-teal-200";
        case "cyan":
          return "bg-cyan-200";
      default:
        return "bg-cyan-200";
    }
  };

  const getColorDark = () => {
    switch (color) {
      case "cyan":
        return "bg-cyan-300";
      case "teal":
        return "bg-teal-300";
        case "cyan":
          return "bg-cyan-300";
      default:
        return "bg-gradient-to-l from-cyan-700 to-cyan-500";
    }
  };

  return (
    <div
      className={classNames(
        "relative rounded-box min-h-[150px] w-full overflow-hidden",
        getColorGrad(color)
      )}
    >
      <div
        className={classNames(
          "absolute h-[35vh] w-[35vh] rounded-full -top-[10vh] -right-[10vh] z-0",
          getColorLight(color)
        )}
      >
        <div
          className={classNames(
            "absolute h-[20vh] w-[20vh] rounded-full abs-center",
            getColorDark(color)
          )}
        >
          <div
            className={classNames(
              "absolute h-[10vh] w-[10vh] rounded-full abs-center",
              getColorNorm(color)
            )}
          />
        </div>
      </div>
      {content || null}
    </div>
  );
}
