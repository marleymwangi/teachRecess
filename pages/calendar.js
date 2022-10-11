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
import TeacherComment from "../components/cards/TeacherComment";

export default function CalendarPage() {
  let today = startOfToday();
  let [currentWeek, setCurrentWeek] = useState(today);
  const [selectedDay, setSelectedDay] = useState(today);

  let firstDayCurrentWeek = startOfWeek(currentWeek, { weekStartsOn: 1 });
  let endDayCurrentWeek = endOfWeek(currentWeek, {
    weekStartsOn: 1,
  });

  const { teacher } = useTeacherFetch();
  const { diaries, homeworks, schReminders, clsReminders } = useCalendarFetch(
    teacher?.schoolId,
    teacher?.classId,
    currentWeek
  );

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

  let selectedDayDiary = diaries?.filter((dia) =>
    isSameDay(dia.timestamp, selectedDay)
  );

  return (
    <AuthGuard>
      <main className="min-h-[95vh] py-16">
        <Calendar
          diaries={diaries}
          homeworks={homeworks}
          clsReminders={clsReminders}
          schReminders={schReminders}
          nextWeek={nextWeek}
          previousWeek={previousWeek}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          firstDayCurrentWeek={firstDayCurrentWeek}
          endDayCurrentWeek={endDayCurrentWeek}
        />
        <section className="pt-5 px-4">
          <div className="grid gap-4">
            {selectedDayDiary.map((d, i) => (
              <TeacherComment key={d.id} index={i} data={d} />
            ))}
          </div>
        </section>
        <section className="pt-5 px-4">
          {selectedDayHomeworks.length > 0 && (
            <>
              <p className="font-semibold text-emma-800 text-2xl mb-2 font-inter">
                {"Homework"}
              </p>
              <div className="grid gap-4">
                {selectedDayHomeworks.map((h, i) => (
                  <CirclesCardHomework key={h.id} index={i} data={h} />
                ))}
              </div>
            </>
          )}
        </section>
        <section className="pt-5 px-4">
          {(selectedDaySchReminders.length > 0 ||
            selectedDayClsReminders.length > 0) && (
            <>
              <p className="font-semibold text-emma-800 text-2xl mb-2 font-inter">
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
            </>
          )}
        </section>
      </main>
    </AuthGuard>
  );
}
