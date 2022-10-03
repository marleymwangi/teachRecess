import { useEffect, useState } from "react";
import {
  query,
  collection,
  where,
  orderBy,
  onSnapshot,
} from "@firebase/firestore";
import { db } from "../../../firebase";
import { useSession } from "next-auth/react";
//custom
import { isEmpty } from "../../utility";

const useStudentsFetch = () => {
  const { data: session } = useSession();

  const [students, setStudents] = useState([]);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      if (!isEmpty(session) && session?.user?.id.length > 0) {
        let queryRef = query(
          collection(db, "students"),
          where("guardians", "array-contains", session.user.id),
          orderBy("name", "desc")
        );

        return onSnapshot(queryRef, (snapshot) => {
          let tmp = [];
          snapshot.forEach((doc) => {
            let student = { id: doc.id, ...doc.data() };
            student.image = student?.image
              ? student.image
              : student.gender === "female"
              ? "/images/girl.png"
              : "/images/boy.png";
            tmp.push(student);
          });

          setStudents(tmp);
          setPending(false);
        });
      }
    } catch (error) {
      console.warn(
        "Students Hook: getStudents useEffect: ",
        JSON.stringify(error)
      );
      setError(error);
      setPending(false);
    }
  }, [session, session?.user?.id]);

  const getStudentById = (id) => {
    let found = students?.length > 0 && students.find((stud) => stud.id == id);
    return found;
  };

  return {
    students,
    pending,
    error,

    getStudentById,
  };
};

export default useStudentsFetch;
