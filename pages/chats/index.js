import dynamic from "next/dynamic";
import { motion } from "framer-motion";
//hooks
import useChatroomsFetch from "../../helpers/hooks/chatroom/chatrooms";
//custom
import ChatRoom from "../../components/chats/chatroom";
import { AuthGuard } from "../../components/elements/authGuard";
//dynamic
const SiGooglemessages = dynamic(async () => (await import("react-icons/si")).SiGooglemessages);

export default function Chats() {
  const { chatrooms, pending, error } = useChatroomsFetch();

  return (
    <AuthGuard>
      <main className="min-h-[95vh] py-20">
        <section className="grid gap-4 px-4">
          {!pending &&
            error === null &&
            chatrooms.length > 0 &&
            chatrooms.map((room) => <ChatRoom room={room} key={room.id} />)}
          {pending && <ChatRoom room={{}} />}
        </section>
        <motion.label
          initial="hide"
          animate="rest"
          whileTap="tap"
          variants={buttonAnim}
          htmlFor="contact_modal"
          className="absolute w-16 h-16 rounded-full bg-primary bottom-20 right-3 grid place-content-center text-primary-content z-50"
        >
          <SiGooglemessages size="1.5em" />
        </motion.label>
      </main>
    </AuthGuard>
  );
}

const spring = {
  type: "spring",
  stiffness: 500,
  damping: 30,
};

const buttonAnim = {
  hide: {
    scale: 0,
    opacity: 0,
    transition: spring,
  },
  rest: {
    scale: 1,
    opacity: 1,
    transition: spring,
  },
  tap: {
    scale: 0.9,
    transition: spring,
  },
};
