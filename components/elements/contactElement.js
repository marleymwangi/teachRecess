import { useRouter } from "next/router";
//custom
import { useData } from "../../context/dataContext";
import { classNames } from "../../context/vars";
import ImageLoader from "./imageLoader";

export default function ContactElement({ data }) {
  const router = useRouter();
  const { createChatRoom } = useData();

  const handleClick = () => {
    createChatRoom(data.id).then((ref) => {
      router.push(`chats/chat?id=${ref}`);
    });
  };

  const ringClr = (color) => {
    console.log;
    switch (color) {
      case "red":
        return "ring-red-500";
      case "purple":
        return "ring-purple-500";
      case "green":
        return "ring-green-500";
      case "sky":
        return "ring-sky-500";
      case "amber":
        return "ring-amber-500";
      default:
        return "ring-primary";
    }
  };

  const textClr = (color) => {
    console.log;
    switch (color) {
      case "red":
        return "!text-red-500";
      case "purple":
        return "!text-purple-500";
      case "green":
        return "!text-green-500";
      case "sky":
        return "!text-sky-500";
      case "amber":
        return "!text-amber-500";
      default:
        return "!text-primary";
    }
  };

  return (
    <label
      htmlFor="contacts_modal"
      className={classNames("teacher", textClr(data?.student?.color))}
      onClick={handleClick}
    >
      <div className="flex">
        <div className="avatar">
          <div className={classNames(ringClr(data?.student?.color))}>
            <ImageLoader src={data?.image} fallbackSrc="/assets/person.webp" />
          </div>
        </div>
        <div className="content">
          <h2>{data.name}</h2>
          <h3>
            {data?.student?.name} {data.subject} Teacher
          </h3>
        </div>
      </div>
    </label>
  );
}
