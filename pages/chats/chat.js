import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
//hooks
import useChatroomFetch from "../../helpers/hooks/chatroom/chatroom";
//custom
import { isEmpty } from "../../helpers/utility";
import { useData } from "../../context/dataContext";
import Message from "../../components/chats/Message";
import { AuthGuard } from "../../components/elements/authGuard";
import useChatroomsFetch from "../../helpers/hooks/chatroom/chatrooms";
//dynamic
const IoSend = dynamic(async () => (await import("react-icons/io5")).IoSend);

export default function Chat() {
  const router = useRouter();
  const { id } = router.query;

  const { chatrooms, getChatroomById } = useChatroomsFetch();
  const { messages, participant, sendMessagetoParticipant } =
    useChatroomFetch(id);
  const { selChatroom, setSelChatroom, selChatPart, setSelChatPart } =
    useData();

  const [text, setText] = useState("");

  useEffect(() => {
    if (id?.length > 0 && isEmpty(selChatroom)) {
      let room = getChatroomById(id);
      room && setSelChatroom(room);
    }
  }, [id, chatrooms, selChatroom, setSelChatroom]);

  useEffect(() => {
    if (!isEmpty(participant)) {
      setSelChatPart(participant);
    }
  }, [participant, selChatPart, setSelChatPart]);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleClick = () => {
    if (text?.length > 0 && id?.length > 0) {
      sendMessagetoParticipant(text)
        .then((res) => {
          setText("");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <AuthGuard>
      <main className="relative bg-gray-100 w-full h-full pt-20 pb-10">
        <section className="w-full px-4 my-2 chat-height  overflow-y-scroll custom-scroll">
          {messages?.length > 0 && (
            <motion.section
              variants={contAnim}
              initial="hide"
              animate="rest"
              className="flex flex-col justify-end gap-2 pb-4"
            >
              {messages.map((mess) => (
                <Message key={mess.id} data={mess} />
              ))}
            </motion.section>
          )}
        </section>
        <section className="w-full px-4 pb-4">
          <div className="rounded-full bg-white p-2 flex justify-between shadow-lg">
            <textarea
              onChange={handleChange}
              value={text}
              type="text"
              placeholder="Type here"
              className="input pt-2 resize-none rounded-full input-outline w-full flex-1"
            />
            <button
              onClick={handleClick}
              className="btn btn-primary text-white btn-circle ml-2"
            >
              <IoSend size="1.5em" />
            </button>
          </div>
        </section>
      </main>
    </AuthGuard>
  );
}

const contAnim = {
  rest: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
};
