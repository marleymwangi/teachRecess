import { useRouter } from "next/router";
//custom
import useChatroomFetch from "../../helpers/hooks/chatroom/chatroom";
import usePersonFetch from "../../helpers/hooks/person";
import ImageLoader from "./imageLoader";

export default function Contact({ data, handleClose }) {
  const router = useRouter();

  const { person } = usePersonFetch(data?.guardian?.id);
  const { createChatroom } = useChatroomFetch();

  const handleClick = () => {
    if (data?.guardian) {
      createChatroom(data?.guardian).then((res) => {
        handleClose();
        router.push(`chats/chat?id=${res}`);
      })
    }
  };

  return (
    <div onClick={handleClick} className="flex gap-6 rounded-box bg-white border shadow-lg border-dashed p-6">
      <div className="avatar online">
      <div className="w-16 rounded-full ring ring-cyan-400 ring-offset-base-100 ring-offset-2">
          {person?.image?.length > 0 ? (
            <ImageLoader
              src={person?.image}
              fallbackSrc="/assets/person.webp"
            />
          ) : (
            <div className="relative bg-primary w-full h-full">
              <p className="abs-center text-white">
                {person?.name?.slice(0, 1)}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="grid place-content-center">
        <p className="font-poppins text-cyan-700 capitalize font-semibold">
          {data?.guardian?.name}
        </p>
        <p className="text-sm text-cyan-500 font-medium">
          <span className="text-gray-400 font-normal">Parent to </span>
          {data?.students.length > 0 && data.students.map((s) => `${s} `)}
        </p>
      </div>
    </div>
  );
}
