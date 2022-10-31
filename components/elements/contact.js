import { useRouter } from "next/router";
//custom
import useChatroomFetch from "../../helpers/hooks/chatroom/chatroom";
import usePersonFetch from "../../helpers/hooks/person";
import useSchoolInfoFetch from "../../helpers/hooks/schoolInfo";
import ImageLoader from "../elements/imageLoader";

export default function Contact({ data, handleClose }) {
  const router = useRouter();

  const { teacher } = useSchoolInfoFetch(
    data?.info?.schoolId,
    data?.info?.classId
  );
  const { person } = usePersonFetch(data?.guardian);
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
        <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <ImageLoader src={person?.image} />
        </div>
      </div>
      <div className="grid place-content-center">
        <p className="font-poppins text-cyan-700 capitalize font-semibold">
          {person?.name}
        </p>
        <p className="text-sm text-cyan-500 font-medium">
          <span className="text-gray-400 font-normal">Teacher to </span>
          {data?.students.length > 0 && data.students.map((s) => `${s} `)}
        </p>
      </div>
    </div>
  );
}
