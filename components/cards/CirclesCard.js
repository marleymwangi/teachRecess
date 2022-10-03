import { classNames } from "../../helpers/utility";

export default function CirclesCard({ color, content }) {
  const getColorNorm = () => {
    switch (color) {
      case "fuchsia":
        return "bg-fuchsia-500";
      case "orange":
        return "bg-orange-500";
      case "pink":
        return "bg-pink-500";
      default:
        return "bg-fuchsia-500";
    }
  };

  const getColorLight = () => {
    switch (color) {
      case "fuchsia":
        return "bg-fuchsia-400";
      case "orange":
        return "bg-orange-400";
        case "pink":
          return "bg-pink-400";
      default:
        return "bg-fuchsia-400";
    }
  };

  const getColorDark = () => {
    switch (color) {
      case "fuchsia":
        return "bg-fuchsia-700";
      case "orange":
        return "bg-orange-700";
        case "pink":
          return "bg-pink-700";
      default:
        return "bg-fuchsia-700";
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
