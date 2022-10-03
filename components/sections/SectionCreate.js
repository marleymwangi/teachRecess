import { useRouter } from "next/router";
//custom
import CircleButton from "../cards/CircleButton";

export default function SectionCreate() {
  const router = useRouter();

  const handleHomeWorkClick = () => {
      router.push(`/create/diary`);
  };

  const handleRemindersClick = () => {
      router.push(`/create/reminders`);
  };
  return (
    <section className="mt-6">
      <p className="font-semibold text-gray-500 text-2xl mb-2 font-inter">
        Create
      </p>
      <div className="grid grid-cols-2">
        <CircleButton data={{ text: "Homework" }} index={0} func={handleHomeWorkClick}/>
        <CircleButton data={{ text: "Reminders" }} index={1} func={handleRemindersClick}/>
      </div>
    </section>
  );
}