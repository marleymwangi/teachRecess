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
import { isEmpty } from "lodash";
import { db } from "../../../firebase";
//custom
import { useAuth } from "../../../context/authContext";

const useChatroomsFetch = () => {
  const { user: session } = useAuth();

  const [chatrooms, setChatrooms] = useState([]);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      if (!isEmpty(session) && session?.id.length > 0) {
        let queryRef = query(
          collection(db, "chatrooms"),
          where("participants", "array-contains", session.id),
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
        },
        (error) => {
          console.info(
            "Chatroooms Hook: getChatroomsDataFromDb useEffect: ",
            error
          );
        });
      }
    } catch (error) {
      console.info(
        "Chatroooms Hook: getChatroomsDataFromDb useEffect: ",
        JSON.stringify(error)
      );
      setError(error);
      setPending(false);
    }
  }, [session, session?.id]);

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
