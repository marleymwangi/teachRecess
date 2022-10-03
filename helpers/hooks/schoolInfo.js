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

const useSchoolInfoFetch = (schId, clsId) => {
  const [school, setSchool] = useState({});
  const [schoolPending, setSchoolPending] = useState(true);
  const [schoolError, setSchoolError] = useState(null);

  const [classroom, setClassroom] = useState({});
  const [classPending, setClassPending] = useState(true);
  const [classError, setClassError] = useState(null);

  const [teacher, setTeacher] = useState({});
  const [teachPending, setTeachPending] = useState(true);
  const [teachError, setTeachError] = useState(null);

  useEffect(() => {
    try {
      if (isEmpty(schId) && isEmpty(clsId)) {
        throw "Missing school or class Id";
      } else {
        let classDocRef = doc(db, "schools", schId, "classes", clsId);

        return onSnapshot(classDocRef, (doc) => {
          if (doc.exists()) {
            let clsroom = { id: doc.id, ...doc.data() };
            setClassroom(clsroom);
            setClassPending(false);
          }
        });
      }
    } catch (error) {
      console.log("SchoolInfo Hook: getClass useEffect: ", error);
      setClassError(error);
      setClassPending(false);
    }
  }, [schId, clsId]);

  useEffect(() => {
    try {
      if (isEmpty(schId) && isEmpty(clsId)) {
        throw "Missing school or class Id";
      } else {
        const q = query(
          collection(db, `teachers`),
          where("schoolId", "==", schId),
          where("classId", "==", clsId),
          limit(1)
        );
        return onSnapshot(q, (snapshot) => {
          snapshot.forEach((doc) => {
            let teach = { id: doc.id, ...doc.data() };
            setTeacher(teach);
            setTeachPending(false);
          });
        });
      }
    } catch (error) {
      console.log("SchoolInfo Hook: getTeacher useEffect: ", error);
      setTeachError(error);
      setTeachPending(false);
    }
  }, [schId, clsId]);

  useEffect(() => {
    try {
      if (isEmpty(schId)) {
        throw "Missing school or class Id";
      } else {
        let schoolDocRef = doc(db, "schools", schId);

        return onSnapshot(schoolDocRef, (doc) => {
          if (doc.exists()) {
            let sch = { id: doc.id, ...doc.data() };
            setSchool(sch);
            setSchoolPending(false);
          }
        });
      }
    } catch (error) {
      console.log("SchoolInfo Hook: getSchool useEffect: ", error);
      setSchoolError(error);
      setSchoolPending(false);
    }
  }, [schId]);

  return {
    school,
    classroom,
    teacher,
    schoolPending,
    classPending,
    teachPending,
    schoolError,
    classError,
    teachError,
  };
};

export default useSchoolInfoFetch;
