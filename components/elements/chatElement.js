import { useRouter } from "next/router";
import { useState, useEffect } from "react";
//custom package
import { motion } from "framer-motion";
import { formatDistance } from "date-fns";
//custom
import { useSession } from "next-auth/react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import ImageLoader from "./imageLoader";

const riseVar = {
  hide: {
    opacity: 0,
    y: -  10,
    scale: 0.9,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.15,
    },
  },
};

export default function ChatElement({ data }) {
  const router = useRouter();
  const [part, setPart] = useState(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (data?.participants && status !== "loading") {
      //get item from participants if not user id
      const part = data.participants.find((p) => p !== `${session?.user?.id}`);

      if (part) {
        const docRef = doc(db, "users", `${part}`);

        getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
            setPart(docSnap.data());
          }
        });
      }
    }
  }, [data, session, status]);

  const handleClick = () => {
    router.push(`chats/chat?id=${data.id}`);
  };

  return (
    <motion.div variants={riseVar} className="chat" onClick={handleClick}>
      <div className="avatar">
        <div className="w-16 rounded-full shadow-md">
          <ImageLoader src={part?.image} fallbackSrc="/assets/person.webp" />
        </div>
      </div>
      <div className="content">
        <span className="capitalize font-medium">{part?.name}</span>
        <p className="text-gray-400 text-sm  ">{data?.lastMessage}</p>
      </div>
      <span>
        {data?.timestamp &&
          formatDistance(new Date(), new Date(data?.timestamp))}
      </span>
    </motion.div>
  );
}
