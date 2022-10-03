import { useEffect, useState } from "react";
import {
  doc,
  setDoc,
  onSnapshot,
} from "@firebase/firestore";
import { db } from "../../firebase";
import { useSession } from "next-auth/react";
//custom
import { isEmpty } from "../utility";

const useUserFetch = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isEmpty(session)) {
      let user = parseSession(session);
      setUser(user);
      setPending(false);
    }
  }, [db, session]);

  useEffect(() => {
    try {
      if (!isEmpty(user)) {
        let docRef = doc(db, "users", user.id);

        return onSnapshot(docRef, (doc) => {
          if (!doc.exists()) {
            setUserDataDb().then((res) => resolve("done"));
          } else {
            let u = { id: doc.id, ...doc.data() };
            if (u !== user) {
              setUser(u);
              setPending(false);
            }
          }
        });
      }
    } catch (error) {
      console.warn(
        "User Hook: getUserDataFromDb useEffect: ",
        JSON.stringify(error)
      );
      setError(error);
      setPending(false);
    }
  }, [user]);

  const parseSession = (session) => {
    if (!isEmpty(session)) {
      let obj = {};
      obj.id = session.user.id;
      obj.name = session.user.name;
      obj.email = session.user.email;
      obj.image = session.user.image;
      return obj;
    }
  };

  const setUserDataDb = () => {
    return new Promise((resolve, reject) => {
      try {
        if (isEmpty(user.id)) {
          reject({ message: "Missing user Id" });
        } else {
          let docRef = doc(db, "users", user.id);

          let obj = {};
          user.name ? (obj.name = user.name) : null;
          user.email ? (obj.email = user.email) : null;
          user.image ? (obj.image = user.image) : null;
          user.notIds ? (obj.notIds = user.notIds) : null;

          console.log(obj);
          setDoc(docRef, obj, { merge: true }).then((res) => resolve("done"));
        }
      } catch (error) {
        console.warn("User Hook: setUserDataDb:");
        console.error(error);
        reject(error);
      }
    });
  };

  return {
    user,
    pending,
    error,
  };
};

export default useUserFetch;
