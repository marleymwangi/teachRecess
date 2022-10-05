import { useEffect, useState } from "react";
import {
  doc,
  limit,
  query,
  where,
  orderBy,
  addDoc,
  setDoc,
  getDoc,
  collection,
  onSnapshot,
} from "@firebase/firestore";
import { isAfter } from "date-fns";
import { db } from "../../firebase";
import { useSession } from "next-auth/react";
//custom
import { isEmpty } from "../utility";
import { useData } from "../../context/dataContext";

const useTeacherFetch = () => {
  const { data: session } = useSession();
  const {
    selDiary,
    selDiaryMode,
    selHomework,
    selReminder,
    selHomeworkMode,
    selReminderMode,
    setSelHomeworkMode,
    setSelRemindersMode,
  } = useData();
  const [teacher, setTeacher] = useState(null);
  const [students, setStudents] = useState([]);
  const [homeworks, setHomeworks] = useState([]);
  const [diaries, setDiaries] = useState([]);
  const [school, setSchool] = useState({});
  const [classroom, setClassroom] = useState({});

  const [teachPending, setTeachPending] = useState(true);
  const [studPending, setStudPending] = useState(true);
  const [homeworksPending, setHomeworksPending] = useState(true);
  const [diariesPending, setDiariesPending] = useState(true);
  const [classPending, setClassPending] = useState(true);
  const [schoolPending, setSchoolPending] = useState(true);

  const [teachError, setTeachError] = useState(null);
  const [studError, setStudError] = useState(null);
  const [homeworksError, setHomeworksError] = useState(null);
  const [diariesError, setDiariesError] = useState(null);
  const [schoolError, setSchoolError] = useState(null);
  const [classError, setClassError] = useState(null);

  useEffect(() => {
    try {
      if (!isEmpty(session) && session?.user?.id) {
        let docRef = doc(db, "teachers", session.user.id);

        return onSnapshot(docRef, (doc) => {
          if (!doc.exists()) {
            setUserDataDb().then((res) => resolve("done"));
          } else {
            let t = { id: doc.id, ...doc.data() };
            setTeacher(t);
            setTeachPending(false);
          }
        });
      }
    } catch (error) {
      console.warn(
        "User Hook: getTeacherDataFromDb useEffect: ",
        JSON.stringify(error)
      );
      setTeachError(error);
      setTeachPending(false);
    }
  }, [session, session?.user?.id]);

  useEffect(() => {
    try {
      if (
        !isEmpty(teacher) &&
        teacher?.schoolId?.length > 0 &&
        teacher?.classId?.length > 0
      ) {
        let queryRef = query(
          collection(db, "students"),
          where("schoolId", "==", teacher?.schoolId),
          where("classId", "==", teacher?.classId),
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
          setStudPending(false);
        });
      } else {
        if (isEmpty(teacher)) {
          throw "No selected teacher";
        } else if (teacher?.schoolId?.length < 1) {
          throw "Invalid selected school id";
        } else if (student?.classId?.length < 1) {
          throw "Invalid selected class id";
        }
      }
    } catch (error) {
      console.log("Teacher Hook: getClassroomFromDb useEffect: ", error);
      setStudError(error);
      setStudPending(false);
    }
  }, [teacher, teacher?.schoolId, teacher?.classId]);

  useEffect(() => {
    try {
      if (teacher?.schoolId?.length > 0 && teacher?.classId?.length > 0) {
        let queryRef = collection(
          db,
          "schools",
          teacher.schoolId,
          "classes",
          teacher.classId,
          "homeworks"
        );

        return onSnapshot(queryRef, (snapshot) => {
          let tmp = [];
          snapshot.forEach((doc) => {
            let timestm = doc.data().timestamp.toDate();
            let timedue = doc.data().due.toDate();
            let complete = doc.data().complete || false;
            let hmework = {
              id: doc.id,
              ...doc.data(),
              timestamp: timestm,
              due: timedue,
              complete,
            };

            tmp.push(hmework);
          });

          setHomeworks(tmp);
          setHomeworksPending(false);
        });
      } else {
        if (teacher?.schoolId?.length < 1) {
          throw "Missing school Id";
        } else if (teacher?.classId?.length < 1) {
          throw "missing class Id";
        }
      }
    } catch (error) {
      console.log("Teacher Hook: getHomeworksFromDb useEffect: ", error);
      setHomeworksError(error);
      setHomeworksPending(false);
    }
  }, [teacher, teacher?.schoolId, teacher?.classId]);

  useEffect(() => {
    try {
      if (teacher?.schoolId?.length > 0 && teacher?.classId?.length > 0) {
        let diaryRef = collection(
          db,
          "schools",
          teacher.schoolId,
          "classes",
          teacher.classId,
          "diaries"
        );

        const startToday = new Date(),
          endToday = new Date();
        // Set up start date
        startToday.setHours(0);
        startToday.setMinutes(0);
        startToday.setSeconds(0);
        // Set up end date
        endToday.setHours(23);
        endToday.setMinutes(59);
        endToday.setSeconds(59);
        let queryRef = query(
          diaryRef,
          where("timestamp", ">=", startToday),
          where("timestamp", "<=", endToday),
          orderBy("timestamp", "desc"),
          limit(1)
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
        if (teacher?.schoolId?.length < 1) {
          throw "Missing school Id";
        } else if (teacher?.classId?.length < 1) {
          throw "missing class Id";
        }
      }
    } catch (error) {
      console.log("Teacher Hook: getHomeworksFromDb useEffect: ", error);
      setDiariesError(error);
      setDiariesPending(false);
    }
  }, [teacher, teacher?.schoolId, teacher?.classId]);

  useEffect(() => {
    try {
      if (!isEmpty(teacher) && teacher?.schoolId?.length > 0) {
        let docRef = doc(db, "schools", teacher.schoolId);

        return onSnapshot(docRef, (doc) => {
          if (doc.exists()) {
            let sch = { id: doc.id, ...doc.data() };
            setSchool(sch);
            setSchoolPending(false);
          }
        });
      } else {
        if (isEmpty(teacher)) {
          throw "No selected teacher";
        } else if (student?.schoolId?.length < 1) {
          throw "Invalid selected school id";
        }
      }
    } catch (error) {
      console.log("Teacher Hook: getSchoolFromDb useEffect: ", error);
      setSchoolError(error);
      setSchoolPending(false);
    }
  }, [teacher, teacher?.schoolId]);

  useEffect(() => {
    try {
      if (
        !isEmpty(teacher) &&
        teacher?.schoolId?.length > 0 &&
        teacher?.classId?.length > 0
      ) {
        let docRef = doc(
          db,
          "schools",
          teacher.schoolId,
          "classes",
          teacher.classId
        );

        return onSnapshot(docRef, (doc) => {
          if (doc.exists()) {
            let cls = { id: doc.id, ...doc.data() };
            setClassroom(cls);
            setClassPending(false);
          }
        });
      } else {
        if (isEmpty(teacher)) {
          throw "No selected teacher";
        } else if (teacher?.schoolId?.length < 1) {
          throw "Invalid selected school id";
        } else if (student?.classId?.length < 1) {
          throw "Invalid selected class id";
        }
      }
    } catch (error) {
      console.log("Teacher Hook: getClassroomFromDb useEffect: ", error);
      setClassError(error);
      setClassPending(false);
    }
  }, [teacher, teacher?.schoolId, teacher?.classId]);

  async function updateHomeworkInfo(info) {
    return new Promise(async (resolve, reject) => {
      try {
        if (teacher?.schoolId?.length < 1 || teacher?.classId?.length < 1) {
          throw "Missing school or class Id";
        } else if (isEmpty(info)) {
          throw "Nothing in update object";
        } else {
          if (!isEmpty(selHomework) && selHomeworkMode === "edit") {
            let docRef = doc(
              db,
              "schools",
              teacher.schoolId,
              "classes",
              teacher.classId,
              "homeworks",
              selHomework?.id
            );

            setDoc(docRef, info, { merge: true }).then((res) => {
              resolve("success");
            });
            setSelHomeworkMode("add");
          } else if (selHomeworkMode === "add") {
            let docRef = collection(
              db,
              "schools",
              teacher.schoolId,
              "classes",
              teacher.classId,
              "homeworks"
            );

            addDoc(docRef, info).then((res) => {
              resolve("success");
            });
          }
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  async function removeHomeworkInfo(data) {
    return new Promise(async (resolve, reject) => {
      try {
        if (teacher?.schoolId?.length < 1 || teacher?.classId?.length < 1) {
          throw "Missing school or class Id";
        } else if (data?.id?.length < 1) {
          throw "Missing target document Id";
        } else {
          let docRef = doc(
            db,
            "schools",
            teacher.schoolId,
            "classes",
            teacher.classId,
            "homeworks",
            data.id
          );

          deleteDoc(docRef).then((res) => {
            resolve("success");
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  const getHomeworkById = (id) => {
    let found = homeworks?.length > 0 && homeworks.find((d) => d.id == id);
    return found;
  };

  async function updateReminderInfo(info) {
    return new Promise(async (resolve, reject) => {
      try {
        if (teacher?.schoolId?.length < 1 || teacher?.classId?.length < 1) {
          throw "Missing school or class Id";
        } else if (isEmpty(info)) {
          throw "Nothing in update object";
        } else {
          console.log(selReminderMode);
          if (!isEmpty(selReminder) && selReminderMode === "edit") {
            console.log(!isEmpty(selReminder) && selReminderMode === "edit");
            let docRef;
            if (info?.scope === "sch" || selReminder?.scope === "sch") {
              docRef = doc(
                db,
                "schools",
                teacher.schoolId,
                "reminders",
                selReminder.id
              );
            } else if (info?.scope === "cls" || selReminder?.scope === "cls") {
              docRef = doc(
                db,
                "schools",
                teacher?.schoolId,
                "classes",
                teacher?.classId,
                "reminders",
                selReminder?.id
              );
            } else {
              throw "Scope required.";
            }

            setDoc(docRef, info, { merge: true }).then((res) => {
              resolve("success");
            });
            setSelRemindersMode("add");
          } else if (selReminderMode === "add") {
            console.log("run add");
            let docRef;
            if (info.scope === "sch") {
              docRef = collection(db, "schools", teacher.schoolId, "reminders");
            } else if (info.scope === "cls") {
              docRef = collection(
                db,
                "schools",
                teacher.schoolId,
                "classes",
                teacher.classId,
                "reminders"
              );
            } else {
              throw "Scope required.";
            }

            addDoc(docRef, info).then((res) => {
              resolve("success");
            });
          }
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  async function removeReminderInfo(data) {
    return new Promise(async (resolve, reject) => {
      try {
        if (teacher?.schoolId?.length < 1 || teacher?.classId?.length < 1) {
          throw "Missing school or class Id";
        } else if (data?.id?.length < 1) {
          throw "Missing target document Id";
        } else if (data?.scope?.length < 1) {
          throw "Missing target document Id";
        } else {
          let docRef;
          if (data?.scope === "sch") {
            docRef = doc(db, "schools", teacher.schoolId, "reminders", data.id);
          } else if (data?.scope === "cls") {
            docRef = doc(
              db,
              "schools",
              teacher.schoolId,
              "classes",
              teacher.classId,
              "reminders",
              data.id
            );
          } else {
            throw "Scope required.";
          }

          deleteDoc(docRef).then((res) => {
            resolve("success");
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  async function updateDiaryInfo(info) {
    return new Promise(async (resolve, reject) => {
      try {
        if (teacher?.schoolId?.length < 1 || teacher?.classId?.length < 1) {
          throw "Missing school or class Id";
        } else if (isEmpty(info)) {
          throw "Nothing in update object";
        } else {
          if (!isEmpty(selDiary) && selDiaryMode === "edit") {
            let docRef = doc(
              db,
              "schools",
              teacher.schoolId,
              "classes",
              teacher.classId,
              "diaries",
              selDiary?.id
            );

            setDoc(docRef, info, { merge: true }).then((res) => {
              resolve("success");
            });
            setSelHomeworkMode("add");
          } else if (selDiaryMode === "add") {
            let docRef = collection(
              db,
              "schools",
              teacher.schoolId,
              "classes",
              teacher.classId,
              "diaries"
            );
            console.log("runn add");
            addDoc(docRef, info).then((res) => {
              resolve("success");
            });
          }
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  async function getStudentHomework(student, id) {
    return new Promise(async (resolve, reject) => {
      try {
        if (student?.id?.length < 1) {
          throw "Invalid student id";
        } else if (id?.length < 1) {
          throw "Invalid homework id";
        } else {
          let docRef = doc(db, "students", student.id, "homeworks", id);

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
                student: {
                  name: student?.name,
                  image: student?.image,
                },
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

  async function getStudentsHomeworks(id) {
    return new Promise(async (resolve, reject) => {
      try {
        if (students?.length < 1) {
          throw "Invalid student id";
        } else if (id?.length < 1) {
          throw "Invalid homework id";
        } else {
          let promises = [];
          students.forEach((s) => {
            promises.push(getStudentHomework(s, id));
          });
          Promise.all(promises).then((res) => {
            resolve(res);
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  return {
    teacher,
    students,
    homeworks,
    diaries,
    school,
    classroom,

    teachPending,
    studPending,
    schoolPending,
    classPending,
    homeworksPending,
    diariesPending,

    teachError,
    studError,
    classError,
    schoolError,
    homeworksError,
    diariesError,

    getHomeworkById,
    updateHomeworkInfo,
    updateDiaryInfo,
    updateReminderInfo,
    removeHomeworkInfo,
    removeReminderInfo,
    getStudentsHomeworks,
  };
};

export default useTeacherFetch;
