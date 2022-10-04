import { classNames } from "../../helpers/utility";

export default function Calendar() {
  return (
    <section className="border-b">
      <div className="dropdown">
        <label tabIndex={0} className="btn btn-ghost m-1">
          September
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <a>January</a>
          </li>
          <li>
            <a>February</a>
          </li>
          <li>
            <a>March</a>
          </li>
          <li>
            <a>April</a>
          </li>
          <li>
            <a>May</a>
          </li>
          <li>
            <a>June</a>
          </li>
          <li>
            <a>July</a>
          </li>
          <li>
            <a>August</a>
          </li>
          <li>
            <a>September</a>
          </li>
          <li>
            <a>October</a>
          </li>
          <li>
            <a>November</a>
          </li>
          <li>
            <a>December</a>
          </li>
        </ul>
      </div>
      <div className="grid grid-cols-7">
        <Day data={{ day: "sun", date: "05" }} />
        <Day data={{ day: "mon", date: "06" }} selected />
        <Day data={{ day: "tue", date: "07" }} selected entries={[1, 2, 3, 4, 5]} />
        <Day data={{ day: "mon", date: "08" }} entries={[1, 2, 3, 4, 5, 6]} />
        <Day data={{ day: "thu", date: "09" }} />
        <Day data={{ day: "fri", date: "10" }} />
        <Day data={{ day: "sat", date: "11" }} />
      </div>
    </section>
  );
}

function Day({ data, selected, entries }) {
  return (
    <div
      className={classNames(
        "text-center py-2 px-1",
        selected && "bg-primary text-black"
      )}
    >
      <p className="text-3xl font-bold">{data.date}</p>
      <p className="text-xs uppercase">{data.day}</p>
      <div className="flex gap-0.5 justify-center mt-1">
        {entries?.length > 0 &&
          entries.length <= 5 &&
          entries.map((e, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-emma-100" />
          ))}
        {entries?.length > 0 && entries.length > 5 && (
          <div className="w-4 h-4 rounded-full -mt-1 bg-emma-100 text-emma-800 text-xs grid place-content-center">
            <span className="">{entries?.length}</span>
          </div>
        )}
      </div>
    </div>
  );
}
