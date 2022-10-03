import dynamic from "next/dynamic";
import useStudentFetch from "../../helpers/hooks/students/student";
import CardReminder from "./reminder";
//dynamic
const FaSwimmer = dynamic(
  async () => (await import("react-icons/fa")).FaSwimmer
);
const BiFootball = dynamic(
  async () => (await import("react-icons/bi")).BiFootball
);

export default function UpcomingEvents() {
  const { reminders } = useStudentFetch();

  return (
    <div>
      <p className="font-semibold text-gray-500 text-2xl mb-2 font-inter">
        {"Reminders"}
      </p>
      <div className="grid gap-6">
        {reminders.map((rem, i) => (
          <CardReminder
            key={rem?.id}
            data={rem}
            type={i % 2 ? "primary" : "secondary"}
          />
        ))}
      </div>
    </div>
  );
}
