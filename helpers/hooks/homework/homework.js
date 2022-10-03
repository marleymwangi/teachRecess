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
//custom
import { isEmpty } from "../../utility";
import { useData } from "../../../context/dataContext";

const useHomeworkFetch = (schId, clsId, id) => {
  const { selDiary } = useData();

  const [homework, setHomework] = useState([]);
  const [homepending, setHomePending] = useState(true);
  const [homeError, setHomeError] = useState(null);
  const [time, setTime] = useState(null);

  useEffect(() => {
    try {
      if (schId?.length > 0 && clsId?.length > 0) {
        let docRef = doc(db, "schools", schId, "classes", clsId, "diaries", id);

        return onSnapshot(docRef, (doc) => {
          if (doc.exists()) {
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
            getTimeFormatted(timestm, timedue);

            setHomework(hmework);
            setHomePending(false);
          }
        });
      } else {
        if (schId?.length < 1) {
          throw "Invalid selected school id";
        } else if (clsId?.length < 1) {
          throw "Invalid selected class id";
        }
      }
    } catch (error) {
      console.log("Homework Hook: getHomework useEffect: ", error);
      setHomeError(error);
      setHomePending(false);
    }
  }, [schId, clsId]);

  async function getStudentDiary(student, id) {
    return new Promise(async (resolve, reject) => {
      try {
        if (student < 1) {
          throw "Invalid student id";
        } else if (id < 1) {
          throw "Invalid diary id";
        } else {
          let docRef = doc(db, "students", student, "diaries", id);

          getDoc(docRef).then((docSnap) => {
            if (docSnap.exists()) {
              let timestm = docSnap.data().timestamp.toDate();
              let timedue = docSnap.data().due.toDate();
              let complete = docSnap.data().complete || false;
              let overdue = !complete && isAfter(new Date(), timedue);
              let data = {
                id: docSnap.id,
                ...docSnap.data(),
                timestamp: timestm,
                due: timedue,
                overdue,
                complete,
              };
              resolve(data);
            } else {
              reject("Not found");
            }
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  const getTimeFormatted = (stmp, due) => {
    if (!(stmp instanceof Date)) {
      throw "invalid timestamp isnt a date";
    } else if (!(due instanceof Date)) {
      throw "invalid due isnt a date";
    } else {
      let issuedtoday = isToday(stmp);
      let duetoday = isToday(due);
      let issuedYesterDay = isYesterday(stmp);
      let dueTomorrow = isTomorrow(due);
      let issuedyear = isSameYear(new Date(), stmp);
      let dueyear = isSameYear(new Date(), due);
      let issuedmonth = isSameMonth(new Date(), stmp);
      let duemonth = isSameMonth(new Date(), due);
      let tmp = {
        issued: "",
        left: "",
        due: "",
      };

      if (isAfter(new Date(), due)) {
        tmp.left = "Past Due";
      } else if (duetoday) {
        tmp.left = "Few Hours";
      } else {
        tmp.left = formatDistanceToNow(stmp);
      }

      if (!issuedyear) {
        tmp.issued = format(stmp, "do MMM yyyy");
      } else {
        if (!issuedmonth) {
          tmp.issued = format(stmp, "do MMM");
        } else {
          if (issuedtoday) tmp.issued = "Today";
          if (issuedYesterDay) tmp.issued = "Yesterday";
          tmp.issued = format(stmp, "io iii");
        }
      }

      if (!dueyear) {
        tmp.due = format(due, "do MMM yyyy");
      } else {
        if (!duemonth) {
          tmp.due = format(due, "do MMM");
        } else {
          if (duetoday) tmp.due = "Today";
          if (dueTomorrow) tmp.due = "Tomorrow";
          tmp.due = format(due, "io iii");
        }
      }

      return tmp;
    }
  };

  return {
    homework,
    homepending,
    homeError,
    time,
    getStudentDiary,
    getTimeFormatted,
  };
};

export default useHomeworkFetch;
