import { useState, useEffect, createContext, useContext } from "react";
//custom packs
import { useSession } from "next-auth/react";
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
  const [selChatroom, setSelChatroom] = useState(null);
  const [selHomework, setSelHomework] = useState(null);
  const [selDiary, setSelDiary] = useState(null);
  const [selReminder, setSelReminder] = useState(null);
  const [selChatPart, setSelChatPart] = useState(null);

  //data creation mode
  const [selDiaryMode, setSelDiaryMode] = useState("add");
  const [selHomeworkMode, setSelHomeworkMode] = useState("add");
  const [selReminderMode, setSelReminderMode] = useState("add");

  return {
    selChatroom,
    setSelChatroom,

    selChatPart,
    setSelChatPart,

    selStudent,
    setSelStudent,

    selHomework,
    setSelHomework,
    selHomeworkMode,
    setSelHomeworkMode,

    selDiary,
    setSelDiary,
    selDiaryMode,
    setSelDiaryMode,

    selReminder,
    setSelReminder,
    selReminderMode,
    setSelReminderMode,
  };
}
