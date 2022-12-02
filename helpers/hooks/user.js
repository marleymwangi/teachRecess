import { useEffect, useState } from "react";
import {
  doc,
  query,
  where,
  limit,
  addDoc,
  setDoc,
  orderBy,
  collection,
  onSnapshot,
  serverTimestamp,
} from "@firebase/firestore";
import { db } from "../../firebase";
import { useSession } from "next-auth/react";
import { isEqual } from "lodash";
//custom
import { isEmpty } from "../utility";

const useUserFetch = () => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const [userPending, setUserPending] = useState(true);
  const [notsPending, setNotsPending] = useState(true);

  const [userError, setUserError] = useState(null);
  const [notsError, setNotsError] = useState(null);

  useEffect(() => {
    try {
      if (status === "authenticated" && !isEmpty(session)) {
        let docRef = doc(db, "teachers", session.user.id);

        return onSnapshot(
          docRef,
          (doc) => {
            if (!doc.exists()) {
              throw "Teacher wasnt found in the database";
            } else {
              let usr = parseSession(session);
              delete usr.id;

              let data = doc.data();
              let updated = { ...data, ...usr };

              if (!isEqual(user, updated)) {
                setUser(updated);
                setUserPending(false);
              }

              if (!isEqual(data, updated)) {
                setUserDataDb(updated).then((res) =>
                  console.log("User Updated")
                );
              }
            }
          },
          (error) => {
            console.warn("User Hook: getUserDataFromDb useEffect: ", error);
          }
        );
      }
    } catch (error) {
      console.warn(
        "User Hook: getUserDataFromDb useEffect: ",
        JSON.stringify(error)
      );
      setUserError(error);
      setUserPending(false);
    }
  }, [session, session?.user?.id]);

  useEffect(() => {
    try {
      if (!isEmpty(session) && session?.user?.id.length > 0) {
        let queryRef = query(
          collection(db, "teachers", session.user.id, "notifications"),
          orderBy("timestamp", "desc")
        );

        return onSnapshot(
          queryRef,
          (snapshot) => {
            let tmp = [];
            snapshot.forEach((doc) => {
              let timestm = doc.data().timestamp.toDate();
              let not = {
                id: doc.id,
                ...doc.data(),
                timestamp: timestm,
              };

              tmp.push(not);
            });

            setNotifications(tmp);
            setNotsPending(false);
          },
          (error) => {
            console.warn("User Hook: getUserDataFromDb useEffect: ", error);
          }
        );
      }
    } catch (error) {
      console.warn("User Hook: getUserNotifications: ", error);
      setNotsError(error);
      setNotsPending(false);
    }
  }, [session, session?.user?.id]);

  function parseSession(session) {
    if (!isEmpty(session)) {
      let obj = {};
      obj.id = session.user.id;
      obj.email = session.user.email;
      obj.emailVerified = session.user.emailVerified;
      return obj;
    }
  }

  function setUserDataDb(updateObj) {
    return new Promise((resolve, reject) => {
      try {
        if (isEmpty(session?.user?.id)) {
          reject({ message: "Missing user Id" });
        } else {
          let docRef = doc(db, "teachers", session.user.id);
          updateObj.date_updated = serverTimestamp();

          setDoc(docRef, updateObj, { merge: true }).then((res) =>
            resolve("done")
          );
        }
      } catch (error) {
        console.warn("User Hook: setUserDataDb:");
        console.error(error);
        reject(error);
      }
    });
  }

  function updateNotId(obj) {
    if (isEmpty(obj)) {
      reject({ message: "No data to update" });
    } else if (isEmpty(session?.user?.id)) {
      return;
    } else if (user?.notId === obj.notId) {
      return;
    } else {
      return setUserDataDb(obj);
    }
  }

  return {
    user,
    notifications,
    notsPending,
    userPending,
    notsError,
    userError,
    userPending,
    updateNotId,
  };
};

export default useUserFetch;
