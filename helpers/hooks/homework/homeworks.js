import { useEffect, useState } from "react";
import {
  query,
  collection,
  onSnapshot,
} from "@firebase/firestore";
import {
  format,
  isToday,
  isAfter,
  isTomorrow,
  isSameYear,
  isSameMonth,
  isYesterday,
  formatDistanceToNow,
} from "date-fns";
import { db } from "../../../firebase";
import { useData } from "../../../context/dataContext";
import { isEmpty } from "../../utility";
//custom

const useHomeworksFetch = () => {
  const { selStudent } = useData();

  const [homeworks, setHomeworks] = useState([]);
  const [homepending, setHomePending] = useState(true);
  const [homeError, setHomeError] = useState(null);

  useEffect(() => {
    try {
      if (!isEmpty(selStudent) && selStudent?.id?.length > 0) {
        let queryRef = query(
          collection(db, "students", selStudent.id, "diaries")
        );

        return onSnapshot(queryRef, (snapshot) => {
          let tmp = [];
          snapshot.forEach((doc) => {
            let timestm = doc.data().timestamp.toDate();
            let timedue = doc.data().due.toDate();
            let complete = doc.data().complete || false;
            let overdue = !complete && isAfter(new Date(), timedue);
            let hmework = {
              id: doc.id,
              ...doc.data(),
              timestamp: timestm,
              due: timedue,
              overdue,
              complete,
            };

            tmp.push(hmework);
          });

          setHomeworks(tmp);
          setHomePending(false);
        });
      } else {
        if (isEmpty(selStudent)) {
          throw "No selected student";
        } else if (selStudent?.id?.length < 1) {
          throw "Invalid selected student id";
        }
      }
    } catch (error) {
      console.log("Homeworks Hook: getSelStudentsDiaries useEffect: ", error);
      setHomeError(error);
      setHomePending(false);
    }
  }, [selStudent]);

  return {
    homeworks,
    homepending,
    homeError,
  };
};

export default useHomeworksFetch;
