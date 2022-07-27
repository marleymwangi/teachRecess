import { useState, useEffect, createContext, useContext } from "react";
//custom packs
import { useSession } from "next-auth/react";
import { db } from "../firebase";
import {
  doc,
  addDoc,
  setDoc,
  getDoc,
  deleteDoc,
  getDocs,
  updateDoc,
  query,
  collection,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  limit,
} from "@firebase/firestore";

const dataContext = createContext();

export function ProvideData({ children }) {
  const data = useProvideData();
  return <dataContext.Provider value={data}>{children}</dataContext.Provider>;
}

export const useData = () => {
  return useContext(dataContext);
};

function useProvideData() {
  const { data: session, status } = useSession();
  //shared app data
  const [teacher, setTeacher] = useState({});

  const [selChatPart, setSelChatPart] = useState(null);

  const [selDiary, setSelDiary] = useState(null);
  const [selReminder, setSelReminder] = useState(true);

  const [selDiaryMode, setSelDiaryMode] = useState("add");
  const [selRemindersMode, setSelRemindersMode] = useState("add");

  useEffect(() => {
    createUser();
    getTeacherInfo();
  }, [db, session, status]);

  async function createUser() {
    if (status !== "loading" && session?.user) {
      const docRef = doc(db, "users", session.user.id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        // Add a new document in collection "cities"
        await setDoc(doc(db, "users", session.user.id), {
          name: session.user.name,
          email: session.user.email,
        });
      }
    }
  }

  async function getTeacherInfo() {
    if (status !== "loading" && session?.user?.id) {
      const docRef = doc(db, "teachers", session.user.id);

      return onSnapshot(docRef, (doc) => {
        setTeacher(doc.data());
      });
    }
  }

  async function createRoom(resolve, reject, participant) {
    try {
      if (session?.user) {
        const docRef = await addDoc(collection(db, `chatrooms`), {
          participants: [session?.user?.id, participant],
          timestamp: serverTimestamp(),
        });

        if (docRef) {
          resolve(docRef.id);
        }
      } else {
        reject("Permission denied");
      }
    } catch (error) {
      reject(error);
    }
  }

  async function createChatRoom(participant) {
    return new Promise(async (resolve, reject) => {
      if (session?.user?.id) {
        const q = query(
          collection(db, "chatrooms"),
          where("participants", "array-contains", `${session?.user?.id}`),
          orderBy("timestamp", "asc")
        );

        const querySnapshot = await getDocs(q);

        console.log("doc.data()", querySnapshot.empty);

        if (querySnapshot.empty) {
          createRoom(resolve, reject, participant);
        } else {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            let parts = doc.data().participants;
            let exists = parts.some((part) => part === participant);
            if (exists) {
              resolve(doc.id);
            } else {
              createRoom(resolve, reject, participant);
            }
          });
        }
      }
    });
  }

  async function sendMessage(chatId, text) {
    return new Promise(async (resolve, reject) => {
      try {
        if (session?.user) {
          const docRef = await addDoc(
            collection(db, `chatrooms/${chatId}/messages`),
            {
              sender: session.user?.id,
              message: text,
              timestamp: serverTimestamp(),
            }
          );

          if (docRef) {
            resolve(docRef.id);
          }
        } else {
          reject("Permission denied");
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  async function updateChildInfo(id, info) {
    return new Promise(async (resolve, reject) => {
      try {
        let docRef = doc(db, `students/${id}`);
        updateDoc(docRef, info).then((res) => {
          resolve("success");
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  async function updateDiaryInfo(info) {
    return new Promise(async (resolve, reject) => {
      try {
        if (selDiaryMode === "edit" && selDiary && teacher) {
          let docRef = doc(
            db,
            "schools",
            teacher?.schoolId,
            "classes",
            teacher?.classId,
            "diaries",
            selDiary?.id
          );

          setDoc(docRef, info, { merge: true }).then((res) => {
            resolve("success");
          });
          setSelDiaryMode("add");
        } else {
          let docRef = collection(
            db,
            "schools",
            teacher?.schoolId,
            "classes",
            teacher?.classId,
            "diaries"
          );

          addDoc(docRef, info).then((res) => {
            resolve("success");
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  async function removeDiaryInfo() {
    return new Promise(async (resolve, reject) => {
      try {
        if (teacher) {
          let docRef = doc(
            db,
            "schools",
            teacher?.schoolId,
            "classes",
            teacher?.classId,
            "diaries",
            selDiary?.id
          );

          deleteDoc(docRef).then((res) => {
            resolve("success");
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  async function updateReminderInfo(info) {
    return new Promise(async (resolve, reject) => {
      try {
        if (teacher) {
          if (selRemindersMode === "edit" && selReminder && teacher) {
            let docRef;
            if (info?.scope === "School" || selReminder?.scope === "School") {
              docRef = doc(
                db,
                "schools",
                teacher?.schoolId,
                "reminders",
                selReminder?.id
              );
            } else if (
              info?.scope === "Class" ||
              selReminder?.scope === "Class"
            ) {
              docRef = doc(
                db,
                "schools",
                teacher?.schoolId,
                "classes",
                teacher?.classId,
                "reminders",
                selReminder?.id
              );
            } else {
              throw "Scope required.";
            }

            setDoc(docRef, info, { merge: true }).then((res) => {
              resolve("success");
            });
            setSelRemindersMode("add");
          } else if (selRemindersMode === "add" && selReminder && teacher) {
            let docRef;
            if (info.scope === "School") {
              docRef = collection(
                db,
                "schools",
                teacher?.schoolId,
                "reminders"
              );
            } else if (info.scope === "Class") {
              docRef = collection(
                db,
                "schools",
                teacher?.schoolId,
                "classes",
                teacher?.classId,
                "reminders"
              );
            } else {
              throw "Scope required.";
            }

            addDoc(docRef, info).then((res) => {
              resolve("success");
            });
          } else {
            throw "Selected reminder/ teacher error";
          }
        } else {
          throw "Permision denied.Check teacher account.";
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  async function removeReminderInfo() {
    return new Promise(async (resolve, reject) => {
      try {
        if (teacher && selReminder) {
          let docRef;
          if (selReminder?.scope === "School") {
            docRef = doc(
              db,
              "schools",
              teacher?.schoolId,
              "reminders",
              selReminder?.id
            );
          } else if (selReminder?.scope === "Class") {
            docRef = doc(
              db,
              "schools",
              teacher?.schoolId,
              "classes",
              teacher?.classId,
              "reminders",
              selReminder?.id
            );
          } else {
            throw "Scope required.";
          }

          deleteDoc(docRef).then((res) => {
            resolve("success");
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  return {
    teacher,

    selDiaryMode,
    setSelDiaryMode,

    selRemindersMode,
    setSelRemindersMode,

    selDiary,
    setSelDiary,

    selReminder,
    setSelReminder,

    selChatPart,
    setSelChatPart,

    sendMessage,
    createChatRoom,

    updateDiaryInfo,
    updateReminderInfo,

    removeDiaryInfo,
    removeReminderInfo,

    updateChildInfo,
  };
}
