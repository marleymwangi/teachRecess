import { useEffect, useState } from "react";
import "@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css";
import { Calendar, utils } from "@amir04lm26/react-modern-calendar-date-picker";

//custom packages
import { addDays, getDate, getYear, getMonth, startOfToday } from "date-fns";

export default function TimeSpanPickerInput({
  selDiary,
  setTimestamp,
}) {
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
    let defaultValue;
    if (selDiary) {
      let timestamp = selDiary.timestamp;
      defaultValue = pickerFormat(timestamp);
    } else {
      defaultValue = utils().getToday();
    }

    setSelectedDayRange(defaultValue);
  }, [selDiary]);

  useEffect(() => {
    if (selectedDayRange) {
      //new Date(year, month, day, hours, minutes, seconds, milliseconds)
      let t = selectedDayRange;
      let tt = new Date(t.year, t.month - 1, t.day);
      setTimestamp(tt);
    }
  }, [selectedDayRange]);

  return (
    <Calendar
      value={selectedDayRange}
      onChange={setSelectedDayRange}
      colorPrimary="#38bdf8" // added this
      shouldHighlightWeekends
    />
  );
}
