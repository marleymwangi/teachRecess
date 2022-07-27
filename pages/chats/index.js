import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
//custom packages
import {
  collection,
  onSnapshot,
  orderBy,
  where,
  query,
  getDocs,
} from "firebase/firestore";
//custom
import { db } from "../../firebase";
import Title from "../../components/elements/title";
import { AuthGuard } from "../../components/elements/authGuard";
import ChatElement from "../../components/elements/chatElement";

const BiMessageAltAdd = dynamic(
  async () => (await import("react-icons/bi")).BiMessageAltAdd
);

export default function Chat({ chatsInit }) {
  const { data: session, status } = useSession();
  const [chats, setChats] = useState(chatsInit ? JSON.parse(chatsInit) : []);

  useEffect(() => {
    if (status !== "loading") {
      const q = query(
        collection(db, "chatrooms"),
        where("participants", "array-contains", `${session?.user?.id}`),
        orderBy("timestamp", "asc")
      );

      return onSnapshot(q, (snapshot) => {
        let tmp = [];
        snapshot.forEach((doc) => {
          tmp.push({
            ...doc.data(),
            id: doc.id,
            timestamp: doc.data()?.timestamp?.toDate(),
          });
        });
        setChats(tmp);
      });
    }
  }, [session, status]);

  return (
    <AuthGuard>
      <div className="chats__page">
        <section className="chats__sec">
          <div className="flex items-center justify-center mb-6">
            <Title title="Recent Chats" light />
          </div>
          <div className="chats__list">
            {chats?.length > 0 ? (
              chats.map((c, i) => <ChatElement key={i} data={c} />)
            ) : (
              <div className="mt-10 backdrop-blur text-center">
                <p className="text-gray-100 font-medium">
                  Click on the plus sign below to add begin chatting
                </p>
              </div>
            )}
          </div>
        </section>
        <label
          htmlFor="contacts_modal"
          className=" modal-button btn btn-circle btn-primary btn-md fixed right-5 bottom-28"
        >
          <BiMessageAltAdd size="2rem" />
        </label>
      </div>
    </AuthGuard>
  );
}

export const getServerSideProps = async (context) => {
  try {
    const session = await getSession(context);

    const q = query(
      collection(db, "chatrooms"),
      where("participants", "array-contains", `${session?.user?.id}`),
      orderBy("timestamp", "asc")
    );

    const querySnapshot = await getDocs(q);
    let tmp = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      tmp.push({
        ...doc.data(),
        id: doc.id,
        timestamp: doc.data()?.timestamp?.toDate(),
      });
    });

    return {
      props: { chatsInit: JSON.stringify(tmp) },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
};
