import { isAfter, isBefore } from "date-fns";
//hooks
import useUserFetch from "../helpers/hooks/user";
import useClassroomFetch from "../helpers/hooks/classroom";
//custom
import { AuthGuard } from "../components/elements/authGuard";
import CardReminder from "../components/cards/reminder";

export default function Reminders() {
  const {user } = useUserFetch();
  const { schReminders, clsReminders } = useClassroomFetch(user);

  let allEvents = schReminders.concat(clsReminders);
  allEvents = allEvents.sort((a, b) => a.timestamp - b.timestamp);

  let upcoming = allEvents.filter((event) =>
    isBefore(event.timestamp, new Date())
  );
  let passed = allEvents.filter((event) =>
    isAfter(event.timestamp, new Date())
  );

  return (
    <AuthGuard>
      <main className="min-h-[95vh] py-20 grid gap-2">
        {allEvents.length < 1 && (
          <p className="font-semibold text-gray-400 text-center px-6">
            There are no reminders to show
          </p>
        )}
        <section className="pt-5 px-4">
          {upcoming.length > 0 && (
            <>
              <p className="font-semibold text-cyan-800 text-2xl mb-2 font-poppins">
                {"Reminders"}
              </p>
              <div className="grid gap-4">
                {upcoming.map((r, i) => (
                  <CardReminder key={r.id} index={i} data={r} />
                ))}
              </div>
            </>
          )}
        </section>
        <section className="pt-4 px-4">
          {passed.length > 0 && (
            <>
              <p className="font-semibold text-gray-500 mb-2 font-poppins">
                {"Past Reminders"}
              </p>
              <div className="grid gap-4">
                {passed.map((r, i) => (
                  <CardReminder key={r.id} index={i} data={r} passed />
                ))}
              </div>
            </>
          )}
        </section>
      </main>
    </AuthGuard>
  );
}
