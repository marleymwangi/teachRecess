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

const useCalendarFetch = (schId, clsId, currentWeek, selectedDay) => {
  const [homeworksT, setHomeworksT] = useState([]);
  const [homeworksD, setHomeworksD] = useState([]);
  const [homeworks, setHomeworks] = useState([]);
  const [schReminders, setSchReminders] = useState([]);
  const [clsReminders, setClsReminders] = useState([]);
  const [diaries, setDiaries] = useState([]);

  const [homeworksPending, setHomeworksPending] = useState(true);
  const [schRemindersPending, setSchRemindersPending] = useState(true);
  const [clsRemindersPending, setClsRemindersPending] = useState(true);
  const [diariesPending, setDiariesPending] = useState(true);

  const [homeworksError, setHomeworksError] = useState(null);
  const [schRemindersError, setSchRemindersError] = useState(null);
  const [clsRemindersError, setClsRemindersError] = useState(null);
  const [diariesError, setDiariesError] = useState(null);

  let start = startOfWeek(currentWeek, { weekStartsOn: 1 });
  let end = endOfWeek(currentWeek, {
    weekStartsOn: 1,
  });

  useEffect(() => {
    //merge homeworks
    const result = homeworksT.reduce((acc, curr) => {
      const { id } = curr;

      const findObj = acc.find((h) => h.id === id);
      if (!findObj) {
        acc.push(curr);
      }

      return acc;
    }, []);

    setHomeworks(result);
  }, [homeworksD, homeworksT]);

  useEffect(() => {
    try {
      if (
        schId?.length > 0 &&
        clsId?.length > 0 &&
        start instanceof Date &&
        end instanceof Date
      ) {
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

          setHomeworksT(tmp);
        });
      } else {
        if (schId?.length < 1) {
          throw "Missing school Id";
        } else if (clsId?.length < 1) {
          throw "missing class Id";
        }
      }
    } catch (error) {
      console.log("Calendar Hook: getHomeworksTimestampFromDb useEffect: ", error);
      setHomeworksError(error);
    }
  }, [schId, clsId, currentWeek]);

  useEffect(() => {
    try {
      if (
        schId?.length > 0 &&
        clsId?.length > 0 &&
        start instanceof Date &&
        end instanceof Date
      ) {
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
          where("due", ">=", start),
          where("due", "<=", end),
          orderBy("due", "desc")
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

          setHomeworksD(tmp);
        });
      } else {
        if (schId?.length < 1) {
          throw "Missing school Id";
        } else if (clsId?.length < 1) {
          throw "missing class Id";
        }
      }
    } catch (error) {
      console.log("Calendar Hook: getHomeworksDueFromDb useEffect: ", error);
      setHomeworksError(error);
    }
  }, [schId, clsId, currentWeek]);

  useEffect(() => {
    try {
      if (schId?.length > 0 && start instanceof Date && end instanceof Date) {
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
      if (
        schId?.length > 0 &&
        clsId?.length > 0 &&
        start instanceof Date &&
        end instanceof Date
      ) {
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

  useEffect(() => {
    try {
      if (
        schId?.length > 0 &&
        clsId?.length > 0 &&
        start instanceof Date &&
        end instanceof Date
      ) {
        let diaryRef = collection(
          db,
          "schools",
          schId,
          "classes",
          clsId,
          "diaries"
        );

        let queryRef = query(
          diaryRef,
          where("timestamp", ">=", start),
          where("timestamp", "<=", end),
          orderBy("timestamp", "desc")
        );

        return onSnapshot(queryRef, (snapshot) => {
          let tmp = [];
          snapshot.forEach((doc) => {
            let timestm = doc.data().timestamp.toDate();
            let dia = {
              id: doc.id,
              ...doc.data(),
              timestamp: timestm,
            };

            tmp.push(dia);
          });

          setDiaries(tmp);
          setDiariesPending(false);
        });
      } else {
        if (schId?.length < 1) {
          throw "Missing school Id";
        } else if (clsId?.length < 1) {
          throw "missing class Id";
        }
      }
    } catch (error) {
      console.log("Calendar Hook: getDiaryFromDb useEffect: ", error);
      setDiariesError(error);
      setDiariesPending(false);
    }
  }, [schId, currentWeek]);

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
    diaries,
    homeworks,
    schReminders,
    clsReminders,

    diariesPending,
    homeworksPending,
    schRemindersPending,
    clsRemindersPending,

    diariesError,
    homeworksError,
    schRemindersError,
    clsRemindersError,

    getTimeFormatted,
  };
};

export default useCalendarFetch;
