import { useState } from "react";
import {
  add,
  addWeeks,
  eachDayOfInterval,
  endOfWeek,
  getWeekOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  startOfWeek,
  startOfToday,
} from "date-fns";
//hooks
import useTeacherFetch from "../helpers/hooks/teacher";
import useCalendarFetch from "../helpers/hooks/calendar/calendar";
//custom
import Calendar from "../components/calender";
import { AuthGuard } from "../components/elements/authGuard";
import CirclesCardHomework from "../components/cards/CirclesCardHomework";
import CardReminder from "../components/cards/reminder";

export default function CalendarPage() {
  let today = startOfToday();
  let [currentWeek, setCurrentWeek] = useState(today);
  let firstDayCurrentWeek = startOfWeek(currentWeek, { weekStartsOn: 1 });
  let endDayCurrentWeek = endOfWeek(currentWeek, {
    weekStartsOn: 1,
  });

  const { teacher } = useTeacherFetch();
  const { homeworks, schReminders, clsReminders } = useCalendarFetch(
    teacher?.schoolId,
    teacher?.classId,
    currentWeek
  );

  const [selectedDay, setSelectedDay] = useState(today);

  function previousWeek() {
    let firstDayCurrentWeek = addWeeks(currentWeek, -1);
    setCurrentWeek(firstDayCurrentWeek);
  }

  function nextWeek() {
    let firstDayCurrentWeek = addWeeks(currentWeek, 1);
    setCurrentWeek(firstDayCurrentWeek);
  }

  let selectedDayHomeworks = homeworks?.filter(
    (hmwrk) =>
      isSameDay(hmwrk.timestamp, selectedDay) ||
      isSameDay(hmwrk.due, selectedDay)
  );

  let selectedDaySchReminders = schReminders?.filter((rem) =>
    isSameDay(rem.timestamp, selectedDay)
  );

  let selectedDayClsReminders = clsReminders?.filter((rem) =>
    isSameDay(rem.timestamp, selectedDay)
  );

  return (
    <AuthGuard>
      <main className="min-h-[95vh] py-16">
        <Calendar
          homeworks={homeworks}
          nextWeek={nextWeek}
          previousWeek={previousWeek}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          firstDayCurrentWeek={firstDayCurrentWeek}
          endDayCurrentWeek={endDayCurrentWeek}
        />
        <section className="pt-5 px-4">
          <p className="font-semibold text-emma-700 text-2xl mb-2 font-inter">
            {"Homework"}
          </p>
          <div className="grid gap-4">
            {selectedDayHomeworks.map((h, i) => (
              <CirclesCardHomework key={h.id} index={i} data={h} />
            ))}
          </div>
        </section>
        <section className="pt-5 px-4">
          <p className="font-semibold text-emma-700 text-2xl mb-2 font-inter">
            {"Reminders"}
          </p>
          <div className="grid gap-4">
            {selectedDaySchReminders.map((r, i) => (
              <CardReminder key={r.id} index={i} data={r} />
            ))}
            {selectedDayClsReminders.map((r, i) => (
              <CardReminder key={r.id} index={i} data={r} />
            ))}
          </div>
        </section>
      </main>
    </AuthGuard>
  );
}
