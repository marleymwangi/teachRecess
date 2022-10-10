import { useState, useEffect, createContext, useContext } from "react";
//custom packs
import { useSession } from "next-auth/react";
import { db, storage } from "../firebase";
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
import localforage from "localforage";
import OneSignal from "react-onesignal";
import { ref, getDownloadURL, uploadString } from "@firebase/storage";
import { isEmpty, makeid } from "../helpers/utility";

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
  const [alerts, setAlerts] = useState([]);

  const [selStudent, setSelStudent] = useState(null);
  const [selChatroom, setSelChatroom] = useState(null);
  const [selHomework, setSelHomework] = useState(null);
  const [selDiary, setSelDiary] = useState(null);
  const [selReminder, setSelReminder] = useState(null);
  const [selChatPart, setSelChatPart] = useState(null);

  //data creation mode
  const [selDiaryMode, setSelDiaryMode] = useState("add");
  const [selHomeworkMode, setSelHomeworkMode] = useState("add");
  const [selReminderMode, setSelReminderMode] = useState("add");

  //Enable Push Notifications
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    var initConfig = {
      appId: "9f2a49c9-748d-4aed-82d2-f00b4fe40305",
      //safari_web_id: "web.onesignal.auto.5605e6f7-59fb-4441-98e8-3424d278ba78",
      notifyButton: {
        enable: true,
        theme: "inverse",
        position: "bottom-right" /* Either 'bottom-left' or 'bottom-right' */,
        offset: {
          bottom: "0px",
          left: "0px" /* Only applied if bottom-left */,
          right: "0px" /* Only applied if bottom-right */,
        },
      },
      promptOptions: {
        slidedown: {
          promptOptions: {
            slidedown: {
              prompts: [
                {
                  type: "push", // current types are "push" & "category"
                  autoPrompt: true,
                  text: {
                    /* limited to 90 characters */
                    actionMessage:
                      "Permission to send notifications for Reminders, Homework and Chat.",
                    /* acceptButton limited to 15 characters */
                    acceptButton: "Allow",
                    /* cancelButton limited to 15 characters */
                    cancelButton: "Cancel",
                  },
                  delay: {
                    pageViews: 1,
                    timeDelay: 20,
                  },
                },
              ],
            },
          },
        },
      },
      allowLocalhostAsSecureOrigin: true,
      serviceWorkerParam: { scope: "/onesignal/" },
      serviceWorkerPath: "onesignal/OneSignalSDKWorker.js",
      serviceWorkerUpdaterPath: "onesignal/OneSignalSDKUpdaterWorker.js",
    };

    OneSignal.init(initConfig).then(() => {
      console.log("initialized");
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

  const SetAlert = (alrt) => {
    console.log("add", alrt);
    alrt.id = makeid(10);
    let tmp = alerts.length > 0 ? [...alerts, alrt] : [alrt];
    setAlerts(tmp);
  };

  const RemoveAlerts = () => {
    console.log("cleared");
    setAlerts([]);
  };

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

  async function uploadChildPicture(selectedFile) {
    return new Promise(async (resolve, reject) => {
      try {
        if (status !== "unauthenticated") {
          // 1) Create a post and add to firestore 'user id' collection
          // 2) get the post ID for the newly created post
          // 3) upload the image to firebase storage with the user id
          // 4) get a down load URL from fb storage and update th

          const imageRef = ref(
            storage,
            "students" + "/" + selStudent?.id + "/image"
          );

          await uploadString(imageRef, selectedFile, "data_url").then(
            async (snapshot) => {
              const downloadURL = await getDownloadURL(imageRef);

              await updateDoc(doc(db, `students/${selStudent?.id}`), {
                image: downloadURL,
              });
            }
          );

          resolve({ status: 200 });
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  return {
    alerts,
    SetAlert,
    RemoveAlerts,

    selChatroom,
    setSelChatroom,

    selChatPart,
    setSelChatPart,

    selStudent,
    setSelStudent,

    selHomework,
    setSelHomework,
    selHomeworkMode,
    setSelHomeworkMode,

    selDiary,
    setSelDiary,
    selDiaryMode,
    setSelDiaryMode,

    selReminder,
    setSelReminder,
    selReminderMode,
    setSelReminderMode,
  };
}
