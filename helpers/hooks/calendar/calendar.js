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
  endOfWeek,
  startOfWeek,
} from "date-fns";
import { db } from "../../../firebase";
//custom

const useCalendarFetch = (schId, clsId, currentWeek) => {
  const [homeworks, setHomeworks] = useState([]);
  const [schReminders, setSchReminders] = useState([]);
  const [clsReminders, setClsReminders] = useState([]);
  const [homeworksPending, setHomeworksPending] = useState(true);
  const [schRemindersPending, setSchRemindersPending] = useState(true);
  const [clsRemindersPending, setClsRemindersPending] = useState(true);
  const [homeworksError, setHomeworksError] = useState(null);
  const [schRemindersError, setSchRemindersError] = useState(null);
  const [clsRemindersError, setClsRemindersError] = useState(null);

  let start = startOfWeek(currentWeek, { weekStartsOn: 1 });
  let end = endOfWeek(currentWeek, {
    weekStartsOn: 1,
  });

  useEffect(() => {
    try {
      if (schId?.length > 0 && clsId?.length > 0) {
        let homeRef = collection(
          db,
          "schools",
          schId,
          "classes",
          clsId,
          "homeworks"
        );

        let queryRef = query(
          homeRef,
          where("timestamp", ">=", start),
          where("timestamp", "<=", end),
          orderBy("timestamp", "desc")
        );

        return onSnapshot(queryRef, (snapshot) => {
          let tmp = [];
          snapshot.forEach((doc) => {
            let timestm = doc.data().timestamp.toDate();
            let timedue = doc.data().due.toDate();
            let hmework = {
              id: doc.id,
              ...doc.data(),
              timestamp: timestm,
              due: timedue,
            };

            tmp.push(hmework);
          });

          setHomeworks(tmp);
          setHomeworksPending(false);
        });
      } else {
        if (schId?.length < 1) {
          throw "Missing school Id";
        } else if (clsId?.length < 1) {
          throw "missing class Id";
        }
      }
    } catch (error) {
      console.log("Calendar Hook: getHomeworksFromDb useEffect: ", error);
      setHomeworksError(error);
      setHomeworksPending(false);
    }
  }, [schId, clsId, currentWeek]);

  useEffect(() => {
    try {
      if (schId?.length > 0) {
        let homeRef = collection(db, "schools", schId, "reminders");

        let queryRef = query(
          homeRef,
          where("timestamp", ">=", start),
          where("timestamp", "<=", end),
          orderBy("timestamp", "desc")
        );

        return onSnapshot(queryRef, (snapshot) => {
          let tmp = [];
          snapshot.forEach((doc) => {
            let timestm = doc.data().timestamp.toDate();
            let rem = {
              id: doc.id,
              ...doc.data(),
              timestamp: timestm,
            };

            tmp.push(rem);
          });

          console.log(start);
          console.log(end);
          setSchReminders(tmp);
          setSchRemindersPending(false);
        });
      } else {
        if (schId?.length < 1) {
          throw "Missing school Id";
        }
      }
    } catch (error) {
      console.log("Calendar Hook: getSchRemindersFromDb useEffect: ", error);
      setSchRemindersError(error);
      setSchRemindersPending(false);
    }
  }, [schId, currentWeek]);

  useEffect(() => {
    try {
      if (schId?.length > 0 && clsId?.length > 0) {
        let homeRef = collection(
          db,
          "schools",
          schId,
          "classes",
          clsId,
          "reminders"
        );

        let queryRef = query(
          homeRef,
          where("timestamp", ">=", start),
          where("timestamp", "<=", end),
          orderBy("timestamp", "desc")
        );

        return onSnapshot(queryRef, (snapshot) => {
          let tmp = [];
          snapshot.forEach((doc) => {
            let timestm = doc.data().timestamp.toDate();
            let rem = {
              id: doc.id,
              ...doc.data(),
              timestamp: timestm,
            };

            tmp.push(rem);
          });

          setClsReminders(tmp);
          setClsRemindersPending(false);
        });
      } else {
        if (schId?.length < 1) {
          throw "Missing school Id";
        } else if (clsId?.length < 1) {
          throw "missing class Id";
        }
      }
    } catch (error) {
      console.log("Calendar Hook: getClsRemindersFromDb useEffect: ", error);
      setClsRemindersError(error);
      setClsRemindersPending(false);
    }
  }, [schId, clsId, currentWeek]);

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
    homeworks,
    schReminders,
    clsReminders,

    homeworksPending,
    schRemindersPending,
    clsRemindersPending,

    homeworksError,
    schRemindersError,
    clsRemindersError,

    getTimeFormatted,
  };
};

export default useCalendarFetch;
