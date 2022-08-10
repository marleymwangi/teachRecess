import { useRouter } from "next/router";
//custom
import { useData } from "../../context/dataContext";
import ImageLoader from "./imageLoader";

export default function ContactElement({ data }) {
  const router = useRouter();
  const { createChatRoom } = useData();

  const handleClick = () => {
    console.log(data)
    if (data?.guardian?.id) {
      createChatRoom(data.guardian.id).then((ref) => {
        router.push(`chats/chat?id=${ref}`);
      });
    }
  };

  return (
    <label
      htmlFor="contacts_modal"
      className="teacher !text-primary"
      onClick={handleClick}
    >
      <div className="flex">
        <div className="avatar">
          <div className="ring-primary">
            <ImageLoader
              src={data?.image}
              fallbackSrc="/assets/person.webp"
            />
          </div>
        </div>
        <div className="content">
          <h2>{data?.name}</h2>
          <h3>
            <span className="text-gray-400">Parents to </span>
            {data?.students.length > 0 && data.students.map((s, i) => `${s.name} `)}
          </h3>
        </div>
      </div>
    </label>
  );
}
