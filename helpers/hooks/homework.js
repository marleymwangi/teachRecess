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
import { db } from "../../firebase";
//custom
import { useData } from "../../context/dataContext";

const useHomeworkFetch = (schId, clsId, id) => {
  const { selHomework } = useData();

  const [homework, setHomework] = useState(selHomework);
  const [homepending, setHomePending] = useState(true);
  const [homeError, setHomeError] = useState(null);

  useEffect(() => {
    try {
      if (schId?.length > 0 && clsId?.length > 0 && id?.length > 0) {
        let schClsId = schId + clsId  ;
        let docRef = doc(db, "institutionGroup", schClsId, "homework", id);

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
        } else if (id?.length < 1) {
          throw "Missing homework id";
        }
      }
    } catch (error) {
      console.log("Homework Hook: getHomework useEffect: ", error);
      setHomeError(error);
      setHomePending(false);
    }
  }, [schId, clsId, id]);

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
    getTimeFormatted,
  };
};

export default useHomeworkFetch;
