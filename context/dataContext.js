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
import localforage from "localforage";
import OneSignal from "react-onesignal";
import { isEmpty } from "./vars";

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
  const [schoolData, setSchoolData] = useState({});
  const [classData, setClassData] = useState({});
  const [students, setStudents] = useState([]);

  const [selChatPart, setSelChatPart] = useState(null);

  const [selDiary, setSelDiary] = useState(null);
  const [selReminder, setSelReminder] = useState(true);

  const [selDiaryMode, setSelDiaryMode] = useState("add");
  const [selRemindersMode, setSelRemindersMode] = useState("add");

  //Enable Push Notifications
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    var initConfig = {
      appId: "136b91e7-1654-46d6-ab05-0d2b2e034e8d",
      safari_web_id: "web.onesignal.auto.110555e6-7aae-4d44-9896-bfe7a2b1c987",
      notifyButton: {
        enable: false,
        theme: "inverse",
        position: "bottom-right" /* Either 'bottom-left' or 'bottom-right' */,
        offset: {
          bottom: "0px",
          left: "0px" /* Only applied if bottom-left */,
          right: "0px" /* Only applied if bottom-right */,
        },
      },
      allowLocalhostAsSecureOrigin: true,
      serviceWorkerParam: { scope: "/onesignal/" },
      serviceWorkerPath: "onesignal/OneSignalSDKWorker.js",
      serviceWorkerUpdaterPath: "onesignal/OneSignalSDKUpdaterWorker.js",
    };

    OneSignal.init(initConfig).then(() => {
      setInitialized(true);
      OneSignal.showSlidedownPrompt().then(() => {
        // do other stuff
      });
    });
  }, []);

  useEffect(() => {
    if (initialized && session?.user?.id) {
      GetNotificationId();
    }
  }, [initialized, session]);

  useEffect(() => {
    createUser();
    getTeacherInfo();
  }, [db, session, status]);
  
  useEffect(() => {
    if(teacher){
      getSchoolInfo(teacher);
      getClassInfo(teacher);

      if (teacher?.schoolId && teacher?.classId) {
        getStudents(teacher)
          .then((res) => {
            let tmp = [];
  
            res.forEach((stud) => {
              tmp.push(stud);
            });
            setStudents(tmp);
          })
          .catch((error) => console.log(error));
      }
    }
  }, [teacher]);

  async function GetNotificationId() {
    OneSignal.getUserId().then(function (userId) {
      if (!isEmpty(userId) && session?.user?.id) {
        let docRef = doc(db, "users", session.user.id);

        return onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            let user = docSnap.data();
            let nots = user?.notIds || [];

            nots.push(userId);
            let uniq = [...new Set(nots)];

            updateDoc(docRef, {
              notIds: uniq,
            });
          }
        });
      }
    });
  }

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

  async function getSchoolInfo(teacher) {
    if (teacher?.schoolId) {
      const docRef = doc(db, "schools", teacher.schoolId);

      return onSnapshot(docRef, (doc) => {
        setSchoolData(doc.data());
      });
    }
  }

  async function getClassInfo(teacher) {
    if (teacher?.schoolId && teacher?.classId) {
      const docRef = doc(db, "schools", teacher.schoolId, "classes", teacher.classId);

      return onSnapshot(docRef, (doc) => {
        setClassData(doc.data());
      });
    }
  }

  async function getStudents(teacher) {
    return new Promise((resolve, reject) => {
      try {
        const q = query(
          collection(db, `students`),
          where("schoolId", "==", `${teacher.schoolId || ""}`),
          where("classId", "==", `${teacher.classId || ""}`),
          orderBy("name", "desc")
        );
        return onSnapshot(q, (snapshot) => {
          const tmp = [];
          snapshot.forEach((doc) => {
            tmp.push({ ...doc.data(), id: doc.id });
          });

          resolve(tmp);
        });
      } catch (error) {
        console.warn(error);
        reject(error);
      }
    });
  }

  async function createRoom(resolve, reject, participant) {
    try {
      if (session?.user?.id && participant) {
        const docRef = await addDoc(collection(db, `chatrooms`), {
          participants: [session.user.id, participant],
          searchIndex: [
            session.user.id + participant,
            participant + session.user.id,
          ],
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
          where("searchIndex", "array-contains", session.user.id + participant),
          orderBy("timestamp", "asc"),
          limit(1)
        );

        return onSnapshot(q, (querySnapshot) => {
          if (querySnapshot.empty) {
            createRoom(resolve, reject, participant);
          } else {
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              if (doc.exists) {
                resolve(doc.id);
              }
            });
          }
        });
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

  async function removeDiaryInfo(data) {
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
            data?.id
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

  async function removeReminderInfo(data) {
    return new Promise(async (resolve, reject) => {
      try {
        if (teacher && data) {
          let docRef;
          if (data?.scope === "School") {
            docRef = doc(
              db,
              "schools",
              teacher?.schoolId,
              "reminders",
              data?.id
            );
          } else if (data?.scope === "Class") {
            docRef = doc(
              db,
              "schools",
              teacher?.schoolId,
              "classes",
              teacher?.classId,
              "reminders",
              data?.id
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
    students,
    classData,
    schoolData,

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
