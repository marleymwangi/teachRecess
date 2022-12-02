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
import { db } from "../../firebase";
//custom
import { isEmpty } from "../utility";

const usePersonFetch = (id) => {
  const [person, setPerson] = useState({});
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      if (id?.length > 0) {
        let docRef = doc(db, "guardians", id);

        return onSnapshot(docRef, (doc) => {
          if (doc.exists()) {
            let per = { id: doc.id, ...doc.data() };
            setPerson(per);
            setPending(false);
          }
        });
      }
    } catch (error) {
      console.log("Person Hook: getDataFromDb useEffect: ", error);
      setError(error);
      setPending(false);
    }
  }, [id]);

  return {
    person,
    pending,
    error,
  };
};

export default usePersonFetch;
