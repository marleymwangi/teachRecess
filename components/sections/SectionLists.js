import Link from "next/link";
import dynamic from "next/dynamic";
//hooks
//dynamic
const BsPeople = dynamic(async () => (await import("react-icons/bs")).BsPeople);
const BsFillJournalBookmarkFill = dynamic(
  async () => (await import("react-icons/bs")).BsFillJournalBookmarkFill
);
const BsBookmarkCheckFill = dynamic(
  async () => (await import("react-icons/bs")).BsBookmarkCheckFill
);
const BiRightArrow = dynamic(
  async () => (await import("react-icons/bi")).BiRightArrow
);
const FaImages = dynamic(
  async () => (await import("react-icons/fa")).FaImages
);

export default function SectionLists() {
  return (
    <section className="mt-6">
      <div className="grid gap-4 w-full">
        <Link href="student/profiles">
          <div className="flex items-center justify-between bg-gradient-to-r from-cyan-700 to-cyan-500 w-full p-4 shadow-lg text-white rounded-md">
            <div className="flex items-center rounded-md gap-2">
              <BsPeople size="2.5em" />
              <span className="text-lg font-medium">Students</span>
            </div>
            <BiRightArrow size="1.5em" />
          </div>
        </Link>
        <Link href="/homework/homework">
          <div className="flex items-center justify-between bg-gradient-to-r from-cyan-700 to-cyan-500 w-full p-4 shadow-lg text-white rounded-md">
            <div className="flex items-center rounded-md gap-2">
              <BsFillJournalBookmarkFill size="2.5em" />
              <span className="text-lg font-medium">Homework</span>
            </div>
            <BiRightArrow size="1.5em" />
          </div>
        </Link>
        <Link href="/reminders">
          <div className="flex items-center justify-between bg-gradient-to-r from-cyan-700 to-cyan-500 w-full p-4 shadow-lg text-white rounded-md">
            <div className="flex items-center rounded-md gap-2">
              <BsBookmarkCheckFill size="2.5em" />
              <span className="text-lg font-medium">Reminder</span>
            </div>
            <BiRightArrow size="1.5em" />
          </div>
        </Link> 
        <Link href="/portfolios">
          <div className="flex items-center justify-between bg-gradient-to-r from-cyan-700 to-cyan-500 w-full p-4 shadow-lg text-white rounded-md">
            <div className="flex items-center rounded-md gap-2">
              <FaImages size="2.5em" />
              <span className="text-lg font-medium">E Portfolios</span>
            </div>
            <BiRightArrow size="1.5em" />
          </div>
        </Link> 
      </div>
    </section>
  );
}
