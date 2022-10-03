//custom
import Calendar from "../components/calender";
import ChildHomework from "../components/child/homework";
import { AuthGuard } from "../components/elements/authGuard";

export default function CalendarPage() {
  return (
    <AuthGuard>
      <main className="min-h-[95vh] py-16">
        <Calendar />
        <section className="pt-5 px-4">
          <p className="font-bold text-2xl mb-2 font-nexa">{"Homework"}</p>
          <div className="grid gap-4">
            <ChildHomework data={{ name: "Bob Mwangi", overdue: 5 }} />
            <ChildHomework data={{ name: "John Doe", overdue: 3 }} />
          </div>
        </section>
      </main>
    </AuthGuard>
  );
}
