import { useEffect, useState } from "react";
import {
  doc,
  limit,
  query,
  where,
  orderBy,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  onSnapshot,
} from "@firebase/firestore";
import {
  ref,
  getDownloadURL,
  uploadString,
  deleteObject,
} from "@firebase/storage";
import { db, storage } from "../../firebase";
//custom
import { isEmpty } from "../utility";
import { useData } from "../../context/dataContext";

const useClassroomFetch = (teacher) => {
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
  const [students, setStudents] = useState([]);
  const [homeworks, setHomeworks] = useState([]);
  const [diaries, setDiaries] = useState([]);
  const [schReminders, setSchReminders] = useState([]);
  const [clsReminders, setClsReminders] = useState([]);
  const [school, setSchool] = useState({});
  const [classroom, setClassroom] = useState({});

  const [studPending, setStudPending] = useState(true);
  const [homeworksPending, setHomeworksPending] = useState(true);
  const [diariesPending, setDiariesPending] = useState(true);
  const [schRemindersPending, setSchRemindersPending] = useState(true);
  const [clsRemindersPending, setClsRemindersPending] = useState(true);
  const [classPending, setClassPending] = useState(true);
  const [schoolPending, setSchoolPending] = useState(true);

  const [studError, setStudError] = useState(null);
  const [homeworksError, setHomeworksError] = useState(null);
  const [diariesError, setDiariesError] = useState(null);
  const [schRemindersError, setSchRemindersError] = useState(null);
  const [clsRemindersError, setClsRemindersError] = useState(null);
  const [schoolError, setSchoolError] = useState(null);
  const [classError, setClassError] = useState(null);

  useEffect(() => {
    try {
      if (
        !isEmpty(teacher) &&
        teacher?.school_id?.length > 0 &&
        teacher?.class?.id?.length > 0
      ) {
        let queryRef = query(
          collection(db, "students"),
          where("school_id", "==", teacher?.school_id),
          where("class_id", "==", teacher?.class?.id),
          orderBy("name", "desc")
        );

        return onSnapshot(
          queryRef,
          (snapshot) => {
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
          },
          (error) => {
            console.info(
              "Classroom Hook: getStudentsFromDb useEffect: ",
              error
            );
          }
        );
      } else {
        if (isEmpty(teacher)) {
          throw "No selected teacher";
        } else if (teacher?.school_id?.length < 1) {
          throw "Invalid selected school id";
        } else if (teacher?.class?.id?.length < 1) {
          throw "Invalid selected class id";
        }
      }
    } catch (error) {
      console.info("Classroom Hook: getStudentsFromDb useEffect: ", error);
      setStudError(error);
      setStudPending(false);
    }
  }, [teacher, teacher?.school_id, teacher?.class?.id]);

  useEffect(() => {
    try {
      if (
        !isEmpty(teacher) &&
        teacher?.school_id?.length > 0 &&
        teacher?.class?.id?.length > 0
      ) {
        let schClsId = teacher?.school_id + teacher.class.id;
        let queryRef = collection(db, "institutionGroup", schClsId, "homework");

        return onSnapshot(
          queryRef,
          (snapshot) => {
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
          },
          (error) => {
            console.info(
              "Classroom Hook: getHomeworksFromDb useEffect: ",
              error
            );
          }
        );
      } else {
        if (isEmpty(teacher)) {
          throw "No selected teacher";
        } else if (teacher?.school_id?.length < 1) {
          throw "Invalid selected school id";
        } else if (teacher?.class?.id?.length < 1) {
          throw "Invalid selected class id";
        }
      }
    } catch (error) {
      console.info("Classroom Hook: getHomeworksFromDb useEffect: ", error);
      setHomeworksError(error);
      setHomeworksPending(false);
    }
  }, [teacher, teacher?.school_id, teacher?.class?.id]);

  useEffect(() => {
    try {
      if (teacher?.school_id?.length > 0 && teacher?.class?.id?.length > 0) {
        let schClsId = teacher?.school_id + teacher.class.id;
        let diaryRef = collection(db, "institutionGroup", schClsId, "diaries");

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

        return onSnapshot(
          queryRef,
          (snapshot) => {
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
          },
          (error) => {
            console.info(
              "Classroom Hook: getHomeworksFromDb useEffect: ",
              error
            );
          }
        );
      } else {
        if (isEmpty(teacher)) {
          throw "No selected teacher";
        } else if (teacher?.school_id?.length < 1) {
          throw "Invalid selected school id";
        } else if (teacher?.class?.id?.length < 1) {
          throw "Invalid selected class id";
        }
      }
    } catch (error) {
      console.info("Classroom Hook: getHomeworksFromDb useEffect: ", error);
      setDiariesError(error);
      setDiariesPending(false);
    }
  }, [teacher, teacher?.school_id, teacher?.class?.id]);

  useEffect(() => {
    try {
      if (
        !isEmpty(teacher) &&
        teacher?.school_id?.length > 0 &&
        teacher?.class?.id?.length > 0
      ) {
        let schClsId = teacher.school_id + teacher.class?.id;
        let diaryRef = collection(
          db,
          "institutionGroup",
          schClsId,
          "reminders"
        );
        let queryRef = query(diaryRef);

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
        if (isEmpty(teacher)) {
          throw "No selected teacher";
        } else if (teacher?.school_id?.length < 1) {
          throw "Invalid selected teacher id";
        } else if (teacher?.class?.id?.length < 1) {
          throw "Invalid selected teacher id";
        }
      }
    } catch (error) {
      console.log("Student Hook: getClsReminders useEffect: ", error);
      setClsRemindersError(error);
      setClsRemindersPending(false);
    }
  }, [teacher]);

  useEffect(() => {
    try {
      if (!isEmpty(teacher) && teacher?.school_id?.length > 0) {
        let diaryRef = collection(
          db,
          "institutionGroup",
          teacher.school_id,
          "reminders"
        );
        let queryRef = query(diaryRef);

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
        if (isEmpty(teacher)) {
          throw "No selected teacher";
        } else if (teacher?.school_id?.length < 1) {
          throw "Invalid selected teacher id";
        }
      }
    } catch (error) {
      console.log("Student Hook: getSchReminders useEffect: ", error);
      setSchRemindersError(error);
      setSchRemindersPending(false);
    }
  }, [teacher]);

  useEffect(() => {
    try {
      if (!isEmpty(teacher) && teacher?.school_id?.length > 0) {
        let docRef = doc(db, "schools", teacher.school_id);

        return onSnapshot(
          docRef,
          (doc) => {
            if (doc.exists()) {
              let sch = { id: doc.id, ...doc.data() };
              setSchool(sch);
              setSchoolPending(false);
            }
          },
          (error) => {
            console.info("Classroom Hook: getSchoolFromDb useEffect: ", error);
          }
        );
      } else {
        if (isEmpty(teacher)) {
          throw "No selected teacher";
        } else if (teacher?.schoolId?.length < 1) {
          throw "Invalid selected school id";
        }
      }
    } catch (error) {
      console.info("Classroom Hook: getSchoolFromDb useEffect: ", error);
      setSchoolError(error);
      setSchoolPending(false);
    }
  }, [teacher, teacher?.school_id]);

  useEffect(() => {
    try {
      if (
        !isEmpty(teacher) &&
        teacher?.school_id?.length > 0 &&
        teacher?.class?.id?.length > 0
      ) {
        let docRef = doc(
          db,
          "schools",
          teacher.school_id,
          "classes",
          teacher.class.id
        );

        return onSnapshot(
          docRef,
          (doc) => {
            if (doc.exists()) {
              let cls = { id: doc.id, ...doc.data() };
              setClassroom(cls);
              setClassPending(false);
            }
          },
          (error) => {
            console.info(
              "Classroom Hook: getClassroomFromDb useEffect: ",
              error
            );
          }
        );
      } else {
        if (isEmpty(teacher)) {
          throw "No selected teacher";
        } else if (teacher?.school_id?.length < 1) {
          throw "Invalid selected school id";
        } else if (teacher?.class?.id?.length < 1) {
          throw "Invalid selected class id";
        }
      }
    } catch (error) {
      console.info("Classroom Hook: getClassroomFromDb useEffect: ", error);
      setClassError(error);
      setClassPending(false);
    }
  }, [teacher, teacher?.school_id, teacher?.class?.id]);

  async function updateHomeworkInfo(info) {
    return new Promise(async (resolve, reject) => {
      try {
        if (teacher?.school_id?.length < 1 || teacher?.class?.id?.length < 1) {
          throw "Missing school or class Id";
        } else if (isEmpty(info)) {
          throw "Nothing in update object";
        } else {
          let schClsId = teacher.school_id + teacher.class.id;
          info.notify = {
            school_id: teacher.school_id,
            class_id: teacher.class.id,
          };
          if (selHomeworkMode === "edit") {
            if (isEmpty(selHomework)) {
              throw "No selected Homework";
            } else if (selHomework?.id?.length < 1) {
              throw "Invalid selected homework id";
            } else {
              let docRef = doc(
                db,
                "institutionGroup",
                schClsId,
                "homework",
                selHomework.id
              );

              if (info.selectedFile && info?.type === "image") {
                let tmpRef =
                  "institutionGroup/" + schClsId + "/" + selHomework.id;
                const imageRef = ref(storage, tmpRef);

                uploadString(imageRef, info.selectedFile, "data_url").then(
                  (snapshot) => {
                    let docRef = doc(
                      db,
                      "institutionGroup",
                      schClsId,
                      "homework",
                      selHomework.id
                    );
                    getDownloadURL(imageRef).then((url) => {
                      updateDoc(docRef, {
                        image: url,
                      }).then((res) => resolve("done"));
                    });
                  }
                );
              } else {
                setDoc(docRef, info, { merge: true }).then((res) => {
                  resolve("success");
                });
              }

              setSelHomeworkMode("add");
            }
          } else if (selHomeworkMode === "add") {
            let docRef = collection(
              db,
              "institutionGroup",
              schClsId,
              "homework"
            );
            let selectedFile = info.selectedFile;
            delete info.selectedFile;

            addDoc(docRef, info).then((res) => {
              if (selectedFile && info?.type === "image") {
                let tmpRef = "institutionGroup/" + schClsId + "/" + res.id;
                const imageRef = ref(storage, tmpRef);

                uploadString(imageRef, selectedFile, "data_url").then(
                  (snapshot) => {
                    let docRef = doc(
                      db,
                      "institutionGroup",
                      schClsId,
                      "homework",
                      res.id
                    );
                    getDownloadURL(imageRef).then((url) => {
                      updateDoc(docRef, {
                        image: url,
                      }).then((res) => resolve("done"));
                    });
                  }
                );
              } else {
                resolve("success");
              }
            });
          }
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  async function removeHomework(data) {
    return new Promise(async (resolve, reject) => {
      try {
        if (teacher?.school_id?.length < 1 || teacher?.class?.id?.length < 1) {
          throw "Missing school or class Id";
        } else if (data?.id?.length < 1) {
          throw "Missing target document Id";
        } else {
          let schClsId = teacher.school_id + teacher.class.id;
          let docRef = doc(
            db,
            "institutionGroup",
            schClsId,
            "homework",
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
        if (teacher?.school_id?.length < 1 || teacher?.class?.id?.length < 1) {
          throw "Missing school or class Id";
        } else if (isEmpty(info)) {
          throw "Nothing in update object";
        } else {
          let schClsId = teacher.school_id + teacher.class.id;

          if (info?.scope === "sch") {
            info.notify = {
              school_id: teacher.school_id,
            };
          }

          if (info?.scope === "cls") {
            info.notify = {
              school_id: teacher.school_id,
              class_id: teacher.class.id,
            };
          }

          if (selReminderMode === "edit") {
            if (isEmpty(selReminder)) {
              throw "No selected reminder";
            } else {
              let docRef;
              if (info?.scope === "sch" || selReminder?.scope === "sch") {
                docRef = doc(
                  db,
                  "institutionGroup",
                  teacher.school_id,
                  "reminders",
                  selReminder.id
                );
              } else if (
                info?.scope === "cls" ||
                selReminder?.scope === "cls"
              ) {
                docRef = doc(
                  db,
                  "institutionGroup",
                  schClsId,
                  "reminders",
                  selReminder.id
                );
              } else {
                throw "Scope required.";
              }

              setDoc(docRef, info, { merge: true }).then((res) => {
                resolve("success");
              });
              setSelRemindersMode("add");
            }
          } else if (selReminderMode === "add") {
            let docRef;
            if (info.scope === "sch") {
              docRef = collection(
                db,
                "institutionGroup",
                teacher.school_id,
                "reminders"
              );
            } else if (info.scope === "cls") {
              docRef = collection(
                db,
                "institutionGroup",
                schClsId,
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
        if (teacher?.school_id?.length < 1 || teacher?.class?.id?.length < 1) {
          throw "Missing school or class Id";
        } else if (data?.id?.length < 1) {
          throw "Missing target document Id";
        } else if (data?.scope?.length < 1) {
          throw "Missing target document Id";
        } else {
          let schClsId = teacher.school_id + teacher.class.id;
          let docRef;
          if (data?.scope === "sch") {
            docRef = doc(
              db,
              "institutionGroup",
              teacher.school_id,
              "reminders",
              data.id
            );
          } else if (data?.scope === "cls") {
            docRef = doc(
              db,
              "institutionGroup",
              schClsId,
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
        if (teacher?.school_id?.length < 1 || teacher?.class?.id?.length < 1) {
          throw "Missing school or class Id";
        } else if (isEmpty(info)) {
          throw "Nothing in update object";
        } else {
          let schClsId = teacher.school_id + teacher.class.id;
          if (selDiaryMode === "edit") {
            if (isEmpty(selDiary)) {
              throw "No selected diary";
            } else {
              let docRef = doc(
                db,
                "institutionGroup",
                schClsId,
                "diaries",
                selDiary?.id
              );

              setDoc(docRef, info, { merge: true }).then((res) => {
                resolve("success");
              });
              setSelHomeworkMode("add");
            }
          } else if (selDiaryMode === "add") {
            let docRef = collection(
              db,
              "institutionGroup",
              schClsId,
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

  const getStudentById = (id) => {
    let found = students?.length > 0 && students.find((stud) => stud.id == id);
    return found;
  };

  return {
    students,
    homeworks,
    diaries,
    schReminders,
    clsReminders,
    school,
    classroom,

    studPending,
    schoolPending,
    classPending,
    homeworksPending,
    diariesPending,
    schRemindersPending,
    clsRemindersPending,

    studError,
    classError,
    schoolError,
    homeworksError,
    diariesError,
    schRemindersError,
    clsRemindersError,

    getHomeworkById,
    updateHomeworkInfo,
    updateDiaryInfo,
    updateReminderInfo,
    removeHomework,
    removeReminderInfo,
    getStudentById,
  };
};

export default useClassroomFetch;
