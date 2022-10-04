import { useEffect, useState } from "react";
import "@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css";
import { Calendar, utils } from "@amir04lm26/react-modern-calendar-date-picker";

//custom packages
import { addDays, getDate, getYear, getMonth, startOfToday } from "date-fns";

export default function TimeSpanPickerInput({ selDiary, setDue, setTimestamp }) {
  let today = startOfToday();
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
  });

  const pickerFormat = (value) => {
    const d = getDate(value);
    const m = getMonth(value) + 1;
    const y = getYear(value);

    return {
      year: y,
      month: m,
      day: d,
    };
  };

  useEffect(() => {
    let defaultFrom;
    let defaultTo;
    if (selDiary) {
      let timestamp = selDiary.timestamp;
      let due = selDiary.due;

      defaultTo = pickerFormat(due);
      defaultFrom = pickerFormat(timestamp);
    } else {
      const result = addDays(today, 3);

      defaultFrom = utils().getToday();
      defaultTo = pickerFormat(result);
    }
    const defaultValue = {
      from: defaultFrom,
      to: defaultTo,
    };

    setSelectedDayRange(defaultValue);
  }, [selDiary]);

  useEffect(() => {
    if (selectedDayRange?.from && selectedDayRange?.to) {
      //new Date(year, month, day, hours, minutes, seconds, milliseconds)
      let d = selectedDayRange?.to;
      let t = selectedDayRange?.from;
      let td = new Date(d.year, d.month - 1, d.day);
      let tt = new Date(t.year, t.month - 1, t.day);
      setTimestamp(tt);
      setDue(td);
    }
  }, [selectedDayRange]);

  return (
    <Calendar
      value={selectedDayRange}
      onChange={setSelectedDayRange}
      colorPrimary="#5bbcac"
      colorPrimaryLight="#bce4dd"
      shouldHighlightWeekends
    />
  );
}
