import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  format,
  isSameYear,
  differenceInDays,
  formatDistanceToNow,
} from "date-fns";
import { useInView } from "react-intersection-observer";
//hooks
import useChatroomFetch from "../../helpers/hooks/chatroom/chatroom";
//custom
import { classNames, isEmpty } from "../../helpers/utility";
import CirclesCardHomework from "../cards/CirclesCardHomework";
//dynamic
const BiCheck = dynamic(async () => (await import("react-icons/bi")).BiCheck);
const BiCheckDouble = dynamic(
  async () => (await import("react-icons/bi")).BiCheckDouble
);

export default function Message({ chatId, data }) {
  const [ref, inView] = useInView();
  const [time, setTime] = useState();
  const { markMessageRead } = useChatroomFetch();

  useEffect(() => {
    if (inView && chatId && data?.id && !data?.read && data?.type !== "mine") {
      markMessageRead(chatId, data.id);
    }
  }, [inView, markMessageRead, chatId]);

  function getTimeFormatted(time) {
    if (!(time instanceof Date)) {
      throw "invalid timestamp isnt a date";
    } else {
      let diff = differenceInDays(new Date(), time);
      let year = isSameYear(new Date(), time);
      let tmp;

      if (!year) {
        tmp = format(time, "do MMM yyyy");
      } else {
        if (diff > 3) {
          tmp = format(time, "do MMM");
        } else {
          tmp = formatDistanceToNow(time);
        }
      }

      return tmp;
    }
  }

  useEffect(() => {
    if (data?.timestamp.toDate() instanceof Date) {
      let t = getTimeFormatted(data.timestamp.toDate());
      setTime(t);
    }
  }, [data?.timestamp, data]);

  if (isEmpty(data?.attachment)) {
    return (
      <motion.div
        ref={ref}
        variants={messageAnim}
        className={classNames(
          "chat",
          data?.type === "mine" ? "chat-end" : "chat-start"
        )}
      >
        <div className="chat-header">
          <time className="text-xs opacity-50">{time}</time>
        </div>
        <div className={classNames("chat-bubble",
          data?.type === "mine" ? "chat-bubble-primary" : "chat-bubble-accent"
        )}>{data?.message}</div>
        <div className="chat-footer">
          <div
            className={classNames(
              "swap min-w-[20px] ",
              data?.read === "mine" ? "text-cyan-400" : "text-gray-400",
              data?.read && "swap-active"
            )}
          >
            <BiCheckDouble className="swap-on" size="1.25em" />
            <BiCheck className="swap-off" size="1.25em" />
          </div>
        </div>
      </motion.div>
    );
  } else {
    let diary = data.attachment.diary;
    console.log(diary)
    return (
      <div ref={ref}>
        <CirclesCardHomework data={diary} index={0} comment={data?.message} />
      </div>
    );
  }
}

const spring = {
  type: "spring",
  stiffness: 500,
  damping: 30,
};

const messageAnim = {
  hide: (custom) => ({
    x: custom === "mine" ? -10 : 10,
    opacity: 0,
    transition: spring,
  }),
  rest: {
    x: 0,
    opacity: 1,
    transition: spring,
  },
};
