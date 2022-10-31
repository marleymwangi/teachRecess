import { useState } from "react";
import useScanFetch from "../../helpers/hooks/scan";
import { classNames } from "../../helpers/utility";

export default function ScanPage() {
  const [scanin, setScanin] = useState(false);
  const [students, setStudents] = useState([]);
  const { getStudent } = useScanFetch();

  const scan = async () => {
    if ("NDEFReader" in window) {
      try {
        const ndef = new window.NDEFReader();
        await ndef.scan();
        setScanin(true);
        console.log("Scan started successfully.");
        ndef.onreadingerror = () => {
          console.log("Cannot read data from the NFC tag. Try another one?");
        };

        ndef.onreading = (event) => {
          console.log("NDEF message read.");
          onReading(event); //Find function below
        };
      } catch (error) {
        setScanin(false);
        console.log(`Error! Scan failed to start: ${error}.`);
      }
    }
  };

  const onReading = ({ message, serialNumber }) => {
    let student = {};
    student.tagId = serialNumber;
    console.log(serialNumber);
    for (const record of message.records) {
      switch (record.recordType) {
        case "text":
          const textDecoder = new TextDecoder(record.encoding);
          let text = textDecoder.decode(record.data);
          console.log("Message :", text);
          student.id = text;
          AddStudentToArray(student);
          break;
        default:
        // TODO: Handle other records with record data.
      }
    }
  };

  const AddStudentToArray = (student) => {
    const findObj = students.find((s) => s.id === student.id);
    if (!findObj) {
      students.push(student);
    }

    setStudents(students);
  };

  const handleComplete = () => {
    console.log("test")
    let promises = [];

    students.length > 0 &&
      students.forEach((stud) => {
        let p = getStudent(stud);
        promises.push(p);
      });

    Promise.all(promises).then((res)=>{
      console.log("db response",res)
    })
  };

  return (
    <main className="py-16 px-6">
      <p className="font-semibold text-gray-500 text-2xl font-inter">
        Scan Students
      </p>
      <div className="pt-2 pb-6">
        <select
          defaultValue={"default"}
          className="select select-secondary w-full"
        >
          <option value={"default"}>Where are the students going</option>
          <option value={"on-bus"}>ON BUS</option>
          <option value={"off-bus"}>OFF BUS</option>
          <option value={"in-class"}>INTO CLASS</option>
          <option value={"out-class"}>OUT OF CLASS</option>
        </select>
      </div>
      <p className="grid place-content-center grid-cols-2 gap-4 text-center mb-2">
        <span className="text-sm text-gray-400">NFC State</span>
        <span
          className={classNames(
            "font-semibold",
            scanin ? "text-green-600" : "text-gray-500"
          )}
        >
          {scanin ? "SCANNING" : "IDLE"}
        </span>
      </p>
      <p className="grid place-content-center grid-cols-2 gap-4 text-center mb-2">
        <span className="text-sm text-gray-400">Students</span>
        <span
          className={classNames(
            "font-semibold",
            scanin ? "text-green-600" : "text-gray-500"
          )}
        >
          {students.length}
        </span>
      </p>
      <div className="grid gap-4">
        <button onClick={scan} className="btn btn-secondary btn-lg w-full">
          scan
        </button>
        <button
          onClick={handleComplete}
          className="btn btn-secondary btn-lg w-full"
        >
          Complete
        </button>
      </div>
    </main>
  );
}
