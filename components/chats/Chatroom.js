import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
//custom
import { classNames } from "../../helpers/utility";
import ImageLoader from "../elements/imageLoader";
import { useData } from "../../context/dataContext";
import useChatroomFetch from "../../helpers/hooks/chatroom/chatroom";

export default function Chatroom({ room }) {
  const { setSelChatroom, setSelChatPart } = useData();
  const { chatroom, participant, partPending, time } = useChatroomFetch(
    room.id
  );

  const handleClick = () => {
    setSelChatPart(participant);
    setSelChatroom(room);
  };

  return (
    <Link href={`chats/chat?id=${room.id}`}>
      <motion.div
        variants={contAnim}
        onClick={handleClick}
        className={classNames(
          "flex items-center rounded-box p-4 shadow-lg",
          false ? "bg-gray-100" : "bg-white"
        )}
      >
        <div className="avatar mr-2">
          <div className="w-16 rounded-full ">
            {participant?.image?.length > 0 ? (
              <ImageLoader
                src={participant?.image}
                fallbackSrc="/assets/person.webp"
              />
            ) : (
              <div
                className={classNames(
                  "relative w-full h-full",
                  partPending ? "bg-gray-100" : "bg-primary"
                )}
              >
                <p className="abs-center text-white">
                  {participant?.name?.slice(0, 1)}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="grid gap-2 !w-full">
          <div className="flex justify-between">
            <>
              {!participant?.name && (
                <span className="bg-gray-400 bg-opacity-30 animate-pulse rounded w-20 h-5"></span>
              )}
              <p className="font-poppins capitalize text-sm font-medium mr-1">
                {participant?.name}
              </p>
            </>
            <>
              <span className="text-xs">{time}</span>
              {!time.length > 1 && (
                <span className="bg-gray-400 bg-opacity-30 animate-pulse rounded w-10 h-5"></span>
              )}
            </>
          </div>
          <div className="flex">
            <p className="text-xs font-roboto flex-1 text-gray-500 mr-1">
              {chatroom?.lastMessage || "Select to start chatting"}
            </p>
            {chatroom?.unread > 0 && (
              <span className="w-6 h-6 font-bold bg-primary text-primary-content text-center text-xs rounded-full p-1">
                {chatroom?.unread}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

const spring = {
  type: "spring",
  stiffness: 500,
  damping: 30,
};

const contAnim = {
  hide: {
    scale: 0.9,
    opacity: 0,
    transition: spring,
  },
  rest: {
    scale: 1,
    opacity: 1,
    transition: spring,
  },
};
