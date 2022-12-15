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
import { isEqual, isEmpty } from "lodash";
//custom
import { useAuth } from "../../context/authContext";

const useUserFetch = () => {
  const { user: session, status } = useAuth();
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [portfolios, setPortfolios] = useState([]);

  const [userPending, setUserPending] = useState(true);
  const [notsPending, setNotsPending] = useState(true);
  const [portsPending, setPortsPending] = useState(true);

  const [userError, setUserError] = useState(null);
  const [notsError, setNotsError] = useState(null);
  const [portsError, setPortsError] = useState(null);

  useEffect(() => {
    try {
      if (status === "authenticated" && !isEmpty(session)) {
        let docRef = doc(db, "teachers", session.id);

        return onSnapshot(
          docRef,
          (doc) => {
            if (!doc.exists()) {
              throw "Teacher wasnt found in the database";
            } else {
              let data = doc.data();
              let updated = { ...data, ...session };

              setUser(updated);
              setUserPending(false);

              if (!isEqual(data, updated)) {
                setUserDataDb(updated).then((res) =>
                  console.log("User Updated")
                );
              }
            }
          },
          (error) => {
            console.info("User Hook: getUserDataFromDb useEffect: ", error);
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
  }, [session, session?.id]);

  useEffect(() => {
    try {
      if (
        !isEmpty(user) &&
        user?.class_id?.length > 0 &&
        user?.school_id?.length > 0
      ) {
        let queryRef = query(
          collection(db, "eportfolio"),
          where("class_id", "==", user.class_id),
          where("school_id", "==", user.school_id),
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
            
            console.log(tmp)
            setPortfolios(tmp);
            setPortsPending(false);
          },
          (error) => {
            console.warn("User Hook: getAllPortfolios useEffect: ", error);
          }
        );
      }
    } catch (error) {
      console.warn("User Hook getAllPortfolios: ", error);
      setPortsError(error);
      setPortsPending(false);
    }
  }, [user, user?.class_id, user?.school_id]);

  useEffect(() => {
    try {
      if (!isEmpty(session) && session?.id.length > 0) {
        let queryRef = query(
          collection(db, "teachers", session.id, "notifications"),
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
  }, [session, session?.id]);

  function setUserDataDb(updateObj) {
    return new Promise((resolve, reject) => {
      try {
        if (isEmpty(session?.id)) {
          reject({ message: "Missing user Id" });
        } else {
          let docRef = doc(db, "teachers", session.id);
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
    } else if (isEmpty(session?.id)) {
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
    portfolios,
    notsPending,
    userPending,
    portsPending,
    notsError,
    userError,
    portsError,
    updateNotId,
  };
};

export default useUserFetch;
