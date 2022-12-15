import { useRouter } from "next/router";
//hooks
import { useData } from "../../context/dataContext";
//custom
import CircleButton from "../cards/CircleButton";

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
  return (
    <section className="mt-6">
      <p className="font-semibold text-cyan-800 text-2xl mb-2 font-inter">
        Create
      </p>
      <div className="grid grid-cols-2">
        <CircleButton
          data={{ text: "Homework", image: "/images/books.webp" }}
          index={0}
          func={handleHomeWorkClick}
        />
        <CircleButton
          data={{ text: "Reminders", image: "/images/remind.webp" }}
          index={1}
          func={handleRemindersClick}
        />
      </div>
    </section>
  );
}
