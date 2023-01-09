import { useRouter } from "next/router";
//hooks
import { useData } from "../../context/dataContext";
//custom
import CircleButton from "../elements/CircleButton";

export default function SectionCreate() {
  const router = useRouter();
  const {
    setSelHomework,
    setSelHomeworkMode,
    setSelReminder,
    setSelReminderMode,
  } = useData();

  const handleHomeWorkClick = () => {
    setSelHomework(null);
    setSelHomeworkMode("add");
    router.push(`/create/homework`);
  };

  const handleRemindersClick = () => {
    setSelReminder(null);
    setSelReminderMode("add");
    router.push(`/create/reminders`);
  };

  const handleDiaryClick = () => {
    setSelReminder(null);
    setSelReminderMode("add");
    router.push(`/create/diary`);
  };

  const handleBNoteClick = () => {
    setSelReminder(null);
    setSelReminderMode("add");
    router.push(`/create/bnote`);
  };
  
  return (
    <section className="mt-6">
      <p className="font-semibold text-gray-500 text-2xl mb-2 font-inter">
        Create
      </p>
      <div className="grid grid-cols-2">
        <CircleButton
          data={{ text: "Homework", image: "/images/books.webp" }}
          index={0}
          func={handleHomeWorkClick}
        />
        <CircleButton
          data={{ text: "Reminders", image: "/images/remind1.webp" }}
          index={1}
          func={handleRemindersClick}
        />
        <CircleButton
          data={{ text: "Diary Note", image: "/images/remind.webp" }}
          index={0}
          func={handleDiaryClick}
        />
        <CircleButton
          data={{ text: "Behavioral Note", image: "/images/mood.webp" }}
          index={1}
          func={handleBNoteClick}
        />
      </div>
    </section>
  );
}
