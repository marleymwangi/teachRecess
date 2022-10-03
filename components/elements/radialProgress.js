import { useState, useEffect } from "react";

export default function RadialProgress({number}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (value >= number) {
        clearInterval(intervalId);
      }
      if (number > 0 && value < number) {
        setValue(value + 1);
      }
    }, 10);

    return () => clearInterval(intervalId);
  }, [number, value]);

  return (
    <div
      className="radial-progress my-2"
      style={{
        "--value": value,
        "--size": "4em",
        "--thickness": "8px",
      }}
    >
      {value}%
    </div>
  );
}
