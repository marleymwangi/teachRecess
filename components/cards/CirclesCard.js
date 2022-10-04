import { classNames } from "../../helpers/utility";

export default function CirclesCard({ color, content }) {
  const getColorNorm = () => {
    switch (color) {
      case "emerald":
        return "bg-emerald-200";
      case "teal":
        return "bg-teal-200";
      case "cyan":
        return "bg-cyan-200";
      default:
        return "bg-emma-200";
    }
  };

  const getColorLight = () => {
    switch (color) {
      case "emerald":
        return "bg-emerald-300";
      case "teal":
        return "bg-teal-300";
        case "cyan":
          return "bg-cyan-300";
      default:
        return "bg-emma-300";
    }
  };

  const getColorDark = () => {
    switch (color) {
      case "emerald":
        return "bg-emerald-500";
      case "teal":
        return "bg-teal-500";
        case "cyan":
          return "bg-cyan-500";
      default:
        return "bg-emma-500";
    }
  };

  return (
    <div
      className={classNames(
        "relative rounded-box min-h-[150px] w-full overflow-hidden",
        getColorNorm(color)
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
