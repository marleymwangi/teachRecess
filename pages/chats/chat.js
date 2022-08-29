import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
//custom packs
import {
  doc,
  getDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  getDocs,
} from "firebase/firestore";
import localforage from "localforage";
import { getSession, useSession } from "next-auth/react";
//custom
import { useData } from "../../context/dataContext";
import { formatDistanceToNow } from "date-fns";
import { db } from "../../firebase";
import { classNames } from "../../context/vars";
//dynamic
const AiOutlineSend = dynamic(
  async () => (await import("react-icons/ai")).AiOutlineSend
);

export default function Chat() {
  const router = useRouter();
  const { id } = router.query;
  const { sendMessage, setSelChatPart } = useData();
  const { data: session, status } = useSession();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (status !== "loading" && id) {
      const q = query(
        collection(db, "chatrooms", id, "messages"),
        orderBy("timestamp", "asc")
      );

      return onSnapshot(q, (snapshot) => {
        let tmp = [];
        snapshot.forEach((doc) => {
          tmp.push({
            ...doc.data(),
            timestamp: doc.data()?.timestamp?.toDate(),
          });
        });
        let convKey = "chatLocal-" + id;
        localforage.setItem(convKey, JSON.stringify(tmp), function (err) {
          // if err is non-null, we got an error
        });
        setMessages(tmp);
      });
    }
  }, [status, session, id]);

  useEffect(() => {
    if (session?.user?.id) {
      const chatDoc = doc(db, `chatrooms/${id}`);

      return onSnapshot(chatDoc, (doc) => {
        let parts = doc.data().participants;
        const part = parts.find((p) => p !== `${session?.user?.id}`);

        if (part) {
          getParticipant(part);
        }
      });
    }
  }, [session]);

  useEffect(() => {
    let convKey = "chatLocal-" + id;
    localforage.getItem(convKey, function (err, value) {
      // if err is non-null, we got an error. otherwise, value is the value
      if (value) {
        let tmp = JSON.parse(value);
        tmp.forEach((t) => {
          t.timestamp = new Date(t.timestamp);
        });
        console.log("local");
        setMessages(tmp || []);
      }
    });
  }, []);

  const getParticipant = async (part) => {
    if (part) {
      const docRef = doc(db, "users", `${part}`);

      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          setSelChatPart(docSnap.data());
        }
      });
    }
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleClick = () => {
    if (text.length > 0 && id) {
      sendMessage(id, text)
        .then((res) => {
          setText("");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="chat__page">
      <div className="background">
        <section className="messages custom-scroll">
          {messages?.length > 0 &&
            messages.map((m, i) => (
              <MessageBox
                key={i}
                m={m}
                id={session?.user?.id}
              />
            ))}
        </section>
        <section className="w-full flex items-center custom-scroll">
          <textarea
            type="text"
            value={text}
            placeholder="Type here"
            onChange={handleChange}
            className="textarea input-bordered textarea-primary focus:bg-white w-full caret-primary no-scroll"
          />
          <button
            onClick={handleClick}
            className="btn btn-primary btn-circle ml-2"
          >
            <AiOutlineSend size="2em" />
          </button>
        </section>
      </div>
    </div>
  );
}

function MessageBox({ i, m, id }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    if (m.timestamp) {
      setTime(
        formatDistanceToNow(m.timestamp, {
          addSuffix: false,
        })
      );
    }
  }, [m.timestamp]);

  return (
    <div
      key={i}
      className={classNames(
        "content",
        m.senderId === id ? "right" : "left"
      )}
    >
      <div className="message">
        <p>{m.message}</p>
        <span>{time}</span>
      </div>
    </div>
  );
}
