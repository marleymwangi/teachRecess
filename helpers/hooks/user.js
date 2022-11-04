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
} from "@firebase/firestore";
import { db } from "../../firebase";
import { useSession } from "next-auth/react";
//custom
import { isEmpty } from "../utility";

const useUserFetch = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const [userPending, setUserPending] = useState(true);
  const [notsPending, setNotsPending] = useState(true);

  const [userError, setUserError] = useState(null);
  const [notsError, setNotsError] = useState(null);

  useEffect(() => {
    if (!isEmpty(session)) {
      let user = parseSession(session);
      setUser(user);
      setUserPending(false);
    }
  }, [db, session]);

  useEffect(() => {
    try {
      if (!isEmpty(user)) {
        let docRef = doc(db, "users", user.id);

        return onSnapshot(docRef, (doc) => {
          if (!doc.exists()) {
            let user = parseSession(session);
            delete user.id;
            setUserDataDb(user).then((res) => console.log("User Created"));
          } else {
            let user = parseSession(session);
            delete user.id;
            setUserDataDb(user).then((res) => console.log("User Updated"));

            let u = { id: doc.id, ...doc.data() };
            if (u !== user) {
              setUser(u);
              setUserPending(false);
            }
          }
        });
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
          collection(db, "users", session.user.id, "notifications"),
          orderBy("timestamp", "desc")
        );

        return onSnapshot(queryRef, (snapshot) => {
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
        });
      }
    } catch (error) {
      console.log("User Hook: getUserNotifications: ", error);
      setNotsError(error);
      setNotsPending(false);
    }
  }, [session, session?.user?.id]);

  function parseSession(session) {
    if (!isEmpty(session)) {
      let obj = {};
      obj.id = session.user.id;
      obj.name = session.user.name;
      obj.email = session.user.email;
      obj.image = session.user.image;
      return obj;
    }
  }

  function setUserDataDb(updateObj) {
    return new Promise((resolve, reject) => {
      try {
        if (isEmpty(session?.user?.id)) {
          reject({ message: "Missing user Id" });
        } else {
          let docRef = doc(db, "users", session.user.id);

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
