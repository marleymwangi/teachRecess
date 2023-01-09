import Router from "next/router";
import dynamic from "next/dynamic";
//context
import { useData } from "../../context/dataContext";
//custom
import ImageLoader from "../elements/imageLoader";
import { classNames } from "../../helpers/utility";
//dynamic
const FaRegCheckCircle = dynamic(
  async () => (await import("react-icons/fa")).FaRegCheckCircle
);
const FaCheckCircle = dynamic(
  async () => (await import("react-icons/fa")).FaCheckCircle
);

export default function StudentSelector({ data, handleSelect, selected }) {
  const handleClick = (e) => {
    handleSelect(data);
  };
  return (
    <div
      onClick={handleClick}
      className="w-full rounded-box bg-white shadow-lg"
    >
      <div className="flex items-center justify-between gap-6 py-4 px-6">
        <div className="avatar">
          <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <ImageLoader src={data?.image} objectPosition="top" />
          </div>
        </div>
        <div className="grid font-poppins">
          <p className="font-medium">{data?.name}</p>
          <p className="text-xs text-gray-500">Class: {data?.class?.name}</p>
        </div>
        <div>
          <label
            className={classNames(
              "swap swap-rotate text-6xl",
              selected ? "text-primary" : "text-gray-300",
              selected && "swap-active"
            )}
          >
            <FaCheckCircle className="swap-on" size="1.25rem" />
            <FaRegCheckCircle className="swap-off" size="1.25rem" />
          </label>
        </div>
      </div>
    </div>
  );
}
