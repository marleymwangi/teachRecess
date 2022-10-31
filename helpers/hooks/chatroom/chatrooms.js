import { useEffect, useState } from "react";
import {
  doc,
  limit,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  collection,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "@firebase/firestore";
import { db } from "../../../firebase";
import { useSession } from "next-auth/react";
//custom
import { isEmpty } from "../../utility";

const useChatroomsFetch = () => {
  const { data: session } = useSession();

  const [chatrooms, setChatrooms] = useState([]);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      if (!isEmpty(session) && session?.user?.id.length > 0) {
        let queryRef = query(
          collection(db, "chatrooms"),
          where("participants", "array-contains", session.user.id),
          orderBy("timestamp", "asc")
        );

        return onSnapshot(queryRef, (snapshot) => {
          let tmp = [];
          snapshot.forEach((doc) => {
            let timestm = doc.data().timestamp.toDate();
            let chtroom = {
              id: doc.id,
              timestamp: timestm,
              ...doc.data(),
            };
            tmp.push(chtroom);
          });

          setChatrooms(tmp);
          setPending(false);
        });
      }
    } catch (error) {
      console.warn(
        "Chatroooms Hook: getChatroomsDataFromDb useEffect: ",
        JSON.stringify(error)
      );
      setError(error);
      setPending(false);
    }
  }, [session, session?.user?.id]);

  const getChatroomById = (id) => {
    let found =
      chatrooms?.length > 0 && chatrooms.find((room) => room.id == id);
    return found;
  };

  return {
    chatrooms,
    pending,
    error,

    getChatroomById,
  };
};

export default useChatroomsFetch;
