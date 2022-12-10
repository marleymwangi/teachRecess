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
import {
  format,
  isSameYear,
  isSameMonth,
  differenceInDays,
  formatDistanceToNow,
} from "date-fns";
import { isEmpty } from "lodash";
import { db } from "../../../firebase";
//custom
import { useAuth } from "../../../context/authContext";

const useChatroomFetch = (id) => {
  const { user: session, status } = useAuth();

  const [chatroom, setChatroom] = useState({});
  const [participant, setParticipant] = useState({});
  const [messages, setMessages] = useState([]);

  const [chatpending, setChatPending] = useState(true);
  const [partPending, setPartPending] = useState(true);
  const [messpending, setMessPending] = useState(true);

  const [chatError, setChatError] = useState(null);
  const [partError, setPartError] = useState(null);
  const [messError, setMessError] = useState(null);

  const [time, setTime] = useState("");

  useEffect(() => {
    try {
      if (id?.length > 0) {
        let docRef = doc(db, "chatrooms", id);

        return onSnapshot(
          docRef,
          (doc) => {
            if (doc.exists()) {
              let time = doc.data().timestamp.toDate();
              let chtroom = { id: doc.id, ...doc.data(), timestamp: time };
              setChatroom(chtroom);
              setChatPending(false);
            }
          },
          (error) => {
            console.info("Chatroom Hook: getChatroomData useEffect: ", error);
          }
        );
      } else {
        throw "Invalid selected chatroom id";
      }
    } catch (error) {
      console.info("Chatroom Hook: getChatroomData useEffect: ", error);
      setChatError(error);
      setChatPending(false);
    }
  }, [id]);

  useEffect(() => {
    try {
      if (status === "authenticated") {
        if (id?.length > 0 && session?.id?.length > 0) {
          let queryRef = query(
            collection(db, "chatrooms", id, "messages"),
            orderBy("timestamp", "asc")
          );

          return onSnapshot(queryRef, (snapshot) => {
            let tmp = [];
            snapshot.forEach(
              (doc) => {
                let timestm = doc.data().timestamp.toDate();
                let type =
                  doc.data()?.sender === session.id ? "mine" : "other";
                let mess = {
                  type,
                  id: doc.id,
                  timestamp: timestm,
                  ...doc.data(),
                };

                tmp.push(mess);
              },
              (error) => {
                console.info("Chatroom Hook: getMessages useEffect: ", error);
              }
            );

            setMessages(tmp);
            setMessPending(false);
          });
        } else {
          if (id?.length < 1) {
            throw "Missing chatroom Id";
          } else if (session?.id?.length < 1) {
            throw "Missing chatroom user";
          }
        }
      }
    } catch (error) {
      console.info("Chatroom Hook: getMessages useEffect: ", error);
      setMessError(error);
      setMessPending(false);
    }
  }, [id, session, status]);

  useEffect(() => {
    try {
      if (chatroom?.participants?.length > 0) {
        let parts = chatroom.participants.filter(
          (part) => part !== session.id
        );

        let docRef = doc(db, "guardians", parts[0]);

        return onSnapshot(
          docRef,
          (doc) => {
            if (doc.exists()) {
              let person = { id: doc.id, ...doc.data() };
              setParticipant(person);
              setPartPending(false);
            }
          },
          (error) => {
            console.info(
              "Chatroom Hook: getChatroomParticipant useEffect: ",
              error
            );
          }
        );
      } else {
        throw "No chatroom participants";
      }
    } catch (error) {
      console.info("Chatroom Hook: getChatroomParticipant useEffect: ", error);
      setPartError(error);
      setPartPending(false);
    }
  }, [chatroom?.participants]);

  useEffect(() => {
    if (chatroom?.timestamp instanceof Date) {
      let diff = differenceInDays(new Date(), chatroom.timestamp);
      let year = isSameYear(new Date(), chatroom.timestamp);
      let month = isSameMonth(new Date(), chatroom.timestamp);
      let tmp;

      if (!year) {
        tmp = format(chatroom.timestamp, "do MMM yyyy");
      } else {
        if (!month) {
          tmp = format(chatroom.timestamp, "do MMM");
        } else {
          if (diff > 3) {
            tmp = format(chatroom.timestamp, "io iii");
          } else {
            tmp = formatDistanceToNow(chatroom.timestamp);
          }
        }
      }

      setTime(tmp);
    }
  }, [chatroom?.timestamp]);

  function createRoom(resolve, reject, id, participant) {
    try {
      let obj = {
        participants: [id, participant],
        searchIndex: [id + participant, participant + id],
        timestamp: new Date(),
      };
      console.log(obj);
      addDoc(collection(db, "chatrooms"), obj).then((docRef) => {
        resolve(docRef.id);
      });
    } catch (error) {
      reject(error);
    }
  }

  function createChatroom(participant) {
    return new Promise((resolve, reject) => {
      try {
        if (session?.id.length < 1) {
          throw "Invalid user id";
        } else if (participant?.length < 1) {
          throw "Invalid chat Participant";
        } else {
          const q = query(
            collection(db, "chatrooms"),
            where(
              "searchIndex",
              "array-contains",
              session.id + participant.id
            ),
            orderBy("timestamp", "asc"),
            limit(1)
          );

          getDocs(q).then((snapshot) => {
            if (snapshot.empty) {
              createRoom(resolve, reject, session.id, participant);
            } else {
              snapshot.forEach((doc) => {
                // doc is never undefined for query doc snapshots
                if (doc.exists) {
                  resolve(doc.id);
                }
              });
            }
          });
        }
      } catch (error) {
        console.warn("Student Class: createChatroom:");
        console.error(error);
        reject(error);
      }
    });
  }

  function sendMessagetoParticipant(text) {
    return new Promise((resolve, reject) => {
      try {
        if (id.length < 1) {
          throw "Missing chatroom Id";
        } else if (session.id.length < 1) {
          throw "Missing user";
        } else {
          addDoc(collection(db, "chatrooms", id, "messages"), {
            message: text,
            sender: session.id,
            timestamp: new Date(),
          }).then((res) => {
            resolve(res);
          });
        }
      } catch (error) {
        console.log("Chatroom Class: sendMessagetoParticipant: ", error);
        reject({ message: error });
      }
    });
  }

  function sendDiaryMessagetoParticipant(id, text, diary) {
    return new Promise((resolve, reject) => {
      try {
        if (isEmpty(diary)) {
          throw "Nothing in diary object";
        } else if (id?.length < 1) {
          throw "Invalid charoom Id";
        } else if (text?.length < 1) {
          throw "Empty text";
        } else if (session?.id?.length < 1) {
          throw "Missing user";
        } else {
          console.log("diary", diary);
          console.log("text", text);
          addDoc(collection(db, "chatrooms", id, "messages"), {
            message: text,
            sender: session.id,
            timestamp: new Date(),
            attachment: {
              type: "diary",
              diary,
            },
          }).then((res) => {
            resolve(id);
          });
        }
      } catch (error) {
        console.log("Chatroom Class: sendDiaryMessagetoParticipant: ", error);
        reject({ message: error });
      }
    });
  }

  function markMessageRead(id, mesId) {
    return new Promise((resolve, reject) => {
      try {
        if (id?.length < 1) {
          throw "Invalid charoom Id";
        } else if (mesId?.length < 1) {
          throw "Invalid message Id";
        } else if (session?.id?.length < 1) {
          throw "Missing user";
        } else {
          let docRef = doc(db, "chatrooms", id, "messages", mesId);
          setDoc(docRef, { read: true }, { merge: true }).then((res) =>
            resolve("done")
          );
        }
      } catch (error) {
        console.log("Chatroom Class: sendDiaryMessagetoParticipant: ", error);
        reject({ message: error });
      }
    });
  }

  return {
    chatroom,
    participant,
    messages,

    chatpending,
    partPending,
    messpending,

    messError,
    chatError,
    partError,
    time,

    createChatroom,
    markMessageRead,
    sendMessagetoParticipant,
    sendDiaryMessagetoParticipant,
  };
};

export default useChatroomFetch;
