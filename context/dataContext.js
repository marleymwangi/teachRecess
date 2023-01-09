import { useState, useEffect, createContext, useContext } from "react";
//custom packs
import localforage from "localforage";


const dataContext = createContext();

export function ProvideData({ children }) {
  const data = useProvideData();
  return <dataContext.Provider value={data}>{children}</dataContext.Provider>;
}

export const useData = () => {
  return useContext(dataContext);
};

function useProvideData() {
  //shared app data
  const [selStudent, setSelStudent] = useState(null);
  const [selStudents, setSelStudents] = useState([]);
  const [selChatroom, setSelChatroom] = useState(null);
  const [selHomework, setSelHomework] = useState(null);
  const [selDiary, setSelDiary] = useState(null);
  const [selBnote, setSelBnote] = useState(null);
  const [selReminder, setSelReminder] = useState(null);
  const [selChatPart, setSelChatPart] = useState(null);

  //data creation mode
  const [selDiaryMode, setSelDiaryMode] = useState("add");
  const [selBnoteMode, setSelBnoteMode] = useState("add");
  const [selHomeworkMode, setSelHomeworkMode] = useState("add");
  const [selReminderMode, setSelReminderMode] = useState("add");

  return {
    selChatroom,
    setSelChatroom,

    selChatPart,
    setSelChatPart,

    selStudent,
    setSelStudent,

    selStudents,
    setSelStudents,

    selHomework,
    setSelHomework,
    selHomeworkMode,
    setSelHomeworkMode,

    selDiary,
    setSelDiary,
    selDiaryMode,
    setSelDiaryMode,

    selBnote,
    setSelBnote,
    selBnoteMode,
    setSelBnoteMode,

    selReminder,
    setSelReminder,
    selReminderMode,
    setSelReminderMode,
  };
}
