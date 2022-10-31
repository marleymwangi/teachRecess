import { useEffect, useState } from "react";
import {
  doc,
  query,
  where,
  limit,
  addDoc,
  setDoc,
  updateDoc,
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
import { db, storage } from "../../../firebase";
import { ref, getDownloadURL, uploadString } from "@firebase/storage";
//custom
import { isEmpty } from "../../utility";
import { useData } from "../../../context/dataContext";

const useStudentFetch = () => {
  const { selStudent } = useData();

  const [student, setStudent] = useState(selStudent || {});
  const [person, setPerson] = useState({});
  const [portfolio, setPortfolio] = useState([]);
  const [diaries, setDiaries] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [school, setSchool] = useState({});
  const [classroom, setClassroom] = useState({});
  const [teacher, setTeacher] = useState({});

  const [portPending, setPortPending] = useState(true);
  const [studPending, setStudPending] = useState(true);
  const [diariesPending, setDiariesPending] = useState(true);
  const [remindersPending, setRemindersPending] = useState(true);
  const [classPending, setClassPending] = useState(true);
  const [schoolPending, setSchoolPending] = useState(true);
  const [teachPending, setTeachPending] = useState(true);

  const [portError, setPortError] = useState(null);
  const [studError, setStudError] = useState(null);
  const [diariesError, setDiariesError] = useState(null);
  const [remindersError, setRemindersError] = useState(null);
  const [teachError, setTeachError] = useState(null);
  const [schoolError, setSchoolError] = useState(null);
  const [classError, setClassError] = useState(null);

  useEffect(() => {
    try {
      if (!isEmpty(selStudent) && selStudent?.id?.length > 0) {
        let docRef = doc(db, "students", selStudent.id);

        return onSnapshot(docRef, (doc) => {
          if (doc.exists()) {
            let stud = { id: doc.id, ...doc.data() };
            stud.image = student?.image
              ? student.image
              : student.gender === "female"
              ? "/images/girl.png"
              : "/images/boy.png";
            setStudent(stud);
            setStudPending(false);
          }
        });
      } else {
        if (isEmpty(selStudent)) {
          throw "No selected student";
        } else if (selStudent?.id?.length < 1) {
          throw "Invalid selected student id";
        }
      }
    } catch (error) {
      console.log("Student Hook: getDataFromDb useEffect: ", error);
      setStudError(error);
      setStudPending(false);
    }
  }, [selStudent]);

  useEffect(() => {
    try {
      if (!isEmpty(selStudent) && selStudent?.id?.length > 0) {
        let queryRef = query(
          collection(db, "students", selStudent.id, "eportfolio")
        );

        return onSnapshot(queryRef, (snapshot) => {
          let tmp = [];
          snapshot.forEach((doc) => {
            let timestm = doc.data().timestamp.toDate();
            let port = {
              id: doc.id,
              ...doc.data(),
              timestamp: timestm,
            };

            tmp.push(port);
          });

          setPortfolio(tmp);
          setPortPending(false);
        });
      } else {
        if (isEmpty(selStudent)) {
          throw "No selected student";
        } else if (selStudent?.id?.length < 1) {
          throw "Invalid selected student id";
        }
      }
    } catch (error) {
      console.log("Student Hook: getPortfolio useEffect: ", error);
      setPortError(error);
      setPortPending(false);
    }
  }, [selStudent]);

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
            let diary = {
              id: doc.id,
              ...doc.data(),
              timestamp: timestm,
              due: timedue,
              overdue,
              complete,
            };

            tmp.push(diary);
          });

          setDiaries(tmp);
          setDiariesPending(false);
        });
      } else {
        if (isEmpty(selStudent)) {
          throw "No selected student";
        } else if (selStudent?.id?.length < 1) {
          throw "Invalid selected student id";
        }
      }
    } catch (error) {
      console.log("Student Hook: getDiaries useEffect: ", error);
      setDiariesError(error);
      setDiariesPending(false);
    }
  }, [selStudent]);

  useEffect(() => {
    try {
      if (!isEmpty(selStudent) && selStudent?.id?.length > 0) {
        let queryRef = query(
          collection(db, "students", selStudent.id, "reminders")
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

          setReminders(tmp);
          setRemindersPending(false);
        });
      } else {
        if (isEmpty(selStudent)) {
          throw "No selected student";
        } else if (selStudent?.id?.length < 1) {
          throw "Invalid selected student id";
        }
      }
    } catch (error) {
      console.log("Student Hook: getReminders useEffect: ", error);
      setRemindersError(error);
      setRemindersPending(false);
    }
  }, [selStudent]);

  useEffect(() => {
    try {
      if (!isEmpty(student) && student?.schoolId?.length > 0) {
        let docRef = doc(db, "schools", student.schoolId);

        return onSnapshot(docRef, (doc) => {
          if (doc.exists()) {
            let sch = { id: doc.id, ...doc.data() };
            setSchool(sch);
            setSchoolPending(false);
          }
        });
      } else {
        if (isEmpty(student)) {
          throw "No selected student";
        } else if (student?.schoolId?.length < 1) {
          throw "Invalid selected student id";
        }
      }
    } catch (error) {
      console.log("Student Hook: getSchoolFromDb useEffect: ", error);
      setSchoolError(error);
      setSchoolPending(false);
    }
  }, [student]);

  useEffect(() => {
    try {
      if (
        !isEmpty(student) &&
        student?.schoolId?.length > 0 &&
        student?.classId?.length > 0
      ) {
        let docRef = doc(
          db,
          "schools",
          student.schoolId,
          "classes",
          student.classId
        );

        return onSnapshot(docRef, (doc) => {
          if (doc.exists()) {
            let cls = { id: doc.id, ...doc.data() };
            setClassroom(cls);
            setClassPending(false);
          }
        });
      } else {
        if (isEmpty(student)) {
          throw "No selected student";
        } else if (student?.schoolId?.length < 1) {
          throw "Invalid selected student id";
        } else if (student?.classId?.length < 1) {
          throw "Invalid selected student id";
        }
      }
    } catch (error) {
      console.log("Student Hook: getSchoolFromDb useEffect: ", error);
      setClassError(error);
      setClassPending(false);
    }
  }, [student]);

  useEffect(() => {
    try {
      if (
        !isEmpty(student) &&
        student?.schoolId?.length > 0 &&
        student?.classId?.length > 0
      ) {
        const q = query(
          collection(db, `teachers`),
          where("schoolId", "==", student.schoolId),
          where("classId", "==", student.classId),
          limit(1)
        );
        return onSnapshot(q, (snapshot) => {
          snapshot.forEach((doc) => {
            let teach = { id: doc.id, ...doc.data() };
            setPerson(teach);
            setTeachPending(false);
          });
        });
      } else {
        if (isEmpty(student)) {
          throw "No selected student";
        } else if (student?.schoolId?.length < 1) {
          throw "Invalid selected student id";
        } else if (student?.classId?.length < 1) {
          throw "Invalid selected student id";
        }
      }
    } catch (error) {
      console.log("SchoolInfo Hook: getTeacher useEffect: ", error);
      setTeachError(error);
      setTeachPending(false);
    }
  }, [student]);

  useEffect(() => {
    try {
      if (person?.id?.length > 0) {
        let docRef = doc(db, "users", person.id);

        return onSnapshot(docRef, (doc) => {
          if (doc.exists()) {
            let per = { id: doc.id, ...doc.data() };
            setTeacher(per);
            setTeachPending(false);
          }
        });
      }
    } catch (error) {
      console.log("Person Hook: getDataFromDb useEffect: ", error);
      setTeachError(error);
      setTeachPending(false);
    }
  }, [person]);

  function uploadPortfolioPicture(selectedFile, caption) {
    return new Promise(async (resolve, reject) => {
      try {
        if (isEmpty(student)) {
          throw "No selected student";
        } else if (student?.id?.length < 1) {
          throw "Invalid selected student id";
        } else if (student?.schoolId?.length < 1) {
          throw "Invalid selected student schoolId";
        } else if (student?.classId?.length < 1) {
          throw "Invalid selected student schoolId";
        } else {
          if (!selectedFile) {
            reject({ message: "Missing upload file" });
          } else {
            // 1) Create a post and add to firestore 'user id' collection
            // 2) get the post ID for the newly created post
            // 3) upload the image to firebase storage with the user id
            // 4) get a down load URL from fb storage and update th

            const collRef = collection(
              db,
              "students",
              student.id,
              "eportfolio"
            );

            addDoc(collRef, {
              caption: caption,
              classId: student.classId,
              schoolId: student.schoolId,
              timestamp: new Date(),
            }).then((docId) => {
              let tmpRef = "students/" + student.id + "/eportfolio/" + docId.id;
              const imageRef = ref(storage, tmpRef);

              uploadString(imageRef, selectedFile, "data_url").then(
                (snapshot) => {
                  let docRef = doc(
                    db,
                    "students",
                    student.id,
                    "eportfolio",
                    docId.id
                  );
                  getDownloadURL(imageRef).then((url) => {
                    updateDoc(docRef, {
                      image: url,
                    }).then((res) => resolve("done"));
                  });
                }
              );
            });
          }
        }
      } catch (error) {
        console.log(
          "SchoolInfo Hook: uploadPortfolioPicture useEffect: ",
          error
        );
        console.error(error);
        reject(error);
      }
    });
  }

  function setDiaryDataDb(diaryId, obj) {
    return new Promise((resolve, reject) => {
      try {
        if (isEmpty(student)) {
          throw "No selected student";
        } else if (isEmpty(student)) {
          throw "No selected student";
        } else if (isEmpty(obj)) {
          throw "Nothing in update object";
        } else if (student?.id?.length < 1) {
          throw "Invalid selected student id";
        } else if (diaryId?.length < 1) {
          throw "Invalid selected student schoolId";
        } else {
          let docRef = doc(db, "students", student?.id, "diaries", diaryId);

          console.log(obj);
          setDoc(docRef, obj, { merge: true }).then((res) => resolve("done"));
        }
      } catch (error) {
        console.log("SchoolInfo Hook: setDiaryDataDb useEffect: ", error);
        console.error(error);
        reject(error);
      }
    });
  }

  function markAsComplete(diaryId) {
    let obj = { complete: true };
    return setDiaryDataDb(diaryId, obj);
  }

  function getTimeFormatted(stmp, due) {
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
  }

  return {
    school,
    classroom,
    teacher,
    diaries,
    portfolio,
    reminders,
    student,

    studPending,
    portPending,
    classPending,
    teachPending,
    schoolPending,
    diariesPending,
    remindersPending,

    portError,
    studError,
    teachError,
    classError,
    schoolError,
    diariesError,
    remindersError,

    markAsComplete,
    getTimeFormatted,
    uploadPortfolioPicture,
  };
};

export default useStudentFetch;
