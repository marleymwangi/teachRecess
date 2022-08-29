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
import { useData } from "../../context/dataContext";

const riseVar = {
  hide: {
    opacity: 0,
    y: 10,
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
  const { data: session, status } = useSession();

  const { setSelChatPart } = useData();
  const [part, setPart] = useState(null);

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
    if(part){
      setSelChatPart(part);
    };  
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
        <div className="flex items-center justify-between whitespace-nowrap">
          <span className="capitalize font-medium">{part?.name}</span>
          <span className="text-gray-400 text-xs">
            {data?.timestamp &&
              formatDistance(new Date(), new Date(data?.timestamp))}
          </span>
        </div>
        <p className="text-gray-400 text-sm  ">{data?.lastMessage}</p>
      </div>
    </motion.div>
  );
}
