import { classNames } from "../../helpers/utility";

export default function CirclesCard({ color, content }) {
  const getColorNorm = () => {
    switch (color) {
      case "sky":
        return "bg-sky-200";
      case "orange":
        return "bg-orange-200";
      case "pink":
        return "bg-pink-200";
      default:
        return "bg-yellow-200";
    }
  };

  const getColorLight = () => {
    switch (color) {
      case "sky":
        return "bg-sky-300";
      case "orange":
        return "bg-orange-300";
        case "pink":
          return "bg-pink-300";
      default:
        return "bg-yellow-300";
    }
  };

  const getColorDark = () => {
    switch (color) {
      case "sky":
        return "bg-sky-500";
      case "orange":
        return "bg-orange-500";
        case "pink":
          return "bg-pink-500";
      default:
        return "bg-yellow-500";
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
