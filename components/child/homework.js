import dynamic from "next/dynamic";
import Link from "next/link";
//dynamic
const IoIosArrowForward = dynamic(
  async () => (await import("react-icons/io")).IoIosArrowForward
);

export default function ChildHomework({ data }) {
  return (
    <Link href="/homework#item1">
      <div className="child flex justify-between ml-4 mr-6">
        <div className="flex">
          <div className="avatar mr-8">
            <div className="w-14 rounded-full">
              <img src="https://placeimg.com/192/192/people" />
            </div>
          </div>
          <div className="content grid place-content-center font-nexa">
            <>
              <p className="text-sm mb-0.5">{data?.name}</p>
              <span className="text-gray-500 text-xs">
                {data?.overdue} Assignments
              </span>
            </>
          </div>
        </div>
        <div className="action grid place-content-center">
          <IoIosArrowForward size="2em" />
        </div>
      </div>
    </Link>
  );
}
