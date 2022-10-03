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
import { resolve } from "styled-jsx/css";

const useScanFetch = (id) => {
  const [person, setPerson] = useState({});
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      //getStudent();
    } catch (error) {
      console.log("Person Hook: getDataFromDb useEffect: ", error);
      setError(error);
      setPending(false);
    }
  }, []);

  function getStudent(studObj) {
    console.log("studObj", studObj);
    return new Promise((resolve, reject) => {
      try {
        let docRef = doc(db, "students", studObj.id);
        getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
            let student = docSnap.data();
            console.log(student);
              
            if (student.tagId === studObj.tagId) {
              setStudentData(studObj.id).then((res) => {
                resolve(res);
                console.log("Set Complete");
              });
            } else {
              throw "Mismatched Tag ID";
            }
          } else {
            throw "Student not found;";
          }
        });
      } catch (error) {
        console.log("Person Hook: getStudent useEffect: ", error);
        reject({ message: error });
      }
    });
  }

  function setStudentData(id) {
    console.log("setting", id);
    return new Promise((resolve, reject) => {
      try {
        let docRef = doc(db, "students", id);

        setDoc(docRef, { status: "bus" }, { merge: true }).then((res) =>
          resolve("status set")
        );
      } catch (error) {
        console.log("Person Hook: setStudentData useEffect: ", error);
        reject(error);
      }
    });
  }

  return {
    person,
    pending,
    error,
    getStudent,
  };
};

export default useScanFetch;
