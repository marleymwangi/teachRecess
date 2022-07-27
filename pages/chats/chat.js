import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
//custom packs
import { getSession, useSession } from "next-auth/react";
//custom
import { useData } from "../../context/dataContext";
import { formatDistanceToNow } from "date-fns";
import { db } from "../../firebase";
import {
  doc,
  getDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  getDocs,
} from "firebase/firestore";
//dynamic
const AiOutlineSend = dynamic(
  async () => (await import("react-icons/ai")).AiOutlineSend
);

export default function Chat({ messagesInit, guardInit }) {
  const router = useRouter();
  const { id } = router.query;
  const { sendMessage, setSelChatPart } = useData();
  const { data: session, status } = useSession();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (status !== "loading") {
      const q = query(
        collection(db, `chatrooms/${id}/messages`),
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
        setMessages(tmp);
      });
    }
  }, [status, session, id]);

  useEffect(() => {
    let tmp = JSON.parse(messagesInit);

    tmp.forEach((d) => {
      d.timestamp = new Date(d.timestamp);
    });
    setMessages(tmp);
  }, [messagesInit]);

  useEffect(() => {
    let tmp = JSON.parse(guardInit);
    setSelChatPart(tmp);
  }, [guardInit, setSelChatPart]);

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
                messLength={messages?.length}
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

function MessageBox({ i, m, id, messLength }) {
  const [time, setTime] = useState("");
  const cluster = (i) => {
    if (i > 0 && i < messLength - 1) {
      if (messages[i].sender === id && messages[i - 1].sender === id) {
        return true;
      }
    }
    return false;
  };

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
      className={`
        content 
        ${m.sender === id ? "right" : "left"}
        ${cluster(i) && "cluster"}
        ${i === messLength - 1 && messLength != 1 && "last"}
      `}
    >
      <div className="message">
        <p>{m.message}</p>
        <span>{time}</span>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  try {
    const session = await getSession(context);
    const id = context.query.id;

    const docRef = doc(db, "chatrooms", id || "");
    const docSnap = await getDoc(docRef);

    const getGuardian = (id) => {
      return new Promise(async (resolve, reject) => {
        try {
          const docRef = doc(db, "users", id || "");
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            let obj = docSnap.data();
            resolve(obj);
          }
        } catch (error) {
          reject(error);
        }
      });
    };

    let guardTmp = {};
    if (docSnap.exists()) {
      let participants = docSnap.data().participants;
      let listTmp = participants.filter(
        (item) => item !== `${session?.user?.id}`
      );
      if (listTmp.length > 0) {
        guardTmp = await getGuardian(listTmp[0]);
      }
    }

    const q = query(
      collection(db, `chatrooms/${id}/messages`),
      orderBy("timestamp", "asc")
    );
    const querySnapshot = await getDocs(q);
    let tmp = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      tmp.push({ ...doc.data(), timestamp: doc.data()?.timestamp?.toDate() });
    });

    return {
      props: {
        messagesInit: JSON.stringify(tmp),
        guardInit: JSON.stringify(guardTmp),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        messagesInit: JSON.stringify([]),
        guardInit: JSON.stringify({}),
      },
    };
  }
};
