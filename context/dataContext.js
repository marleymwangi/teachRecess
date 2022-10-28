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
  //shared app data
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
